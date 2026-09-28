import httpx
from fastapi import APIRouter, Depends, HTTPException, Query

from app.auth.dependencies import get_current_user
from app.doctors.schemas import (
    NearbyDoctorsResponse,
    SuggestSpecialtyRequest,
    SuggestSpecialtyResponse,
)
from app.doctors.service import find_nearby
from app.doctors.specialties import SPECIALTIES
from app.doctors.suggest import suggest_specialty

router = APIRouter(prefix="/doctors", tags=["doctors"])


@router.get("/nearby", response_model=NearbyDoctorsResponse)
def nearby_doctors(
    lat: float = Query(..., ge=-90, le=90),
    lng: float = Query(..., ge=-180, le=180),
    radius_m: int = Query(8000, ge=500, le=20000),
    specialty: str = Query("general"),
    user: dict = Depends(get_current_user),
):
    if specialty not in SPECIALTIES:
        raise HTTPException(status_code=400, detail=f"Unknown specialty: {specialty}")
    try:
        doctors, fallback = find_nearby(lat, lng, radius_m, specialty)
    except httpx.HTTPError:
        raise HTTPException(
            status_code=502,
            detail="The doctor search service is unavailable right now. Try again shortly.",
        )
    return NearbyDoctorsResponse(
        doctors=doctors,
        specialty=specialty,
        specialty_label=SPECIALTIES[specialty]["label"],
        fallback=fallback,
    )


@router.post("/suggest-specialty", response_model=SuggestSpecialtyResponse)
def suggest(payload: SuggestSpecialtyRequest, user: dict = Depends(get_current_user)):
    turns = [{"role": m.role, "content": m.content} for m in payload.messages]
    if not any(m["role"] == "user" for m in turns):
        specialty = "general"
    else:
        try:
            specialty = suggest_specialty(turns)
        except Exception:
            raise HTTPException(status_code=502, detail="Could not analyse your symptoms right now.")
    return SuggestSpecialtyResponse(specialty=specialty, specialty_label=SPECIALTIES[specialty]["label"])