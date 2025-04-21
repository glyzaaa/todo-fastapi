from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import todo
from database import Base, engine
import os

DATABASE_URL = os.getenv("DATABASE_URL")

app = FastAPI()

origins = [
    "https://glyzaaa.github.io",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

Base.metadata.create_all(bind=engine)

app.include_router(todo.router, prefix="/todos", tags=["ToDos"])
