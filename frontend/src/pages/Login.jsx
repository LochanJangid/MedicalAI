import { Navigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import GoogleLoginButton from '../components/auth/GoogleLoginButton'
import GithubLoginButton from '../components/auth/GithubLoginButton'
import EmailLoginForm from '../components/auth/EmailLoginForm'
import BioLabBackground from '../components/common/BioLabBackground'

export default function Login() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="relative flex h-screen items-center justify-center overflow-hidden bg-[#0d0b10] text-neutral-400">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-[-220px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-rose-400/[0.07] blur-3xl" />
          <div className="absolute bottom-[-180px] right-[-120px] h-[400px] w-[400px] rounded-full bg-violet-500/[0.06] blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-2xl">
            🧬
          </div>
          <span className="text-sm text-neutral-500">Loading...</span>
        </div>
      </div>
    )
  }

  if (user) return <Navigate to="/chat" replace />

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0d0b10] px-4 py-10">
      {/* Keep existing background component, but soften it behind the new visual layer */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <BioLabBackground />
      </div>

      {/* Soft MedicalAI atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-260px] h-[620px] w-[900px] -translate-x-1/2 rounded-full bg-rose-400/[0.08] blur-3xl" />
        <div className="absolute bottom-[-280px] left-[-120px] h-[550px] w-[550px] rounded-full bg-violet-500/[0.07] blur-3xl" />
        <div className="absolute right-[-160px] top-1/3 h-[420px] w-[420px] rounded-full bg-rose-300/[0.035] blur-3xl" />
      </div>

      {/* Back to Home */}
      <Link
        to="/"
        className="
          absolute right-5 top-5 z-20
          inline-flex items-center gap-2
          rounded-xl
          border border-white/[0.08]
          bg-white/[0.035]
          px-4 py-2.5
          text-xs font-medium text-neutral-400
          backdrop-blur-xl
          transition-all duration-300
          hover:-translate-y-0.5
          hover:border-rose-200/20
          hover:bg-white/[0.06]
          hover:text-white
        "
      >
        <span className="text-sm">←</span>
        Home
      </Link>

      <div className="relative z-10 w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[22px] border border-white/[0.09] bg-white/[0.045] text-3xl shadow-2xl shadow-rose-500/[0.06]">
            🧬
          </div>

          <div className="flex items-center justify-center gap-2">
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              MedicalAI
            </h1>
            <span className="text-rose-300/80">♡</span>
          </div>

          <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-neutral-500">
            A calmer way to talk about what you’re experiencing.
          </p>
        </div>

        {/* Main card */}
        <div className="rounded-[28px] border border-white/[0.08] bg-white/[0.035] p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-7">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">
              Continue your conversation
            </h2>

            <p className="mt-1.5 text-xs leading-5 text-neutral-500">
              Sign in to keep your conversations private and available across
              sessions.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <GoogleLoginButton />
            <GithubLoginButton />

            <Link
              to="/guest"
              className="
                group flex w-full items-center justify-center gap-2
                rounded-xl
                border border-white/[0.08]
                bg-white/[0.035]
                px-4 py-3
                text-sm font-medium text-neutral-200
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-rose-200/20
                hover:bg-white/[0.06]
              "
            >
              Try without an account
              <span className="text-rose-300 transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-600">
              or
            </span>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>

          <EmailLoginForm />

          <div className="mt-5 rounded-2xl border border-rose-200/[0.07] bg-rose-200/[0.025] px-4 py-3.5">
            <div className="flex gap-3">
              <span className="mt-0.5 text-sm text-rose-300/80">♡</span>

              <p className="text-[11px] leading-5 text-neutral-500">
                Guest mode includes 3 free messages and does not save your
                conversation.
              </p>
            </div>
          </div>
        </div>

        {/* Safety */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-neutral-600">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-300/60" />
          AI-assisted health information · Not a diagnosis
        </div>
      </div>
    </div>
  )
}