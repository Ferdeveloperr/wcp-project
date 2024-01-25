from datetime import timedelta, datetime, time
import jwt
from decouple import config
from fastapi import FastAPI, HTTPException
from starlette import status

JWT_SECRET = config("SECRET_KEY")
JWT_ALGORITHM = config("ALGORITHM")
TTL = int(config("TTL"))

def token_response(token: str):
    return {
        "access token": token
    }

def signJWT(id: str, email_address: str):
    payload = {
        "id": id,
        "sub": email_address,
        "exp": datetime.now() + timedelta(minutes=TTL)
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token_response(token)

def decodeJWT(token: str):
    try:
        decode_token = jwt.decode(token, JWT_SECRET, algorithms=JWT_ALGORITHM)
    except:
        return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate user.')
    else:
        return signJWT(decode_token['id'], decode_token['sub'])

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
        # return jwt.decode(token, JWT_SECRET, algorithms=JWT_ALGORITHM)
        return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate user.')
    else:
        if datetime.utcfromtimestamp(decode_token['exp']) > datetime.utcnow():
            return {"status": "Ok", "sub": decode_token['sub']}
        else:
            return {"status": "Unauthorized"}