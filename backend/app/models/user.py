from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional, Literal
from datetime import datetime
import uuid
import re

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    student_id: str
    department: str
    points: int = 0
    role: Literal['student', 'mentor', 'staff'] = 'student'
    bio: Optional[str] = None
    expertise: Optional[str] = None
    availability: Optional[str] = None
    is_verified: bool = False

class UserCreate(UserBase):
    password: str

    @field_validator('password')
    @classmethod
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        if not re.search(r'[A-Z]', v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not re.search(r'[a-z]', v):
            raise ValueError('Password must contain at least one lowercase letter')
        if not re.search(r'\d', v):
            raise ValueError('Password must contain at least one digit')
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', v):
            raise ValueError('Password must contain at least one special character')
        return v

    @field_validator('email')
    @classmethod
    def validate_email_domain(cls, v, info):
        role = info.data.get('role', 'student')
        email_lower = v.lower()
        is_ac_ke = email_lower.endswith('.ac.ke')
        is_gmail = '@gmail.com' in email_lower
        
        if role == 'student':
            if not is_ac_ke:
                raise ValueError('Students must use a valid school email ending with .ac.ke')
        elif role in ['mentor', 'staff']:
            if not (is_ac_ke or is_gmail):
                raise ValueError('Mentors/Staff must use a .ac.ke or @gmail.com email')
        return v

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
