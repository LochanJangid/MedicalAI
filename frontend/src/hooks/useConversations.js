import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function authHeader() {
  const { data: { session } } = await supabase.auth.getSession()
  return { Authorization: `Bearer ${session?.access_token}` }
}

export function useConversations() {
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    const headers = await authHeader()
    const res = await fetch(`${API_URL}/chat/conversations`, { headers })
    if (res.ok) {
      const data = await res.json()
      setConversations(data.conversations)
    }
    setLoading(false)
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const deleteConversation = async (id) => {
    const headers = await authHeader()
    await fetch(`${API_URL}/chat/conversations/${id}`, { method: 'DELETE', headers })
    setConversations((prev) => prev.filter((c) => c.id !== id))
  }

  return { conversations, loading, refresh, deleteConversation }
}