import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../lib/supabaseClient'
import MessageBubble from './MessageBubble'
import ChatInput from './ChatInput'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function ChatWindow({ conversationId, incognito, onConversationCreated, onMessagesChange }) {
  const [messages, setMessages] = useState([])
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    onMessagesChange?.(messages)
  }, [messages]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!conversationId) {
      setMessages([])
      return
    }
    const loadHistory = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch(`${API_URL}/chat/conversations/${conversationId}/messages`, {
        headers: { Authorization: `Bearer ${session?.access_token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setMessages(data.messages.map((m) => ({ role: m.role, content: m.content })))
      }
    }
    loadHistory()
  }, [conversationId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, sending])

  const handleSend = async (content) => {
    setMessages((prev) => [...prev, { role: 'user', content }])
    setSending(true)

    try {
      const { data: { session } } = await supabase.auth.getSession()
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

      if (!res.ok) throw new Error(`Request failed: ${res.status}`)

      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply.content }])

      if (!incognito && !conversationId && data.conversation_id) {
        onConversationCreated?.(data.conversation_id)
      }
    } catch (err) {
      console.error('Chat send failed:', err)
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
    } finally {
      setSending(false)
    }
  }

  if (messages.length === 0) {
    return (
      <div className="relative flex-1 min-h-0 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4">
          <div className="text-xl font-semibold text-gray-900 dark:text-gray-100 text-center">
            What symptoms are you experiencing?
          </div>
          <div className="w-full max-w-xl">
            <ChatInput onSend={handleSend} disabled={sending} placeholder="Describe how you're feeling..." />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex-1 min-h-0 flex flex-col">
      <div className="flex-1 overflow-y-auto min-h-0 px-6 pt-6 pb-2 max-w-2xl w-full mx-auto">
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} content={m.content} />
        ))}
        {sending && <MessageBubble role="assistant" content="Typing..." />}
        <div ref={bottomRef} />
      </div>
      <div className="shrink-0 sticky bottom-0 w-full max-w-2xl mx-auto px-6 pb-5 pt-3 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border-t border-gray-200 dark:border-neutral-800">
        <ChatInput onSend={handleSend} disabled={sending} />
      </div>
    </div>
  )
}