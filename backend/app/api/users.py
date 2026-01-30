from fastapi import APIRouter, Depends, HTTPException
from app.models.user import UserCreate, UserOut
from app.db.supabase import get_supabase_client
from supabase import Client
import uuid
from datetime import datetime

router = APIRouter()

@router.post("/register", response_model=UserOut)
def register_user(user: UserCreate, supabase: Client = Depends(get_supabase_client)):
    # Prepare data - only include fields that exist in the current DB schema
    user_data = user.model_dump()
    
    # Always remove new fields that may not exist in the database yet
    # Once you add these columns to your DB, you can remove this block
    new_fields_to_remove = ['role', 'bio', 'expertise', 'availability', 'is_verified', 'year_of_study']
    for field in new_fields_to_remove:
        user_data.pop(field, None)
    
    try:

        response = supabase.table("users").insert(user_data).execute()
        
        if not response.data:
            raise HTTPException(status_code=400, detail="User creation failed")
        
        # Return with defaults for missing fields
        result = response.data[0]
        result.setdefault('role', 'student')
        result.setdefault('bio', None)
        result.setdefault('expertise', None)
        result.setdefault('availability', None)
        result.setdefault('is_verified', False)
        return result
        
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

@router.get("/mentors", response_model=list[UserOut])
def get_mentors(supabase: Client = Depends(get_supabase_client)):
    """Fetch all users with role 'mentor' or 'staff'"""
    try:
        response = supabase.table("users").select("*").in_("role", ["mentor", "staff"]).execute()
        return response.data or []
    except Exception as e:
        print(f"Mentors Error: {e}")
        raise HTTPException(status_code=400, detail=str(e))
