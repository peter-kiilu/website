from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
import uuid

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    student_id: str
    department: str
    points: int = 0

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    student_id: Optional[str] = None
    department: Optional[str] = None
    points: Optional[int] = None

class UserInDB(UserBase):
    id: uuid.UUID
    joined_at: datetime
    
    class Config:
        from_attributes = True

class UserOut(UserBase):
    id: uuid.UUID
    joined_at: datetime

    class Config:
        from_attributes = True
