import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0d0b10]/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Brand */}
        <Link
          to="/"
          className="group flex items-center gap-3"
        >
          <div
            className="
              relative flex h-10 w-10 items-center justify-center
              rounded-[14px]
              border border-white/[0.08]
              bg-white/[0.04]
              text-lg
              shadow-lg shadow-rose-500/[0.05]
              transition-all duration-300
              group-hover:-rotate-3
              group-hover:border-rose-200/20
              group-hover:bg-white/[0.06]
            "
          >
            <span className="transition-transform duration-300 group-hover:scale-110">
              🧬
            </span>

            <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-rose-300/80 shadow-sm shadow-rose-300/50" />
          </div>

          <div>
            <div className="text-sm font-semibold tracking-tight text-white">
              MedicalAI
            </div>

            <div className="hidden text-[9px] tracking-wide text-neutral-700 sm:block">
              a gentler way to understand
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 text-xs font-medium text-neutral-500 sm:flex">

          <a
            href="#about"
            className="transition-colors duration-300 hover:text-white"
          >
            About
          </a>

          <Link
            to="/privacy"
            className="transition-colors duration-300 hover:text-white"
          >
            Privacy
          </Link>

        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">

          <Link
            to="/guest"
            className="
              hidden
              text-xs font-medium
              text-neutral-500
              transition-colors duration-300
              hover:text-rose-200
              sm:block
            "
          >
            Full guest chat
          </Link>

          <Link
            to="/login"
            className="
              group
              inline-flex items-center gap-2
              rounded-xl
              bg-[#fffaf7]
              px-4 py-2.5
              text-xs font-semibold
              text-[#171318]
              shadow-lg shadow-rose-500/[0.05]
              transition-all duration-300
              hover:-translate-y-0.5
              hover:shadow-xl hover:shadow-rose-500/[0.10]
            "
          >
            Start talking

            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </Link>

        </div>

      </div>
    </header>
  )
}
