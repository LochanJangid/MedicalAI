import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-neutral-900 bg-neutral-950 px-6 py-12">
      <div className="mx-auto max-w-5xl">

        {/* Main footer */}
        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/5 text-lg">
                🧬
              </span>

              <div>
                <p className="font-semibold text-white">
                  MedicalAI
                </p>
                <p className="text-[10px] uppercase tracking-widest text-neutral-600">
                  AI health experiment
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-xs text-sm leading-6 text-neutral-500">
              An independent project exploring AI-assisted symptom
              conversations and more natural ways to understand health
              information.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Explore
            </p>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link
                to="/login"
                className="text-neutral-500 transition hover:text-white"
              >
                Sign in
              </Link>

              <Link
                to="/guest"
                className="text-neutral-500 transition hover:text-white"
              >
                Try MedicalAI
              </Link>

              <a
                href="#about"
                className="text-neutral-500 transition hover:text-white"
              >
                About the project
              </a>
            </div>
          </div>

          {/* Creator */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Built by
            </p>

            <h3 className="mt-4 text-base font-semibold text-white">
              Lochan Jangid
            </h3>

            <p className="mt-1 text-sm text-neutral-500">
              ML Engineer
            </p>

            <div className="mt-4 flex flex-wrap gap-2">

              {/* GitHub */}
              <a
                href="https://github.com/LochanJangid"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-xs text-neutral-400 transition hover:border-neutral-700 hover:bg-neutral-800 hover:text-white"
              >
                GitHub
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/lochan-jangid/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-xs text-neutral-400 transition hover:border-neutral-700 hover:bg-neutral-800 hover:text-white"
              >
                LinkedIn
              </a>

              {/* Email */}
              <a
                href="https://lochan.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-xs text-neutral-400 transition hover:border-neutral-700 hover:bg-neutral-800 hover:text-white"
              >
                Portfolio
              </a>

            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-4 border-t border-neutral-900 pt-6 text-xs text-neutral-600 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} Lochan Jangid. All rights reserved.
          </p>

          <p className="text-center sm:text-right">
            MedicalAI is an independent experiment.
          </p>

        </div>

        {/* Disclaimer */}
        <div className="mt-5 text-center">
          <p className="mx-auto max-w-2xl text-[10px] leading-5 text-neutral-700">
            MedicalAI provides informational assistance and does not diagnose
            medical conditions or replace professional medical advice. If you
            believe you are experiencing an emergency, contact local emergency
            services or a qualified healthcare professional.
          </p>
        </div>

      </div>
    </footer>
  )
}