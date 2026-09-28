from groq import Groq
from app.core.config import settings

client = Groq(api_key=settings.groq_api_key)

BASE_PROMPT = """You are a symptom-gathering assistant for a health app called MedicalAI.
Your job: ask short, clarifying questions to understand the user's symptoms
(onset, duration, severity, location, related symptoms). Be calm and plain-spoken.
You do NOT diagnose conditions and you do NOT prescribe treatment or medication.
If symptoms sound severe or urgent (chest pain, difficulty breathing, stroke signs,
severe bleeding, suicidal ideation, etc.), tell the user clearly to seek emergency
care or call local emergency services immediately.
Keep replies under 4 sentences unless the user asks for more detail."""


def build_system_prompt(custom_instructions: str = "", language: str = "en") -> str:
    parts = [BASE_PROMPT]
    if language and language != "en":
        parts.append(f"Respond in this language: {language}.")
    if custom_instructions:
        parts.append(f"Additional user preferences (follow these unless they conflict with safety): {custom_instructions}")
    return "\n\n".join(parts)


def get_chat_reply(history: list[dict], custom_instructions: str = "", language: str = "en") -> str:
    """
    history: list of {"role": "user"|"assistant", "content": str}, oldest first.
    Returns the assistant's reply text.
    """
    system_prompt = build_system_prompt(custom_instructions, language)
    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[
            {"role": "system", "content": system_prompt},
            *history,
        ],
        max_tokens=500,
    )
    return response.choices[0].message.content