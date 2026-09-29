import { Link } from 'react-router-dom'
import GuestChatWindow from '../components/chat/GuestChatWindow'

export default function GuestChat() {
  return (
    <div className="relative h-screen overflow-hidden bg-[#0d0b10] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-300px] h-[650px] w-[950px] -translate-x-1/2 rounded-full bg-rose-400/[0.06] blur-3xl" />

        <div className="absolute bottom-[-280px] left-[-160px] h-[520px] w-[520px] rounded-full bg-violet-500/[0.06] blur-3xl" />

        <div className="absolute right-[-180px] top-1/3 h-[400px] w-[400px] rounded-full bg-rose-300/[0.035] blur-3xl" />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <header className="z-40 shrink-0 border-b border-white/[0.06] bg-[#0d0b10]/90 backdrop-blur-2xl">
          <div className="flex items-center justify-between px-4 py-3.5 sm:px-6">
            <Link
              to="/"
              className="group flex items-center gap-3"
            >
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-lg transition-all duration-300 group-hover:-rotate-2 group-hover:border-rose-200/20">
                🧬

                <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-rose-300/80" />
              </div>

              <div>
                <div className="text-sm font-semibold tracking-tight text-white">
                  MedicalAI
                </div>

                <div className="hidden text-[9px] text-neutral-600 sm:block">
                  a gentler way to understand
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-2 text-xs font-medium text-neutral-400 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/login"
                className="rounded-xl bg-[#fffaf7] px-3.5 py-2 text-xs font-semibold text-[#171318] shadow-lg shadow-rose-500/[0.06] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-rose-500/[0.10]"
              >
                Sign in
              </Link>
            </div>
          </div>
        </header>

        <main className="min-h-0 flex-1">
          <GuestChatWindow />
        </main>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-50 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/[0.06] bg-[#0d0b10]/80 px-4 py-2 text-[9px] text-neutral-600 backdrop-blur-xl sm:flex">
          <span className="text-rose-300/60">♡</span>
          AI-assisted health information · Not a diagnosis
        </div>
      </div>
    </div>
  )
}