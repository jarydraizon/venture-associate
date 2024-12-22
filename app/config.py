
# Import BaseSettings from the pydantic library.
# This is used to handle and validate settings using pydantic's features
from pydantic import BaseSettings

# Define a 'Settings' class that inherits from 'BaseSettings'.
# This class will hold the configuration variables for your application.
class Settings(BaseSettings):
    # Define a variable 'DATABASE_URL' which should be of type string.
    # This will hold the URL for connecting to the database.
    DATABASE_URL: str

    # Nested Config class inside Settings for additional configurations.
    class Config:
        # Specify the name of the environment file.
        # This file is where the configuration values are read from.
        env_file = ".env"

# Create an instance of the Settings class.
# This will trigger reading and validation of the settings from the .env file.
settings = Settings()
