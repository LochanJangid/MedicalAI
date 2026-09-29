import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import MessageBubble from './MessageBubble'
import ChatInput from './ChatInput'
import TypingIndicator from './TypingIndicator'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Guest users can send exactly 3 messages
const MAX_GUEST_MESSAGES = 3

export default function GuestChatWindow() {
  const [messages, setMessages] = useState([])
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)

  const bottomRef = useRef(null)

  // Count ONLY user messages
  const userTurns = messages.filter(
    (message) => message.role === 'user'
  ).length

  // Hard limit after 3 user messages
  const limitReached = userTurns >= MAX_GUEST_MESSAGES

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }, [messages, sending])

  const handleSend = async (content) => {
    // HARD BLOCK
    // Never allow a 4th guest message
    if (limitReached || sending) {
      return
    }

    setError(null)

    const next = [
      ...messages,
      {
        role: 'user',
        content,
      },
    ]

    setMessages(next)
    setSending(true)

    try {
      const res = await fetch(`${API_URL}/chat/guest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          history: next.map(({ role, content }) => ({
            role,
            content,
          })),
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
          content: data.reply,
        },
      ])
    } catch (err) {
      console.error('Guest chat failed:', err)

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
      <div className="relative h-full overflow-hidden bg-transparent">
        {/* Scrollable content */}
        <div className="absolute inset-0 overflow-y-auto pb-40">
          <div className="flex min-h-full items-center justify-center px-4">
            <div className="w-full max-w-xl text-center">
              <div className="mb-5 text-3xl text-rose-300/80">
                ♡
              </div>

              <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Take a breath.
                <br />
                Tell me what's going on.
              </h1>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-500">
                Describe what you're experiencing. We'll go through it
                one question at a time.
              </p>

              <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-neutral-600">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-300/70" />
                {MAX_GUEST_MESSAGES} free messages · nothing is saved
              </div>
            </div>
          </div>
        </div>

        {/* Fixed input */}
        <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-white/[0.06] bg-[#0d0b10]/90 px-4 pb-5 pt-3 backdrop-blur-2xl sm:px-6">
          <div className="mx-auto w-full max-w-2xl">
            {error && (
              <p className="mb-2 text-center text-xs text-red-400">
                {error}
              </p>
            )}

            <ChatInput
              onSend={handleSend}
              disabled={sending || limitReached}
              placeholder="Describe how you're feeling..."
              forceDark
            />

            <div className="mt-2 text-center text-[10px] text-neutral-600">
              {MAX_GUEST_MESSAGES} free messages · nothing is saved
            </div>
          </div>
        </div>
      </div>
    )
  }

  /*
   * CHAT WITH MESSAGES
   */
  return (
    <div className="relative h-full overflow-hidden bg-transparent">
      {/* Scrollable messages */}
      <div className="absolute inset-0 overflow-y-auto">
        <div className="mx-auto w-full max-w-2xl px-4 pb-40 pt-6 sm:px-6">
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              role={message.role}
              content={message.content}
              forceDark
            />
          ))}

          {sending && <TypingIndicator forceDark />}

          <div ref={bottomRef} className="h-1" />
        </div>
      </div>

      {/* Fixed bottom input */}
      <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-white/[0.06] bg-[#0d0b10]/90 px-4 pb-5 pt-3 backdrop-blur-2xl sm:px-6">
        <div className="mx-auto w-full max-w-2xl">
          {limitReached ? (
            /*
             * BLOCKED STATE AFTER 3 MESSAGES
             */
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] px-5 py-4 text-center backdrop-blur-xl">
              <p className="text-sm text-neutral-400">
                You've used your {MAX_GUEST_MESSAGES} free messages.
              </p>

              <Link
                to="/login"
                className="mt-1 inline-block text-sm font-medium text-rose-300 transition-colors hover:text-rose-200"
              >
                Sign in to continue →
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <p className="mb-2 text-center text-xs text-red-400">
                  {error}
                </p>
              )}

              <ChatInput
                onSend={handleSend}
                disabled={sending || limitReached}
                placeholder="Describe how you're feeling..."
                forceDark
              />

              <div className="mt-2 text-center text-[10px] text-neutral-600">
                {MAX_GUEST_MESSAGES - userTurns} free message
                {MAX_GUEST_MESSAGES - userTurns === 1 ? '' : 's'} left

                <span className="mx-1.5 text-neutral-700">
                  ·
                </span>

                nothing is saved
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}