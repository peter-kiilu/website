from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import users

app = FastAPI(title=settings.PROJECT_NAME)

# CORS
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://young-innovators.vercel.app", # Placeholder for potential Vercel URL
]

# Allow any domain if FRONTEND_URL is set (Render/Vercel)
import os
frontend_url = os.getenv("FRONTEND_URL")
if frontend_url:
    origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])

@app.get("/")
def root():
    return {"message": "Welcome to Young Innovators API"}
