import uuid
from datetime import datetime
from pydantic import BaseModel


class SendMessageRequest(BaseModel):
    conversation_id: uuid.UUID | None = None  # None = start a new conversation
    content: str
    incognito: bool = False  # if true, nothing is saved to the database


class MessageOut(BaseModel):
    id: uuid.UUID | None = None
    role: str
    content: str
    created_at: datetime | None = None

    class Config:
        from_attributes = True


class SendMessageResponse(BaseModel):
    conversation_id: uuid.UUID | None  # None when incognito
    reply: MessageOut


class ConversationHistory(BaseModel):
    conversation_id: uuid.UUID
    messages: list[MessageOut]


class ConversationSummary(BaseModel):
    id: uuid.UUID
    title: str
    created_at: datetime

    class Config:
        from_attributes = True


class ConversationList(BaseModel):
    conversations: list[ConversationSummary]


class GuestMessage(BaseModel):
    role: str
    content: str


class GuestChatRequest(BaseModel):
    history: list[GuestMessage]


class GuestChatResponse(BaseModel):
    reply: str