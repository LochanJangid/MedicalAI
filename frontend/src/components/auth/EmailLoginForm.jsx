'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function EmailLoginForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    if (!email.trim()) {
      setError('Please enter your email.')
      return
    }

    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/chat`,
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }

    setLoading(false)
  }

  // Email sent state
  if (sent) {
    return (
      <div className="w-full space-y-4">
        <div className="flex items-center gap-3 text-xs text-neutral-600">
          <div className="h-px flex-1 bg-neutral-800" />
          <span>email login</span>
          <div className="h-px flex-1 bg-neutral-800" />
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 px-5 py-6 text-center">
          {/* Mail icon */}
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="text-cyan-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 6.75A2.25 2.25 0 0 1 5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 17.25V6.75Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m3.5 6 8.5 6.5L20.5 6"
              />
            </svg>
          </div>

          <h3 className="text-base font-semibold text-white">
            Check your email
          </h3>

          <p className="mt-2 text-sm leading-6 text-neutral-400">
            We sent a login link to
          </p>

          <p className="mt-1 break-all text-sm font-medium text-cyan-400">
            {email}
          </p>

          <p className="mt-3 text-xs leading-5 text-neutral-500">
            Open the email and click the login link to continue.
            The link will expire shortly and can only be used once.
          </p>
        </div>

        {/* Try another email */}
        <button
          type="button"
          onClick={() => {
            setSent(false)
            setEmail('')
            setError('')
          }}
          className="w-full text-sm text-neutral-500 transition hover:text-cyan-400"
        >
          Use a different email
        </button>
      </div>
    )
  }

  return (
    <div className="w-full space-y-4">
      {/* Divider */}
      <div className="flex items-center gap-3 text-xs text-neutral-600">
        <div className="h-px flex-1 bg-neutral-800" />
        <span>or continue with email</span>
        <div className="h-px flex-1 bg-neutral-800" />
      </div>

      {/* Email input */}
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm text-neutral-300"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError('')
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleLogin()
            }
          }}
          placeholder="you@example.com"
          autoComplete="email"
          className="
            w-full rounded-xl
            border border-neutral-800
            bg-neutral-950
            px-4 py-2.5
            text-sm text-white
            outline-none
            placeholder:text-neutral-600
            transition
            focus:border-cyan-500
          "
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-center text-xs text-red-400">
          {error}
        </p>
      )}

      {/* Login button */}
      <button
        type="button"
        onClick={handleLogin}
        disabled={loading || !email.trim()}
        className="
          w-full rounded-xl
          bg-cyan-500
          px-4 py-2.5
          text-sm font-semibold
          text-black
          transition
          hover:bg-cyan-400
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {loading ? 'Sending login link...' : 'Continue with Email'}
      </button>
    </div>
  )
}