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
      <div className="h-screen flex items-center justify-center bg-neutral-950 text-gray-400">
        Loading...
      </div>
    )
  }

  if (user) return <Navigate to="/chat" replace />

  return (
    <div className="relative h-screen w-full overflow-hidden bg-neutral-950 flex items-center justify-center">
      <BioLabBackground />

      {/* Back to Home */}
      <Link
        to="/"
        className="
          absolute top-5 right-6 z-20
          flex items-center gap-2
          rounded-lg
          border border-neutral-800
          bg-neutral-900/60
          px-4 py-2
          text-sm font-medium text-gray-300
          backdrop-blur
          transition-colors
          hover:border-neutral-700
          hover:bg-neutral-800
          hover:text-white
        "
      >
        <span>←</span>
        Home
      </Link>

      <div className="relative z-10 w-full max-w-sm px-6 text-center">
        <div className="text-5xl mb-4">🧬</div>

        <h1 className="text-3xl font-bold text-white tracking-tight mb-1">
          MedicalAI
        </h1>

        <p className="text-sm text-cyan-300/80 mb-10 tracking-wide">
          Your AI symptom-analysis lab
        </p>

        <div className="flex flex-col gap-3">
          <GoogleLoginButton />
          <GithubLoginButton />

          <Link
            to="/guest"
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900/60 backdrop-blur px-4 py-2.5 text-sm font-medium text-gray-200 hover:bg-neutral-800 transition-colors"
          >
            Try now
          </Link>
        </div>

        <p className="text-xs text-gray-500 mt-4 leading-relaxed">
          "Try now" gives you 3 free messages — nothing is saved.
          <br />
          Sign in with Google to save your conversations and chat without limits.
        </p>

        <EmailLoginForm />
      </div>
    </div>
  )
}