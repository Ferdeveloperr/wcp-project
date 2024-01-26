from typing import Annotated, List
from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from auth.jwt_bearer import jwtBearer
from auth.jwt_handler import authenticate_user, decodeJWT, refreshJWT, signJWT, bcrypt_context
from database import SessionLocal, get_db
from models import *
from schemas import *

db_dependency = Annotated[SessionLocal, Depends(get_db)]
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter()


################################################################################
###                                   USERS                                  ###
################################################################################ 

@router.get("/api/users/", response_model=List[UsersRead], tags=["Users"])
async def read_all_users(db: db_dependency, token: Annotated[str, Depends(jwtBearer())]):
    results = db.query(Users).all()
    if not results:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No users found")
    return results

@router.get("/api/users/{user_id}", response_model=User, tags=["Users"])
async def read_single_user(user_id: int, db: db_dependency, token: Annotated[str, Depends(jwtBearer())] ):
    results = db.query(Users).filter(Users.id == user_id).first()
    if not results:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return results

@router.patch("/api/users/{user_id}", tags=["Users"])
async def update_user(user_id: int, user: UserUpdate, db: db_dependency, token: Annotated[str, Depends(jwtBearer())]):
    user_exists = db.query(Users).filter(Users.id == user_id).first()
    if not user_exists:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    db.query(Users).filter(Users.id == user_id).update(user.model_dump(exclude_unset=True))
    db.commit()
    return user.model_dump(exclude_unset=True)



################################################################################
###                                 WALLETS                                  ###
################################################################################ 

@router.get("/api/wallets/", response_model=List[Wallet], tags=["Wallets"])
async def read_all_wallets(db: db_dependency, token: Annotated[str, Depends(jwtBearer())]):
    results = db.query(Wallets).all()
    if not results:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No wallets found")
    return results

@router.get("/api/wallets/{user_id}/wallets", response_model=List[Wallet], tags=["Wallets"])
async def read_user_wallets(user_id: int, db: db_dependency, token: Annotated[str, Depends(jwtBearer())]):
    results = db.query(Wallets).filter(Wallets.user_id == user_id).all()
    if not results:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No wallets found for this user")
    return results

@router.get("/api/wallets/{wallet_id}", response_model=Wallet, tags=["Wallets"])
async def read_single_wallet(wallet_id: int, db: db_dependency, token: Annotated[str, Depends(jwtBearer())]):
    results = db.query(Wallets).filter(Wallets.id == wallet_id).first()
    if not results:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Wallet not found")
    return results

@router.post("/api/wallets/", response_model=WalletBase, tags=["Wallets"])
async def create_wallet(wallet: WalletBase, db: db_dependency, token: Annotated[str, Depends(jwtBearer())]):
    wallet_exists = db.query(Wallets).filter(Wallets.wallet_address == wallet.wallet_address).first()
    if wallet_exists:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Wallet already exists in our database.")
    new_wallet = Wallets(**wallet.model_dump())
    db.add(new_wallet)
    db.commit()
    db.refresh(new_wallet)
    return new_wallet

@router.patch("/api/wallets/{wallet_id}", tags=["Wallets"])
async def update_wallet(wallet_id: int, wallet: WalletUpdate, db: db_dependency, token: Annotated[str, Depends(jwtBearer())]):
    wallet_exists = db.query(Wallets).filter(Wallets.id == wallet_id).first()
    if not wallet_exists:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Wallet not found")
    db.query(Wallets).filter(Wallets.id == wallet_id).update(wallet.model_dump(exclude_unset=True))
    db.commit()
    return wallet.model_dump(exclude_unset=True)

@router.delete("/api/wallets/{wallet_id}", tags=["Wallets"])
async def delete_wallet(wallet_id: int, db: db_dependency, token: Annotated[str, Depends(jwtBearer())]):
    wallet_exists = db.query(Wallets).filter(Wallets.id == wallet_id).first()
    if not wallet_exists:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Wallet not found")
    db.query(Wallets).filter(Wallets.id == wallet_id).delete()
    db.commit()
    return wallet_id

################################################################################
###                                  AUTH                                    ###
################################################################################ 

@router.post("/token", status_code=status.HTTP_200_OK, tags=["Auth"])
def login_for_access_token(response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    return signJWT(user.id, user.email_address, user.user_level)

@router.post("/auth/signup", tags=['Auth'])
async def create_user(db: db_dependency, create_user_request: CreateUser):
    exists = db.query(Users).filter(Users.email_address == create_user_request.email_address).first()
    if exists:
        raise HTTPException(status_code=status.HTTP_418_IM_A_TEAPOT,
                            detail='Email already exists in our database.')
    create_user_model = Users(email_address=create_user_request.email_address,
                              hashed_password=bcrypt_context.hash(create_user_request.password))
    db.add(create_user_model)
    db.commit()
    return signJWT(create_user_model.id, create_user_model.email_address, create_user_model.user_level)


@router.get("/refresh-token", tags=["Auth"])
def refresh_token(token: Annotated[str, Depends(jwtBearer())]):
    return refreshJWT(token)
    
@router.get("/", tags=["Homepage"])
def home(token: Annotated[str, Depends(jwtBearer())]):
    res = decodeJWT(token)
    return res


# Work in progress
@router.post("/logout", tags=["Auth"])
async def logout(token: Annotated[str, Depends(jwtBearer())]):
    pass


################################################################################
###                              TRANSACTIONS                                ###
################################################################################ 