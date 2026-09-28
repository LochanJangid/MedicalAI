import { useState, useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import ChatInput from './ChatInput'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const MAX_GUEST_MESSAGES = 3

export default function GuestChatWindow() {
  const [messages, setMessages] = useState([])
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)

  const userTurns = messages.filter((m) => m.role === 'user').length
  const limitReached = userTurns >= MAX_GUEST_MESSAGES

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, sending])

  const handleSend = async (content) => {
    const next = [...messages, { role: 'user', content }]
    setMessages(next)
    setSending(true)

    try {
      const res = await fetch(`${API_URL}/chat/guest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: next }),
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      console.error('Guest chat failed:', err)
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
    } finally {
      setSending(false)
    }
  }

  if (messages.length === 0) {
    return (
      <div className="relative flex-1 min-h-0 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4">
          <div className="text-xl font-semibold text-gray-100 text-center">
            Try MedicalAI — {MAX_GUEST_MESSAGES} free messages, nothing saved
          </div>
          <div className="w-full max-w-xl">
            <ChatInput onSend={handleSend} disabled={sending} placeholder="Describe how you're feeling..." forceDark />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex-1 min-h-0 flex flex-col">
      <div className="flex-1 overflow-y-auto min-h-0 px-6 pt-6 pb-2 max-w-2xl w-full mx-auto">
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} content={m.content} forceDark />
        ))}
        {sending && <MessageBubble role="assistant" content="Typing..." forceDark />}
        <div ref={bottomRef} />
      </div>

      <div className="shrink-0 sticky bottom-0 w-full max-w-2xl mx-auto px-6 pb-5 pt-3 bg-neutral-950/70 backdrop-blur-md border-t border-neutral-800">
        {limitReached ? (
          <div className="text-center text-sm text-gray-400 py-2">
            You've used your {MAX_GUEST_MESSAGES} free messages.{' '}
            <a href="/login" className="text-cyan-400 font-medium">
              Sign in with Google
            </a>{' '}
            to keep chatting and save your history.
          </div>
        ) : (
          <>
            <ChatInput onSend={handleSend} disabled={sending} forceDark />
            <div className="text-xs text-gray-500 mt-1 text-center">
              {MAX_GUEST_MESSAGES - userTurns} free message{MAX_GUEST_MESSAGES - userTurns === 1 ? '' : 's'} left — nothing is saved
            </div>
          </>
        )}
      </div>
    </div>
  )
}