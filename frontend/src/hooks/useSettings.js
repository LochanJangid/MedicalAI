import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function authHeaders() {
  const { data: { session } } = await supabase.auth.getSession()
  return {
    Authorization: `Bearer ${session?.access_token}`,
    'Content-Type': 'application/json',
  }
}

export function useSettings() {
  const [settings, setSettings] = useState({ custom_instructions: '', language: 'en' })
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    const headers = await authHeaders()
    const res = await fetch(`${API_URL}/settings`, { headers })
    if (res.ok) setSettings(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const updateSettings = async (partial) => {
    const headers = await authHeaders()
    const res = await fetch(`${API_URL}/settings`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(partial),
    })
    if (res.ok) setSettings(await res.json())
  }

  return { settings, loading, updateSettings }
}