from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    supabase_jwt_secret: str = "" 
    supabase_url: str
    database_url: str
    groq_api_key: str
    allowed_origins: str = "http://localhost:5173"

    class Config:
        env_file = ".env"


settings = Settings()