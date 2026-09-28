from pydantic import BaseModel


class Doctor(BaseModel):
    name: str
    kind: str  # "hospital" | "clinic" | "doctor" | "dentist"
    match: str  # "specialist" | "multispecialty" | "general"
    distance_km: float
    lat: float
    lng: float
    address: str | None = None
    phone: str | None = None


class NearbyDoctorsResponse(BaseModel):
    doctors: list[Doctor]
    specialty: str
    specialty_label: str
    fallback: bool  # True = nothing matched the specialty, showing general results instead


class ChatTurn(BaseModel):
    role: str
    content: str


class SuggestSpecialtyRequest(BaseModel):
    messages: list[ChatTurn]


class SuggestSpecialtyResponse(BaseModel):
    specialty: str
    specialty_label: str