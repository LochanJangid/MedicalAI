import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.auth.dependencies import get_current_user
from app.db.session import get_db
from app.db.models import Conversation, Message, UserSettings
from app.chat.schemas import (
    SendMessageRequest,
    SendMessageResponse,
    ConversationHistory,
    ConversationList,
    ConversationSummary,
    MessageOut,
    GuestChatRequest,
    GuestChatResponse,
)
from app.chat.service import get_chat_reply

router = APIRouter(prefix="/chat", tags=["chat"])

MAX_GUEST_MESSAGES = 3


def _title_from_content(content: str) -> str:
    title = content.strip().split("\n")[0]
    return title[:60] + ("..." if len(title) > 60 else "")


@router.post("/send", response_model=SendMessageResponse)
def send_message(
    payload: SendMessageRequest,
    user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user_id = uuid.UUID(user["sub"])

    # Pull the user's custom instructions + language for this reply
    settings_row = db.get(UserSettings, user_id)
    custom_instructions = settings_row.custom_instructions if settings_row else ""
    language = settings_row.language if settings_row else "en"

    if payload.incognito:
        # Nothing touches the database — just call the model with what the
        # frontend sends as history isn't tracked server-side in incognito mode,
        # so each incognito message is treated as a fresh, single-turn exchange
        # unless the frontend keeps its own local history and resends it.
        reply_text = get_chat_reply(
            [{"role": "user", "content": payload.content}],
            custom_instructions,
            language,
        )
        return SendMessageResponse(
            conversation_id=None,
            reply=MessageOut(role="assistant", content=reply_text),
        )

    # Get or create the conversation
    if payload.conversation_id:
        conversation = db.get(Conversation, payload.conversation_id)
        if not conversation or conversation.user_id != user_id:
            raise HTTPException(status_code=404, detail="Conversation not found")
    else:
        conversation = Conversation(user_id=user_id, title=_title_from_content(payload.content))
        db.add(conversation)
        db.flush()  # get conversation.id before commit

    # Save the user's message
    user_message = Message(conversation_id=conversation.id, role="user", content=payload.content)
    db.add(user_message)
    db.flush()

    # Build history for the LLM call
    past_messages = db.scalars(
        select(Message)
        .where(Message.conversation_id == conversation.id)
        .order_by(Message.created_at)
    ).all()
    history = [{"role": m.role, "content": m.content} for m in past_messages]

    # Call the LLM
    reply_text = get_chat_reply(history, custom_instructions, language)

    # Save the assistant's reply
    assistant_message = Message(conversation_id=conversation.id, role="assistant", content=reply_text)
    db.add(assistant_message)
    db.commit()
    db.refresh(assistant_message)

    return SendMessageResponse(
        conversation_id=conversation.id,
        reply=MessageOut.model_validate(assistant_message),
    )


@router.post("/guest", response_model=GuestChatResponse)
def guest_chat(payload: GuestChatRequest):
    """
    No auth required, nothing written to the database. The frontend keeps its own
    local history and resends it in full each turn. The 3-message cap is enforced
    here too (not just in the UI) since the frontend's disabled button is easy to bypass.
    """
    user_turns = [m for m in payload.history if m.role == "user"]
    if len(user_turns) > MAX_GUEST_MESSAGES:
        raise HTTPException(
            status_code=403,
            detail=f"Guest limit of {MAX_GUEST_MESSAGES} messages reached. Sign in to continue.",
        )

    history = [{"role": m.role, "content": m.content} for m in payload.history]
    reply_text = get_chat_reply(history)  # default prompt, no custom instructions/language for guests
    return GuestChatResponse(reply=reply_text)


@router.get("/conversations", response_model=ConversationList)
def list_conversations(user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    user_id = uuid.UUID(user["sub"])
    conversations = db.scalars(
        select(Conversation)
        .where(Conversation.user_id == user_id)
        .order_by(Conversation.created_at.desc())
    ).all()
    return ConversationList(
        conversations=[ConversationSummary.model_validate(c) for c in conversations]
    )


@router.get("/conversations/{conversation_id}/messages", response_model=ConversationHistory)
def get_messages(
    conversation_id: uuid.UUID,
    user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    conversation = db.get(Conversation, conversation_id)
    if not conversation or str(conversation.user_id) != user["sub"]:
        raise HTTPException(status_code=404, detail="Conversation not found")

    messages = db.scalars(
        select(Message)
        .where(Message.conversation_id == conversation_id)
        .order_by(Message.created_at)
    ).all()

    return ConversationHistory(
        conversation_id=conversation_id,
        messages=[MessageOut.model_validate(m) for m in messages],
    )


@router.delete("/conversations/{conversation_id}", status_code=204)
def delete_conversation(
    conversation_id: uuid.UUID,
    user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    conversation = db.get(Conversation, conversation_id)
    if not conversation or str(conversation.user_id) != user["sub"]:
        raise HTTPException(status_code=404, detail="Conversation not found")
    db.delete(conversation)
    db.commit()