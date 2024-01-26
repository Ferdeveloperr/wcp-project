from typing import Optional
from pydantic import BaseModel, Field

class UserBase(BaseModel):
    email_address: str
        
class UserCreate(UserBase):
    hashed_password: str
    
class UserLogin(UserBase):
    email_address: str
    hashed_password: str
    
class User(UserBase):
    id: int
    first_name: str
    last_name: str
    phone_number: int
    is_active: int
    user_level: int
    
    class Config:
        from_attributes = True
    
class CreateUserRequest(BaseModel):
    email_address: str
    password: str
    
class Token(BaseModel):
    access_token: str
    token_type: str

######################################################################################
    
class WalletBase(BaseModel):
    user_id: int
    blockchain: str
    wallet_address: str
    coin_name: str
    coin_short_name: str

class Wallet(WalletBase):
    id: int

class WalletUpdate(BaseModel):
    user_id: Optional[int] = None
    blockchain: Optional[str] = None
    wallet_address: Optional[str] = None
    coin_name: Optional[str] = None
    coin_short_name: Optional[str] = None