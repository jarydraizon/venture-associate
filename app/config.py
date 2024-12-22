from pydantic import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://username:password@localhost/db_name"

    class Config:
        env_file = ".env"  # Load variables from a .env file

settings = Settings()
