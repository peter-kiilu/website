from fastapi import APIRouter, Depends, HTTPException
from app.models.user import UserCreate, UserOut
from app.db.supabase import get_supabase_client
from supabase import Client
import uuid
from datetime import datetime

router = APIRouter()

@router.post("/register", response_model=UserOut)
def register_user(user: UserCreate, supabase: Client = Depends(get_supabase_client)):
    # Prepare data
    user_data = user.model_dump()
    
    # Manually handle fields that DB might auto-generate if we rely on it, 
    # but here we are explicit for the API response match
    # Note: In a real auth flow, we'd use supabase.auth.sign_up()
    # Here we are simulating a "Store Users" table.
    
    # Ensure ID and joined_at are set if not by DB (assuming DB defaults for now, but let's be safe)
    # Actually, let's let Supabase handle default ID/timestamps if configured, 
    # but to return a valid UserOut immediately, we might need to fetch it back.
    
    # We will try to insert and return selected fields.
    
    try:
        # We'll rely on the DB to return the created record
        # Note: 'password' is in user_data. In production, HASH THIS or use Auth service.
        # For this task, we pass it through to the DB (assuming 'users' table has a password column)
        
        response = supabase.table("users").insert(user_data).execute()
        
        if not response.data:
            raise HTTPException(status_code=400, detail="User creation failed")
            
        return response.data[0]
        
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/me", response_model=UserOut)
def get_user_me(email: str, supabase: Client = Depends(get_supabase_client)):
    # Simple fetch by email for demo
    try:
        response = supabase.table("users").select("*").eq("email", email).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="User not found")
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

from app.models.user import UserLogin
@router.post("/login", response_model=UserOut)
def login_user(user_in: UserLogin, supabase: Client = Depends(get_supabase_client)):
    try:
        # In ANY real app, verify password hash. Here we compare plain text as per simple requirements/previous steps.
        response = supabase.table("users").select("*").eq("email", user_in.email).eq("password", user_in.password).execute()
        
        if not response.data:
             raise HTTPException(status_code=401, detail="Invalid email or password")
             
        return response.data[0]
    except Exception as e:
        print(f"Login Error: {e}")
        raise HTTPException(status_code=400, detail=str(e))
