from datetime import timedelta, datetime
import jwt
from decouple import config
from fastapi import HTTPException
from fastapi import status
from passlib.context import CryptContext
from models import Users

JWT_SECRET = config("SECRET_KEY")
JWT_ALGORITHM = config("ALGORITHM")
TTL = float(config("TTL"))

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated="auto")


def token_response(token: str):
    return {
        "access token": token
    }

def signJWT(id: str, email_address: str, level: int):
    payload = {
        "id": id,
        "sub": email_address,
        "acc": level,
        "exp": datetime.utcnow() + timedelta(minutes=TTL)
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token_response(token)

def decodeJWT(token: str):
    try:
        decode_token = jwt.decode(token, JWT_SECRET, algorithms=JWT_ALGORITHM)
    except jwt.exceptions.ExpiredSignatureError:
        return 'Signature has expired'
    except:
        return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate user.')
    else:

        return decode_token

def create_access_token(data: dict, expires_delta: timedelta or None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=TTL)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)

def check_token(token: str):
    try:
        decode_token = jwt.decode(token, JWT_SECRET, algorithms=JWT_ALGORITHM)
    except jwt.exceptions.ExpiredSignatureError:
        return 'Signature has expired'
    except:
        return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate user.')
    else:
        return decode_token


def refreshJWT(token: str):
    try:
        decode_token = jwt.decode(token, JWT_SECRET, algorithms=JWT_ALGORITHM)
    except jwt.exceptions.ExpiredSignatureError:
        return 'Signature has expired'
    except:
        return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate user.')
    else:
        print('token given')
        return signJWT(decode_token['id'], decode_token['sub'], decode_token['acc'])
    

def authenticate_user(email_address: str, password: str, db):
    user = db.query(Users).filter(Users.email_address == email_address).first()
    if not user:
        return False
    if not bcrypt_context.verify(password, user.hashed_password):
        return False
    return user

# Returns expired token
def expiredJWT(token: str):
    decode_token = jwt.decode(token, JWT_SECRET, algorithms=JWT_ALGORITHM)
    payload = {
        "id": decode_token['id'],
        "sub": decode_token['sub'],
        "acc": decode_token['acc'],
        "exp": 0
    }
    expired_token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token_response(expired_token)

