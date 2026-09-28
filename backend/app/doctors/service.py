import math
import time
import httpx

from app.doctors.specialties import classify

OVERPASS_URL = "https://overpass-api.de/api/interpreter"
CACHE_TTL_SECONDS = 600

# Cache of raw Overpass elements, keyed by (rounded lat, rounded lng, radius).
# Distances and specialty filtering are recomputed per request.
_cache: dict[tuple, tuple[float, list]] = {}

KIND_LABELS = {"hospital": "hospital", "clinic": "clinic", "doctors": "doctor", "dentist": "dentist"}


def haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    r = 6371.0
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp = p2 - p1
    dl = math.radians(lon2 - lon1)
    a = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * r * math.asin(math.sqrt(a))


def _build_query(lat: float, lng: float, radius_m: int) -> str:
    return f"""
[out:json][timeout:25];
(
  node["amenity"~"^(doctors|clinic|hospital|dentist)$"](around:{radius_m},{lat},{lng});
  way["amenity"~"^(doctors|clinic|hospital|dentist)$"](around:{radius_m},{lat},{lng});
);
out center tags 200;
"""


def _fetch_elements(lat: float, lng: float, radius_m: int) -> list:
    key = (round(lat, 2), round(lng, 2), radius_m)
    cached = _cache.get(key)
    if cached and time.time() - cached[0] < CACHE_TTL_SECONDS:
        return cached[1]

    resp = httpx.post(
        OVERPASS_URL,
        data={"data": _build_query(lat, lng, radius_m)},
        headers={"User-Agent": "MedicalAI/0.1 (personal project)"},
        timeout=30,
    )
    resp.raise_for_status()
    elements = resp.json().get("elements", [])
    _cache[key] = (time.time(), elements)
    return elements


def _collect(lat: float, lng: float, radius_m: int, specialty: str) -> list[dict]:
    results = []
    seen = set()

    for el in _fetch_elements(lat, lng, radius_m):
        tags = el.get("tags", {})
        name = tags.get("name")
        if not name:
            continue  # unnamed entries aren't useful to show

        amenity = tags.get("amenity")
        if amenity == "dentist" and specialty != "dentistry":
            continue  # dentists only appear for dental searches

        if el["type"] == "node":
            el_lat, el_lng = el.get("lat"), el.get("lon")
        else:
            center = el.get("center") or {}
            el_lat, el_lng = center.get("lat"), center.get("lon")
        if el_lat is None or el_lng is None:
            continue

        dedupe_key = (name.lower(), round(el_lat, 3), round(el_lng, 3))
        if dedupe_key in seen:
            continue
        seen.add(dedupe_key)

        match = "general" if specialty == "general" else classify(tags, name, specialty)
        if match is None:
            continue

        address_parts = [
            tags.get("addr:housenumber"),
            tags.get("addr:street"),
            tags.get("addr:suburb") or tags.get("addr:neighbourhood"),
            tags.get("addr:city"),
        ]

        results.append(
            {
                "name": name,
                "kind": KIND_LABELS.get(amenity, "clinic"),
                "match": match,
                "distance_km": round(haversine_km(lat, lng, el_lat, el_lng), 2),
                "lat": el_lat,
                "lng": el_lng,
                "address": ", ".join(p for p in address_parts if p) or None,
                "phone": tags.get("phone") or tags.get("contact:phone"),
            }
        )

    # Dedicated specialists first, then multi-specialty hospitals; nearest first within each.
    order = {"specialist": 0, "multispecialty": 1, "general": 0}
    results.sort(key=lambda d: (order[d["match"]], d["distance_km"]))
    return results


def find_nearby(lat: float, lng: float, radius_m: int, specialty: str, limit: int = 15):
    """Returns (doctors, fallback). fallback=True means nothing matched the specialty
    and the general list is returned instead."""
    results = _collect(lat, lng, radius_m, specialty)
    if specialty != "general" and not results:
        return _collect(lat, lng, radius_m, "general")[:limit], True
    return results[:limit], False