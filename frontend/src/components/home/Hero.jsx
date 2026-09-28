import { Link } from 'react-router-dom'
import BioLabBackground from '../common/BioLabBackground'

export default function Hero() {
  return (
    <section className="relative min-h-[720px] overflow-hidden bg-neutral-950 px-6 py-24 sm:py-32">
      <BioLabBackground />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">

        {/* Status pill */}
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3.5 py-1.5 text-xs font-medium text-cyan-300 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
          </span>

          AI symptom analysis lab
        </div>

        {/* Logo */}
        <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-neutral-900/70 text-4xl shadow-2xl shadow-cyan-500/10 backdrop-blur">
          🧬
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
          Understand what
          <span className="block bg-gradient-to-r from-cyan-300 via-white to-cyan-400 bg-clip-text text-transparent">
            your symptoms mean.
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-neutral-400 sm:text-lg">
          Describe how you're feeling. MedicalAI asks focused follow-up
          questions, organizes your symptoms, and helps you understand what
          to consider next.
        </p>

        {/* Disclaimer */}
        <div className="mx-auto mt-5 flex max-w-xl items-center justify-center gap-2 text-xs text-neutral-600">
          <span>●</span>
          <span>
            Experimental AI assistance · Not a medical diagnosis
          </span>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/login"
            className="
              group relative w-full overflow-hidden rounded-xl
              bg-white px-7 py-3.5
              text-sm font-semibold text-neutral-950
              shadow-xl shadow-cyan-500/10
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-cyan-50
              sm:w-auto
            "
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Start exploring
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>

          <Link
            to="/guest"
            className="
              group w-full rounded-xl
              border border-neutral-800
              bg-neutral-900/70
              px-7 py-3.5
              text-sm font-medium text-neutral-300
              backdrop-blur
              transition-all duration-300
              hover:-translate-y-0.5
              hover:border-cyan-500/30
              hover:bg-neutral-800
              hover:text-white
              sm:w-auto
            "
          >
            Try without an account
            <span className="ml-2 text-neutral-500 group-hover:text-cyan-400">
              3 free messages
            </span>
          </Link>
        </div>

        {/* Mini feature row */}
        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 divide-x divide-neutral-800 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 py-4 backdrop-blur">
          <div className="px-3">
            <div className="text-sm font-semibold text-white">
              Ask
            </div>
            <div className="mt-1 text-[11px] text-neutral-500">
              Focused questions
            </div>
          </div>

          <div className="px-3">
            <div className="text-sm font-semibold text-white">
              Analyze
            </div>
            <div className="mt-1 text-[11px] text-neutral-500">
              Organize symptoms
            </div>
          </div>

          <div className="px-3">
            <div className="text-sm font-semibold text-white">
              Understand
            </div>
            <div className="mt-1 text-[11px] text-neutral-500">
              Explore next steps
            </div>
          </div>
        </div>

        {/* Bottom micro text */}
        <p className="mt-6 text-[11px] tracking-wide text-neutral-700">
          Built as an experimental project exploring AI-assisted health
          conversations.
        </p>
      </div>
    </section>
  )
}