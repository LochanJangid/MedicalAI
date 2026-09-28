import re

# osm: values of the OpenStreetMap `healthcare:speciality` tag that count as a match.
# keywords: regexes matched against the place name (OSM speciality tags are sparse in
# India, so names like "Heart Care Centre" are the more common signal).
SPECIALTIES = {
    "general": {"label": "General", "osm": [], "keywords": []},
    "cardiology": {
        "label": "Cardiology (heart)",
        "osm": ["cardiology"],
        "keywords": [r"cardi", r"heart"],
    },
    "dermatology": {
        "label": "Dermatology (skin)",
        "osm": ["dermatology", "dermatology_and_venereology"],
        "keywords": [r"derma", r"\bskin\b"],
    },
    "orthopedics": {
        "label": "Orthopedics (bones & joints)",
        "osm": ["orthopaedics", "orthopedics", "orthopaedic_surgery", "traumatology"],
        "keywords": [r"ortho", r"\bbone\b", r"\bjoint\b", r"fracture"],
    },
    "ent": {
        "label": "ENT (ear, nose, throat)",
        "osm": ["otolaryngology", "ent"],
        "keywords": [r"\bent\b", r"otolaryng", r"\bear\b", r"\bnose\b", r"\bthroat\b"],
    },
    "ophthalmology": {
        "label": "Ophthalmology (eyes)",
        "osm": ["ophthalmology"],
        "keywords": [r"\beye\b", r"ophthal", r"netra", r"\bvision\b"],
    },
    "dentistry": {
        "label": "Dentistry",
        "osm": ["dentistry", "dental"],
        "keywords": [r"dental", r"dentist", r"\bteeth\b", r"\btooth\b"],
    },
    "pediatrics": {
        "label": "Pediatrics (children)",
        "osm": ["paediatrics", "pediatrics"],
        "keywords": [r"pediatr", r"paediatr", r"\bchild", r"\bkids?\b", r"\bbaby\b"],
    },
    "gynecology": {
        "label": "Gynecology (women's health)",
        "osm": ["gynaecology", "gynecology", "obstetrics", "obstetrics_and_gynecology"],
        "keywords": [r"gynae?co", r"maternity", r"\bwomen", r"obstet"],
    },
    "neurology": {
        "label": "Neurology (brain & nerves)",
        "osm": ["neurology", "neurosurgery"],
        "keywords": [r"neuro", r"\bbrain\b"],
    },
    "psychiatry": {
        "label": "Psychiatry (mental health)",
        "osm": ["psychiatry", "psychology"],
        "keywords": [r"psychiat", r"mental", r"psycholog", r"\bmind\b"],
    },
    "gastroenterology": {
        "label": "Gastroenterology (stomach & liver)",
        "osm": ["gastroenterology"],
        "keywords": [r"gastro", r"\bliver\b", r"digestive", r"\bstomach\b"],
    },
    "urology": {
        "label": "Urology & Nephrology (kidney)",
        "osm": ["urology", "nephrology"],
        "keywords": [r"urolog", r"nephro", r"\bkidney\b"],
    },
    "pulmonology": {
        "label": "Pulmonology (lungs)",
        "osm": ["pulmonology", "respiratory_medicine"],
        "keywords": [r"pulmon", r"\blung\b", r"\bchest\b", r"respirat"],
    },
    "endocrinology": {
        "label": "Endocrinology & Diabetes",
        "osm": ["endocrinology", "diabetology"],
        "keywords": [r"endocrin", r"diabet", r"thyroid"],
    },
}

# Big hospitals that cover most departments. Shown after dedicated specialists,
# since a multi-specialty hospital is a reasonable option for any specialty.
MULTI_SPECIALTY_RE = re.compile(r"multi.?special|super.?special|general hospital|medical college")


def classify(tags: dict, name: str, specialty: str) -> str | None:
    """Returns 'specialist', 'multispecialty', or None (no match)."""
    spec = SPECIALTIES[specialty]

    raw = tags.get("healthcare:speciality") or tags.get("healthcare:specialty") or ""
    tag_set = {t.strip().lower() for t in raw.replace(",", ";").split(";") if t.strip()}
    if tag_set & set(spec["osm"]):
        return "specialist"

    if specialty == "dentistry" and tags.get("amenity") == "dentist":
        return "specialist"

    lname = name.lower()
    if any(re.search(k, lname) for k in spec["keywords"]):
        return "specialist"

    if MULTI_SPECIALTY_RE.search(lname):
        return "multispecialty"

    return None