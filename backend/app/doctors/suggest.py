import re
from app.chat.service import client
from app.doctors.specialties import SPECIALTIES

PROMPT = """You route patients to a medical specialty. Read the conversation and pick the single most relevant specialty for the user's symptoms or condition.
Reply with exactly one word from this list and nothing else: {keys}.
If the symptoms are unclear, mild, or don't fit one specialty, reply: general"""


def suggest_specialty(messages: list[dict]) -> str:
    transcript = "\n".join(
        f"{'User' if m['role'] == 'user' else 'Assistant'}: {m['content']}" for m in messages[-12:]
    )
    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[
            {"role": "system", "content": PROMPT.format(keys=", ".join(SPECIALTIES))},
            {"role": "user", "content": transcript},
        ],
        max_tokens=300,
    )
    text = (response.choices[0].message.content or "").strip().lower()
    for key in SPECIALTIES:
        if re.search(rf"\b{key}\b", text):
            return key
    return "general"