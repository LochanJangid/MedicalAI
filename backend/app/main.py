from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.auth.dependencies import get_current_user
from app.core.config import settings
from app.chat.router import router as chat_router
from app.settings.router import router as settings_router
from app.doctors.router import router as doctors_router

app = FastAPI(title="MedicalAI API")
app.include_router(chat_router)
app.include_router(settings_router)
app.include_router(doctors_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in settings.allowed_origins.split(",") if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/me")
def read_current_user(user: dict = Depends(get_current_user)):
    """Protected test route — confirms the frontend's token reaches the backend."""
    return {"user_id": user["sub"], "email": user.get("email")}