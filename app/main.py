
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import Base, engine  # Changed from app.db
from endpoints import register  # Changed from app.endpoints

# Initialize tables
Base.metadata.create_all(bind=engine)

# Creating an instance of a FastAPI application
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Adds the routes from the 'register' module to the FastAPI application
app.include_router(register.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
