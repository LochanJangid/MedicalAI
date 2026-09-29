import { useState, useCallback, useRef } from 'react'
import { supabase } from '../lib/supabaseClient'

const API_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:8001'
).replace(/\/$/, '')

async function readError(res) {
  const body = await res.json().catch(() => ({}))
  return body.detail || body.message || `Request failed: ${res.status}`
}

export function useNearbyDoctors() {
  const [state, setState] = useState({
    status: 'idle',
    doctors: [],
    error: null,
    specialtyLabel: null,
    fallback: false,
  })

  const coordsRef = useRef(null)

  const getCoords = (force = false) =>
    new Promise((resolve, reject) => {
      if (coordsRef.current && !force) {
        return resolve(coordsRef.current)
      }

      if (!navigator.geolocation) {
        return reject(
          new Error('Your browser does not support location.')
        )
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }

          coordsRef.current = coords
          resolve(coords)
        },
        (err) => {
          reject(
            new Error(
              err.code === 1
                ? 'Location permission was denied. Allow location access in your browser to find nearby doctors.'
                : 'Could not get your location. Try again.'
            )
          )
        },
        {
          timeout: 10000,
          maximumAge: force ? 0 : 300000,
        }
      )
    })

  const search = useCallback(
    async ({
      mode = 'auto',
      messages = [],
      refreshLocation = false,
    } = {}) => {
      try {
        // -----------------------------------------
        // Location
        // -----------------------------------------

        setState((s) => ({
          ...s,
          status: 'locating',
          error: null,
        }))

        const { lat, lng } = await getCoords(refreshLocation)

        // -----------------------------------------
        // Supabase authentication
        // -----------------------------------------

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          console.error(
            'Supabase session error:',
            sessionError
          )

          throw new Error(
            'Could not verify your login session. Please sign in again.'
          )
        }

        // IMPORTANT:
        // Never send "Bearer undefined"
        if (!session?.access_token) {
          console.error(
            'No Supabase access token found.',
            {
              hasSession: !!session,
              session,
            }
          )

          throw new Error(
            'Your login session is missing. Please sign in again.'
          )
        }

        const accessToken = session.access_token

        console.log(
          'Supabase access token exists:',
          !!accessToken
        )

        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }

        // -----------------------------------------
        // Determine specialty
        // -----------------------------------------

        let specialty = mode

        if (mode === 'auto') {
          specialty = 'general'

          const userMessages = messages.filter(
            (m) =>
              m?.role === 'user' &&
              typeof m?.content === 'string' &&
              m.content.trim()
          )

          if (userMessages.length > 0) {
            setState((s) => ({
              ...s,
              status: 'analysing',
            }))

            const res = await fetch(
              `${API_URL}/doctors/suggest-specialty`,
              {
                method: 'POST',
                headers,
                body: JSON.stringify({
                  messages: userMessages.map(
                    ({ role, content }) => ({
                      role,
                      content,
                    })
                  ),
                }),
              }
            )

            if (!res.ok) {
              throw new Error(await readError(res))
            }

            const data = await res.json()

            specialty = data.specialty || 'general'
          }
        }

        // -----------------------------------------
        // Nearby doctors
        // -----------------------------------------

        setState((s) => ({
          ...s,
          status: 'loading',
        }))

        const params = new URLSearchParams({
          lat: String(lat),
          lng: String(lng),
          specialty: specialty || 'general',
        })

        console.log(
          'Calling doctors API:',
          `${API_URL}/doctors/nearby?${params.toString()}`
        )

        const res = await fetch(
          `${API_URL}/doctors/nearby?${params.toString()}`,
          {
            method: 'GET',
            headers,
          }
        )

        if (!res.ok) {
          throw new Error(await readError(res))
        }

        const data = await res.json()

        setState({
          status: 'done',
          doctors: data.doctors || [],
          error: null,
          specialtyLabel: data.specialty_label,
          fallback: Boolean(data.fallback),
        })
      } catch (err) {
        console.error('Nearby doctors error:', err)

        setState((s) => ({
          ...s,
          status: 'error',
          doctors: [],
          error:
            err instanceof Error
              ? err.message
              : 'Could not find nearby doctors.',
        }))
      }
    },
    []
  )

  return {
    ...state,
    search,
  }
}