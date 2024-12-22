from app.endpoints import register  # Importing the 'register' module from 'app.endpoints'
app.include_router(register.router)  # Adds the routes from the 'register' module to the app


from fastapi import FastAPI  # Import FastAPI class which will help create an app instance
from app.db import Base, engine  # Importing 'Base' for database models and 'engine' to connect to the database
from app.endpoints import register  # Importing the 'register' module again for routing

# Initialize tables
# This line creates all tables defined in the database models
# The tables are created with the configuration provided by 'engine'
Base.metadata.create_all(bind=engine)

# FastAPI app setup
# Creating an instance of a FastAPI application
app = FastAPI()
# Adds the routes from the 'register' module to the FastAPI application
app.include_router(register.router)
