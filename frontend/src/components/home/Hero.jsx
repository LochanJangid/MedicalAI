import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BioLabBackground from '../common/BioLabBackground'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const SEED_MESSAGES = [
  { role: 'user', content: "I've had a headache since this morning and I feel a little nauseous." },
  { role: 'assistant', content: "I'm sorry you're feeling that way. Let's take it one step at a time. 💛" },
  { role: 'assistant', content: 'How strong is the headache right now, from 1 to 10?' },
]

export default function Hero() {
  const [messages, setMessages] = useState(SEED_MESSAGES)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, sending])

  const handleSend = async (e) => {
    e.preventDefault()
    const content = input.trim()
    if (!content || sending) return

    const next = [...messages, { role: 'user', content }]
    setMessages(next)
    setInput('')
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
      console.error('Hero preview chat failed:', err)
      setMessages((prev) => [...prev, { role: 'assistant', content: "Something went wrong — try the full chat instead." }])
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="relative min-h-[760px] overflow-hidden bg-[#0d0b10] px-6 py-24 sm:py-32">
      <BioLabBackground />

      {/* Soft atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[12%] top-[18%] h-56 w-56 rounded-full bg-rose-400/10 blur-[110px]" />
        <div className="absolute right-[10%] top-[30%] h-72 w-72 rounded-full bg-violet-400/10 blur-[130px]" />
        <div className="absolute bottom-[8%] left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-300/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Tiny introduction */}
        <div className="mb-10 flex justify-center">
          <div className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs text-neutral-400 shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-500 hover:border-rose-300/20 hover:bg-white/[0.055]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-rose-300/60" />
              <span className="relative h-2 w-2 rounded-full bg-rose-300" />
            </span>

            A gentler way to talk about how you feel
          </div>
        </div>

        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">

          {/* Left */}
          <div className="text-center lg:text-left">

            {/* Brand mark */}
            <div className="mb-7 flex justify-center lg:justify-start">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-[20px] border border-rose-200/10 bg-white/[0.045] shadow-2xl shadow-rose-500/10 backdrop-blur-xl">
                <span className="text-2xl">🧬</span>

                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-rose-300 shadow-lg shadow-rose-300/40" />
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-black tracking-[-0.04em] text-white sm:text-6xl lg:text-[76px] lg:leading-[0.98]">
              Take a breath.
              <span className="mt-2 block text-transparent bg-gradient-to-r from-rose-200 via-violet-200 to-amber-100 bg-clip-text">
                Tell me what's going on.
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-neutral-400 sm:text-lg lg:mx-0">
              MedicalAI gives you a calm place to describe what you're
              experiencing, answer a few thoughtful questions, and make
              better sense of your symptoms.
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">

              <Link
                to="/login"
                className="
                  group relative inline-flex items-center justify-center
                  overflow-hidden rounded-2xl
                  bg-[#fffaf7]
                  px-7 py-4
                  text-sm font-semibold text-[#171318]
                  shadow-[0_12px_40px_rgba(244,190,190,0.12)]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_18px_50px_rgba(244,190,190,0.18)]
                "
              >
                <span className="relative z-10 flex items-center gap-2">
                  Let's talk
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>

              <Link
                to="/guest"
                className="
                  group inline-flex items-center justify-center
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.035]
                  px-7 py-4
                  text-sm font-medium text-neutral-300
                  backdrop-blur-xl
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-rose-200/20
                  hover:bg-white/[0.06]
                  hover:text-white
                "
              >
                Try without an account
                <span className="ml-2 text-xs text-neutral-600 transition-colors group-hover:text-rose-300">
                  3 free messages
                </span>
              </Link>

            </div>

            {/* Safety note */}
            <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-neutral-600 lg:justify-start">
              <span className="text-rose-300/60">♡</span>
              <span>AI-assisted health information · Not a diagnosis</span>
            </div>

          </div>

          {/* Right: conversational preview — a real, working chat */}
          <div className="relative mx-auto w-full max-w-md">

            {/* Floating tiny note */}
            <div className="absolute -left-5 top-12 z-20 hidden -rotate-3 rounded-2xl border border-white/10 bg-[#17131a]/90 px-4 py-3 text-xs text-neutral-400 shadow-xl backdrop-blur-xl sm:block">
              no pressure 🌷
            </div>

            {/* Floating heart */}
            <div className="absolute -right-4 top-20 z-20 flex h-10 w-10 rotate-6 items-center justify-center rounded-2xl border border-rose-200/10 bg-rose-200/[0.06] text-lg shadow-xl backdrop-blur-xl">
              ♡
            </div>

            {/* Main card */}
            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#151218]/85 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl">

              {/* Card glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-rose-300/10 blur-[70px]" />

              {/* Header */}
              <div className="relative flex items-center justify-between border-b border-white/[0.07] pb-4">

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-gradient-to-br from-rose-200/20 to-violet-200/10 text-lg">
                    🧬
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-white">
                      MedicalAI
                    </div>
                    <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-neutral-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                      here to listen
                    </div>
                  </div>
                </div>

                <div className="text-xs text-neutral-700">
                  today
                </div>

              </div>

              {/* Conversation — scrollable once it overflows, themed scrollbar (no white default) */}
              <div
                ref={scrollRef}
                className="relative max-h-72 space-y-4 overflow-y-auto py-6 pr-1"
              >
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={
                      m.role === 'user'
                        ? 'ml-auto max-w-[82%] rounded-[20px] rounded-br-md bg-white/[0.07] px-4 py-3 text-sm leading-6 text-neutral-300'
                        : i < 2
                        ? 'max-w-[88%] rounded-[20px] rounded-bl-md bg-gradient-to-br from-rose-200/[0.10] to-violet-200/[0.06] px-4 py-3 text-sm leading-6 text-neutral-300'
                        : 'max-w-[88%] rounded-[20px] rounded-bl-md border border-white/[0.06] bg-white/[0.025] px-4 py-3 text-sm leading-6 text-neutral-400'
                    }
                  >
                    {m.content}
                  </div>
                ))}

                {sending && (
                  <div className="flex items-center gap-1.5 px-2 pt-1">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-200/50" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-200/50 [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-100/40 [animation-delay:300ms]" />
                  </div>
                )}
              </div>

              {/* Input — now functional */}
              <form onSubmit={handleSend} className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-black/20 px-4 py-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tell me how you're feeling..."
                  disabled={sending}
                  className="flex-1 bg-transparent text-xs text-neutral-200 placeholder-neutral-700 outline-none disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={sending || !input.trim()}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-xs text-neutral-500 transition-colors hover:bg-white/[0.14] hover:text-neutral-300 disabled:opacity-50"
                >
                  ↑
                </button>
              </form>

            </div>

            {/* Bottom floating card */}
            <div className="absolute -bottom-7 -left-6 hidden rounded-2xl border border-white/10 bg-[#17131a]/90 px-4 py-3 shadow-2xl backdrop-blur-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-200/10 text-sm">
                  ✦
                </div>

                <div>
                  <div className="text-[11px] font-medium text-neutral-300">
                    One question at a time
                  </div>
                  <div className="mt-0.5 text-[10px] text-neutral-600">
                    No overwhelming forms
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom philosophy */}
        <div className="mx-auto mt-24 max-w-3xl text-center">

          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-white/10" />
            <span className="text-xs text-rose-200/50">🕷️</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-white/10" />
          </div>

          <p className="text-sm leading-6 text-neutral-600">
            With Great Powers.
            <span className="text-neutral-400">
              {' '}Comes Great Responsibilities.
            </span>
          </p>

        </div>

      </div>
    </section>
  )
}