import uvicorn
from fastapi import FastAPI, HTTPException, Depends, Request, requests
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Annotated, Tuple
from sqlalchemy.orm import Session
import models
from models import Users
from auth.jwt_handler import signJWT, token_response, decodeJWT, create_access_token, check_token, refreshJWT
from auth.jwt_bearer import jwtBearer
from database import engine, SessionLocal, get_db
from schemas import CreateUserRequest, UserLogin
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from starlette import status
from datetime import datetime, timedelta, timezone
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.responses import StreamingResponse, JSONResponse, RedirectResponse
from decouple import config
from fastapi import Response
from auth.httpct import OAuth2PasswordBearerWithCookie

app = FastAPI()

origins = [
    "*",
    "http://127.0.0.1",
    "http://127.0.0.1:8000",
    "http://localhost",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated="auto")

db_dependency = Annotated[Session, Depends(get_db)]
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# @app.get("/", status_code=status.HTTP_200_OK)
# def landing(request: Request):
    # my_header = request.headers
    # print(my_header)
    # return {"Hola": "Mundo!"}
    
@app.post("/token", status_code=status.HTTP_200_OK, tags=["auth"])
def login_for_access_token(response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    return signJWT(user.id, user.email_address, user.user_level)

@app.get("/refresh-token", dependencies=[Depends(jwtBearer())], tags=["auth"])
def home(token: Annotated[str, Depends(oauth2_scheme)]):
    return refreshJWT(token)
    
@app.get("/", dependencies=[Depends(jwtBearer())], tags=["homepage"])
def home(token: Annotated[str, Depends(oauth2_scheme)]):
    res = decodeJWT(token)
    return res

def authenticate_user(email_address: str, password: str, db):
    user = db.query(Users).filter(Users.email_address == email_address).first()
    if not user:
        return False
    if not bcrypt_context.verify(password, user.hashed_password):
        return False
    return user

@app.post("/auth/signup", tags=['auth'])
async def create_user(db: db_dependency, create_user_request: CreateUserRequest):
    exists = db.query(Users).filter(Users.email_address == create_user_request.email_address).first()
    if exists:
        raise HTTPException(status_code=status.HTTP_418_IM_A_TEAPOT,
                            detail='Email already exists in our database.')
    create_user_model = Users(email_address=create_user_request.email_address,
                              hashed_password=bcrypt_context.hash(create_user_request.password))
    db.add(create_user_model)
    db.commit()
    return signJWT(create_user_model.id, create_user_model.email_address, create_user_model.user_level)

if __name__ == '__main__':
    uvicorn.run('main:app', reload=True)