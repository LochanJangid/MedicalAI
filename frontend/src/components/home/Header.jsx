import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-neutral-950/70 border-b border-neutral-900">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white font-semibold">
          <span className="text-xl">🧬</span>
          <span>MedicalAI</span>
        </Link>

        <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-400">
          <a href="#about" className="hover:text-white transition-colors">About</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/guest" className="text-sm text-gray-300 hover:text-white transition-colors">
            Try now
          </Link>
          <Link
            to="/login"
            className="text-sm px-4 py-2 rounded-xl bg-white text-neutral-900 font-medium hover:bg-gray-100 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </header>
  )
}