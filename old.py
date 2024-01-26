import uvicorn
from fastapi import FastAPI, HTTPException, Depends, Request, requests
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Annotated, Tuple
from sqlalchemy.orm import Session
import models
from models import Users
from auth.jwt_handler import signJWT, token_response, decodeJWT, create_access_token, check_token
from auth.jwt_bearer import jwtBearer
from database import engine, SessionLocal
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
# from starlette.applications import Starlette
# from starlette.middleware import Middleware
# from starlette.middleware.sessions import SessionMiddleware

TTL = int(config("TTL"))

class ExtendToken(BaseHTTPMiddleware):
    access_token_expires = timedelta(minutes=TTL)
    
    def __init__(self, app):
        super().__init__(app)
        self.allowed_paths = ['/auth/signin', '/docs', '/openapi.json', '/favicon.ico']
        
    async def dispatch(self, request, call_next):
        print(requests.HTTPConnection.session)
        response = await call_next(request)
        # session = request.cookies.get('session')
        # print(*request)
        # print(dir(request))
        # print(dir(request.url))
        # print(request.url.path)
        # if request.cookies:
            # print(request.cookies)
            # tkn = request.cookies['access_token'].split(' ')
            # tkn = tkn[1]
            # print(request.cookies)
            # resp = check_token(tkn)
            # print(resp)
            # if resp['status'] == "Ok":
            #     access_token_expires = timedelta(minutes=TTL)
            #     access_token = create_access_token(data={"sub": resp['sub']}, expires_delta=access_token_expires)
            #     response.set_cookie(key="access_token",value=f"Bearer {access_token}", httponly=True, expires=datetime.now(timezone.utc) + timedelta(minutes=TTL))
            #     print(f'New token granted.')
                # print(f'New token granted. Redirecting to {request.url.path}')
        #     else:
        #         print(request.url.path)
        #         if request.url.path not in self.allowed_paths:
        #             print(f'No token available. Redirecting to login')
        #             return RedirectResponse(url="/auth/signin", status_code=status.HTTP_303_SEE_OTHER)
        # else:
        #     print(request.url.path)
        #     if request.url.path not in self.allowed_paths:
        #         print(f'No token available. Redirecting to login')
        #         return RedirectResponse(url="/auth/signin", status_code=status.HTTP_303_SEE_OTHER)
        # return response
#         tkn = request.cookies['access_token'].split(' ')
#         tkn = tkn[1]
#         # print(request.cookies)
#         resp = check_token(tkn)
#         # print(resp)
#         if resp['status'] == "Ok":
#             access_token_expires = timedelta(minutes=TTL)
#             access_token = create_access_token(data={"sub": resp['sub']}, expires_delta=access_token_expires)
#             response.set_cookie(key="access_token",value=f"Bearer {access_token}", httponly=True, expires=datetime.now(timezone.utc) + timedelta(minutes=TTL))
        
        # print(*request)
        # type asgi http_version server client scheme method root_path path raw_path query_string headers state app
        # print(request.url.path) # /
        # tkn = request.headers['authorization'].split(' ')
        # tkn = tkn[1]
        # print(tkn)
        # Headers({'host': '127.0.0.1:8000', 'connection': 'keep-alive', 'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic3ViIjoiYXJhY2VuYW1laXN0ZXJAZ21haWwuY29tIiwiZXhwIjoxNzA2MTI1NjI5fQ.VT4p_kUtN0vfUZgbz25FLhxZlkCcOLhWmCvhKw_ZDB8', 'accept': '*/*', 'accept-language': '*', 'sec-fetch-mode': 'cors', 'user-agent': 'node', 'accept-encoding': 'gzip, deflate'})
        # print(request.cookies)
        # response = call_next(request)
        # return response
    

app = FastAPI()

# middleware = [
#     Middleware(SessionMiddleware, secret_key='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic3ViIjoiYXJhY2VuYW1laXN0ZXJAZ21haWwuY29tIiwiZXhwIjoxNzA2MjA5NjI5fQ.52zw1mn8HbXZfEwM1XlFPEsvK-FE9VGzrWEltWglcu4', https_only=True)
# ]

# app.add_middleware(SessionMiddleware, secret_key='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic3ViIjoiYXJhY2VuYW1laXN0ZXJAZ21haWwuY29tIiwiZXhwIjoxNzA2MjA5NjI5fQ.52zw1mn8HbXZfEwM1XlFPEsvK-FE9VGzrWEltWglcu4', https_only=True)

origins = [
    "*",
    "http://127.0.0.1",
    "http://127.0.0.1:8080",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.add_middleware(ExtendToken)

models.Base.metadata.create_all(bind=engine)

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated="auto")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# @app.post("/token", status_code=status.HTTP_200_OK)
# def login_for_access_token(response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
#     user = authenticate_user(form_data.username, form_data.password, db)
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#         )
#     access_token_expires = timedelta(minutes=TTL)
#     access_token = create_access_token(data={"sub": user.email_address}, expires_delta=access_token_expires)
#     response.set_cookie(key="access_token",value=f"Bearer {access_token}", httponly=True, expires=datetime.now(timezone.utc) + timedelta(minutes=TTL))

# @app.get("/", status_code=status.HTTP_200_OK)
# def home():
#     session = requests.Session()
#     resp = session.get("your-target-url")

#     # this will return as dictionary object
#     return resp.cookies.get_dict()


# @app.get("/", status_code=status.HTTP_200_OK)
# def home():
#     return {"Hola":"Mundo!"}
#     users = db.query(Users).all()
#     return users


# @app.get("/test", status_code=status.HTTP_200_OK)
# def home(db: db_dependency):
#     users = db.query(Users).all()
#     return users

# @app.get("/", dependencies=[Depends(jwtBearer())], tags=["homepage"])
# def home(token: Annotated[str, Depends(oauth2_scheme)]):
#     return decodeJWT(token)

# @app.post("/auth/signup", tags=['auth'])
# async def create_user(db: db_dependency, create_user_request: CreateUserRequest):
#     exists = db.query(Users).filter(Users.email_address == create_user_request.email_address).first()
#     if exists:
#         raise HTTPException(status_code=status.HTTP_418_IM_A_TEAPOT,
#                             detail='Email already exists in our database.')
#     create_user_model = Users(email_address=create_user_request.email_address,
#                               hashed_password=bcrypt_context.hash(create_user_request.password))
#     db.add(create_user_model)
#     db.commit()
    
# @app.post("/auth/signin", tags=['auth'])
# async def user_login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
#                                  db: db_dependency):
#     user = authenticate_user(form_data.username, form_data.password, db)
#     if not user:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
#                             detail='Could not validate user.')
#     return signJWT(user.id, user.email_address)

# def authenticate_user(email_address: str, password: str, db):
#     user = db.query(Users).filter(Users.email_address == email_address).first()
#     if not user:
#         return False
#     if not bcrypt_context.verify(password, user.hashed_password):
#         return False
#     return user

if __name__ == '__main__':
    uvicorn.run('main:app', reload=True)