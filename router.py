from typing import Annotated, List
from fastapi import APIRouter, Depends
from database import SessionLocal, get_db
from models import *
from schemas import *


db_dependency = Annotated[SessionLocal, Depends(get_db)]

router = APIRouter()

@router.get("/api/users/", response_model=List[UsersRead], tags=["Users"])
async def read_users(db: db_dependency):
    results = db.query(Users).all()
    return results

@router.get("/api/users/{id}", response_model=User, tags=["Users"])
async def read_user(id: int, db: db_dependency):
    results = db.query(Users).filter(Users.id == id).first()
    return results

@router.patch("/api/users/{id}", tags=["Users"])
async def update_user(id: int, user: UserUpdate, db: db_dependency):
    db.query(Users).filter(Users.id == id).update(user.model_dump(exclude_unset=True))
    db.commit()
    return user.model_dump(exclude_unset=True)

#######################################################################################

@router.get("/api/users/{user_id}/wallets", response_model=List[Wallet], tags=["Wallets"])
async def read_user_wallets(user_id: int, db: db_dependency):
    results = db.query(Wallets).filter(Wallets.user_id == user_id).all()
    return results

@router.post("/api/wallets/", response_model=WalletBase, tags=["Wallets"])
async def create_wallet(wallet: WalletBase, db: db_dependency):
    new_wallet = Wallets(**wallet.model_dump())
    db.add(new_wallet)
    db.commit()
    db.refresh(new_wallet)
    return new_wallet

@router.patch("/api/wallets/{wallet_id}", tags=["Wallets"])
async def update_wallet(wallet_id: int, wallet: WalletUpdate, db: db_dependency):
    db.query(Wallets).filter(Wallets.id == wallet_id).update(wallet.model_dump(exclude_unset=True))
    db.commit()
    return wallet.model_dump(exclude_unset=True)

@router.delete("/api/wallets/{wallet_id}", tags=["Wallets"])
async def delete_wallet(wallet_id: int, db: db_dependency):
    db.query(Wallets).filter(Wallets.id == wallet_id).delete()
    db.commit()
    return f"Wallet {wallet_id} deleted"