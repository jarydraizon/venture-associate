
# Import necessary components from SQLAlchemy library which is a toolkit 
# for SQL databases access
from sqlalchemy import create_engine

# Import the declarative_base function to define the structure 
# of the database schema in our application
from sqlalchemy.ext.declarative import declarative_base

# Import sessionmaker, a factory for creating new Session objects which 
# are used to interact with the database
from sqlalchemy.orm import sessionmaker

# Import application settings which typically includes the database URL
from config import settings

# Create a new SQLAlchemy engine instance which is used to manage the
# connection to the database using the database URL provided in settings
engine = create_engine(settings.DATABASE_URL)

# Create a configured "Session" class using sessionmaker. This session
# will be used throughout your application to interact with your database.
# autocommit=False means transactions won’t be committed automatically.
# autoflush=False means that the session will not try to flush operations
# to the database automatically. The session is bound to our engine.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a Base class for your SQLAlchemy models to extend. It will contain
# metadata about the database schema and will be used to create the database tables.
Base = declarative_base()
