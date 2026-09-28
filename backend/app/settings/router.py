import uuid
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.db.session import get_db
from app.db.models import UserSettings
from app.settings.schemas import SettingsOut, SettingsUpdate

router = APIRouter(prefix="/settings", tags=["settings"])


def _get_or_create(db: Session, user_id: uuid.UUID) -> UserSettings:
    settings_row = db.get(UserSettings, user_id)
    if not settings_row:
        settings_row = UserSettings(user_id=user_id)
        db.add(settings_row)
        db.commit()
        db.refresh(settings_row)
    return settings_row


@router.get("", response_model=SettingsOut)
def get_settings(user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    return _get_or_create(db, uuid.UUID(user["sub"]))


@router.put("", response_model=SettingsOut)
def update_settings(
    payload: SettingsUpdate,
    user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    settings_row = _get_or_create(db, uuid.UUID(user["sub"]))
    if payload.custom_instructions is not None:
        settings_row.custom_instructions = payload.custom_instructions
    if payload.language is not None:
        settings_row.language = payload.language
    db.commit()
    db.refresh(settings_row)
    return settings_row