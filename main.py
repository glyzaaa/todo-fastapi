from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import todo
from database import Base, engine

# Initialize FastAPI app
app = FastAPI()

# CORS settings - allow frontend to access backend
origins = [
    "https://glyzaaa.github.io",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow only your frontend domain
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Create the database tables
Base.metadata.create_all(bind=engine)

# Include the ToDo routes with a prefix
app.include_router(todo.router, prefix="/todos", tags=["ToDos"])

# Optional root route (helps avoid 404/CORS errors on "/")
@app.get("/")
def read_root():
    return {"message": "Welcome to the ToDo API"}
