import { useState, useCallback, useRef } from 'react'
import { supabase } from '../lib/supabaseClient'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001'

async function readError(res) {
  const body = await res.json().catch(() => ({}))
  return body.detail || `Request failed: ${res.status}`
}

export function useNearbyDoctors() {
  // status: idle | locating | analysing | loading | done | error
  const [state, setState] = useState({
    status: 'idle',
    doctors: [],
    error: null,
    specialtyLabel: null,
    fallback: false,
  })
  const coordsRef = useRef(null)

  const getCoords = (force) =>
    new Promise((resolve, reject) => {
      if (coordsRef.current && !force) return resolve(coordsRef.current)
      if (!navigator.geolocation) return reject(new Error('Your browser does not support location.'))
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          coordsRef.current = { lat: pos.coords.latitude, lng: pos.coords.longitude }
          resolve(coordsRef.current)
        },
        (err) =>
          reject(
            new Error(
              err.code === 1
                ? 'Location permission was denied. Allow location access in your browser to find nearby doctors.'
                : 'Could not get your location. Try again.'
            )
          ),
        { timeout: 10000 }
      )
    })

  // mode: 'auto' (detect specialty from the chat) or a specialty key
  const search = useCallback(async ({ mode = 'auto', messages = [], refreshLocation = false } = {}) => {
    try {
      setState((s) => ({ ...s, status: 'locating', error: null }))
      const { lat, lng } = await getCoords(refreshLocation)

      const { data: { session } } = await supabase.auth.getSession()
      const headers = {
        Authorization: `Bearer ${session?.access_token}`,
        'Content-Type': 'application/json',
      }

      let specialty = mode
      if (mode === 'auto') {
        specialty = 'general'
        if (messages.some((m) => m.role === 'user')) {
          setState((s) => ({ ...s, status: 'analysing' }))
          const res = await fetch(`${API_URL}/doctors/suggest-specialty`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ messages: messages.map(({ role, content }) => ({ role, content })) }),
          })
          if (!res.ok) throw new Error(await readError(res))
          specialty = (await res.json()).specialty
        }
      }

      setState((s) => ({ ...s, status: 'loading' }))
      const res = await fetch(
        `${API_URL}/doctors/nearby?lat=${lat}&lng=${lng}&specialty=${encodeURIComponent(specialty)}`,
        { headers }
      )
      if (!res.ok) throw new Error(await readError(res))
      const data = await res.json()

      setState({
        status: 'done',
        doctors: data.doctors,
        error: null,
        specialtyLabel: data.specialty_label,
        fallback: data.fallback,
      })
    } catch (err) {
      setState((s) => ({ ...s, status: 'error', doctors: [], error: err.message }))
    }
  }, [])

  return { ...state, search }
}