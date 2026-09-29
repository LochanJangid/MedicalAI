import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../lib/supabaseClient'
import MessageBubble from './MessageBubble'
import ChatInput from './ChatInput'
import TypingIndicator from './TypingIndicator'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function ChatWindow({
  conversationId,
  incognito,
  onConversationCreated,
  onMessagesChange,
}) {
  const [messages, setMessages] = useState([])
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)

  const bottomRef = useRef(null)

  useEffect(() => {
    onMessagesChange?.(messages)
  }, [messages])

  useEffect(() => {
    if (!conversationId) {
      setMessages([])
      return
    }

    const loadHistory = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      const res = await fetch(
        `${API_URL}/chat/conversations/${conversationId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      )

      if (res.ok) {
        const data = await res.json()

        setMessages(
          data.messages.map((m) => ({
            role: m.role,
            content: m.content,
            timestamp: m.created_at,
          }))
        )
      }
    }

    loadHistory()
  }, [conversationId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }, [messages, sending])

  const handleSend = async (content) => {
    setError(null)

    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content,
        timestamp: new Date().toISOString(),
      },
    ])

    setSending(true)

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      const token = session?.access_token

      const res = await fetch(`${API_URL}/chat/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          conversation_id: incognito ? null : conversationId,
          content,
          incognito,
        }),
      })

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
      }

      const data = await res.json()

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.reply.content,
          timestamp: data.reply.created_at,
        },
      ])

      if (!incognito && !conversationId && data.conversation_id) {
        onConversationCreated?.(data.conversation_id)
      }
    } catch (err) {
      console.error('Chat send failed:', err)

      setError(
        'Something went wrong sending that message. Please try again.'
      )
    } finally {
      setSending(false)
    }
  }

  /*
   * EMPTY CHAT
   */
  if (messages.length === 0) {
    return (
      <div className="relative h-full min-h-0 overflow-hidden bg-transparent">
        {/* Center content */}
        <div className="absolute inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-4 pb-32">
            <div className="w-full max-w-xl text-center">
              <div className="mb-5 text-3xl text-rose-300/80">
                ♡
              </div>

              <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                What symptoms are you experiencing?
              </h1>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-500">
                Take your time. Describe what you're experiencing and
                we'll go through it one question at a time.
              </p>

              <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-neutral-600">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-300/70" />
                Private conversation · AI-assisted health information
              </div>
            </div>
          </div>
        </div>

        {/* 
          FLOATING INPUT ONLY

          This wrapper has:
          - no background
          - no border
          - no shadow
          - no backdrop blur
          - no rounded container

          It exists ONLY to position the input.
        */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-4 pb-4 sm:px-6">
          <div className="mx-auto w-full max-w-3xl">
            <div className="pointer-events-auto">
              {error && (
                <p className="mb-2 text-center text-xs text-red-400">
                  {error}
                </p>
              )}

              <ChatInput
                onSend={handleSend}
                disabled={sending}
                placeholder="Describe how you're feeling..."
                forceDark
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  /*
   * ACTIVE CHAT
   */
  return (
    <div className="relative h-full min-h-0 overflow-hidden bg-transparent">
      {/* Messages */}
      <div className="absolute inset-0 overflow-y-auto">
        <div className="mx-auto w-full max-w-2xl px-4 pb-32 pt-6 sm:px-6">
          {messages.map((m, i) => (
            <MessageBubble
              key={i}
              role={m.role}
              content={m.content}
              timestamp={m.timestamp}
            />
          ))}

          {sending && <TypingIndicator />}

          <div
            ref={bottomRef}
            className="h-1"
          />
        </div>
      </div>

      {/* 
        FLOATING INPUT ONLY

        Absolutely positioned over the chat.
        Nothing behind it.
      */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-4 pb-4 sm:px-6">
        <div className="mx-auto w-full max-w-3xl">
          <div className="pointer-events-auto">
            {error && (
              <p className="mb-2 text-center text-xs text-red-400">
                {error}
              </p>
            )}

            <ChatInput
              onSend={handleSend}
              disabled={sending}
              forceDark
            />
          </div>
        </div>
      </div>
    </div>
  )
}