from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from datetime import datetime
from ..db import Base, SessionLocal

router = APIRouter()

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# User model
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

# Dependency to get database session
# This function provides a database session to route handlers. It ensures sessions are properly closed after use.
def get_db():
    db = SessionLocal()  # Create a new session instance
    try:
        yield db  # Provide the session to the caller
    finally:
        db.close()  # Ensure the session is closed to free resources

# Input validation schema
# Pydantic is used to validate incoming request data. This schema defines the structure of the registration input.
class RegisterUser(BaseModel):
    email: EmailStr  # Ensures the email field contains a valid email address
    password: str  # Plain-text password provided by the user

@app.post("/register")
def register_user(user: RegisterUser, db: Session = Depends(get_db)):
    """
    Register a new user with email and password.

    This endpoint performs the following steps:
    1. Validates the input to ensure the email is in the correct format and the password is provided.
    2. Checks if the email already exists in the database to ensure uniqueness.
    3. Hashes the password securely using bcrypt to prevent storing plain-text passwords.
    4. Saves the user's email and hashed password in the database.
    5. Returns a success message with the new user's ID.
    """
    # Check if the email already exists in the database
    # Query the "users" table to find a record with the same email. If found, raise an error.
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email is already registered")

    # Hash the password using bcrypt
    # Passwords are never stored in plain text. Hashing ensures secure storage.
    hashed_password = pwd_context.hash(user.password)

    # Create a new user record
    # This prepares the data to be inserted into the "users" table.
    new_user = User(email=user.email, password_hash=hashed_password)
    db.add(new_user)  # Add the new user record to the session
    db.commit()  # Commit the transaction to save the changes in the database
    db.refresh(new_user)  # Refresh the new_user instance to populate it with the database-generated fields (e.g., ID)

    # Return a success message with the new user's ID
    return {"message": "User registered successfully", "user_id": new_user.id}
