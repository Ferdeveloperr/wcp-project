from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

import models
from database import engine
from router import router

app = FastAPI(
    title = "WorldCoin+ APIs",
    description="""
    APIs for handling users, wallets & transactions
    FastAPI + PostgreSQL
    """,
    version = "0.1"
)

# Database Creation
models.Base.metadata.create_all(bind=engine)

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

app.include_router(router)

if __name__ == '__main__':
    uvicorn.run('main:app', reload=True)