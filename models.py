from sqlalchemy import Column, String, Boolean, Integer, BigInteger, DateTime, Numeric, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship, Mapped, mapped_column, DeclarativeBase
from database import Base

class Users(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String, index=True)
    email_address = Column(String, index=True, unique=True)
    phone_number = Column(BigInteger, index=True)
    hashed_password = Column(String)
    is_active = Column(Integer, default=1)
    user_level = Column(Integer, default=10)
    created_on = Column(DateTime(timezone=True), default=func.now())
    
    # user = relationship('Wallets', back_populates='wallet')
    wallets = relationship('Wallets', back_populates='owner')
    
class Wallets(Base):
    __tablename__ = 'wallets'
    
    id = Column(Integer, primary_key=True, index=True)
    blockchain = Column(String)
    wallet_address = Column(String, unique=True)
    coin_name = Column(String)
    coin_short_name = Column(String)
    user_id = Column(Integer, ForeignKey('users.id'))
    created_on = Column(DateTime(timezone=True), default=func.now())
    
    # wallet = relationship('Users', back_populates='user')
    # wallet_transaction = relationship('Transactions', back_populates='transaction')
    owner = relationship('Users', back_populates='wallets')
    
class Transactions(Base):
    __tablename__ = 'transactions'
    
    id = Column(Integer, primary_key=True, index=True)
    txn_id = Column(Integer, index=True, unique=True)
    status = Column(Integer)
    datetime = Column(DateTime(timezone=True))
    sender_wallet = Column(String)
    sender_wallet_id = Column(Integer, ForeignKey('wallets.id'))
    value = Column(Numeric)
    txn_fee = Column(Numeric)
    gas_price = Column(Numeric)
    direction = Column(String)
    created_on = Column(DateTime(timezone=True), default=func.now())
    
    # transaction = relationship('Wallets', back_populates='wallet_transaction')