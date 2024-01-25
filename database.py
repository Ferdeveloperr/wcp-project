from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from decouple import config

DB_USER = config("DB_USER")
DB_PASS = config("DB_PASS")
DB_ADDRESS = config("DB_ADDRESS")
DB_PORT = config("DB_PORT")
DB_TABLE = config("DB_TABLE")

URL_DATABASE = f'postgresql://{DB_USER}:{DB_PASS}@{DB_ADDRESS}:{DB_PORT}/{DB_TABLE}'

engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()