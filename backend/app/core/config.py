from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Young Innovators API"
    SUPABASE_URL: str
    SUPABASE_KEY: str
    FRONTEND_URL: str = "http://localhost:5173"

    class Config:
        # Read from root .env file (parent of backend folder)
        env_file = "../.env"
        extra = "ignore"  # Ignore extra env vars like VITE_* that backend doesn't use

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()
