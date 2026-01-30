from supabase import create_client, Client
from app.core.config import settings
from functools import lru_cache

@lru_cache()
def get_supabase_client() -> Client:
    url = settings.SUPABASE_URL
    key = settings.SUPABASE_KEY
    return create_client(url, key)
