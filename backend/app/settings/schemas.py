from pydantic import BaseModel


class SettingsOut(BaseModel):
    custom_instructions: str
    language: str

    class Config:
        from_attributes = True


class SettingsUpdate(BaseModel):
    custom_instructions: str | None = None
    language: str | None = None