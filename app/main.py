from app.endpoints import register
app.include_router(register.router)


from fastapi import FastAPI
from app.db import Base, engine
from app.endpoints import register

# Initialize tables
Base.metadata.create_all(bind=engine)

# FastAPI app setup
app = FastAPI()
app.include_router(register.router)
