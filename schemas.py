from pydantic import BaseModel

class UserBase(BaseModel):
    email_address: str
        
class UserCreate(UserBase):
    hased_password: str
    
class UserLogin(UserBase):
    email_address: str
    hased_password: str
    
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
