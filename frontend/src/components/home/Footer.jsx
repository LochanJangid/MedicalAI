import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0d0b10] px-6 py-14">
      <div className="mx-auto max-w-6xl">

        {/* Main footer */}
        <div className="grid gap-12 md:grid-cols-[1.4fr_0.7fr_1fr]">

          {/* Brand */}
          <div>

            <Link
              to="/"
              className="group inline-flex items-center gap-3"
            >
              <div
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-[14px]
                  border border-rose-200/10
                  bg-white/[0.04]
                  text-lg
                  shadow-lg shadow-rose-500/5
                  transition-all duration-300
                  group-hover:-rotate-3
                  group-hover:border-rose-200/20
                "
              >
                🧬
              </div>

              <div>
                <p className="font-semibold tracking-tight text-white">
                  MedicalAI
                </p>

                <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-neutral-700">
                  AI health experiment
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-neutral-600">
              An independent project exploring more natural ways to have
              AI-assisted conversations about health information.
            </p>

            <div className="mt-5 flex items-center gap-2 text-[10px] text-neutral-700">
              <span className="text-rose-200/50">♡</span>
              Built with curiosity, code, and a little patience.
            </div>

          </div>

          {/* Navigation */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Explore
            </p>

            <div className="mt-5 flex flex-col gap-3 text-sm">

              <Link
                to="/login"
                className="text-neutral-600 transition-colors hover:text-white"
              >
                Sign in
              </Link>

              <Link
                to="/guest"
                className="text-neutral-600 transition-colors hover:text-white"
              >
                Try MedicalAI
              </Link>

              <a
                href="#about"
                className="text-neutral-600 transition-colors hover:text-white"
              >
                About the project
              </a>

              <Link
                to="/privacy"
                className="text-neutral-600 transition-colors hover:text-white"
              >
                Privacy
              </Link>

              <Link
                to="/terms"
                className="text-neutral-600 transition-colors hover:text-white"
              >
                Terms
              </Link>

            </div>
          </div>

          {/* Creator */}
          <div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Built by
            </p>

            <h3 className="mt-5 text-base font-semibold text-white">
              Lochan Jangid
            </h3>

            <p className="mt-1 text-sm text-neutral-600">
              ML Engineer
            </p>

            <div className="mt-5 flex flex-wrap gap-2">

              <a
                href="https://github.com/LochanJangid"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  rounded-xl
                  border border-white/[0.07]
                  bg-white/[0.025]
                  px-3 py-2
                  text-xs text-neutral-500
                  transition-all duration-300
                  hover:border-rose-200/10
                  hover:bg-white/[0.05]
                  hover:text-white
                "
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/lochan-jangid/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  rounded-xl
                  border border-white/[0.07]
                  bg-white/[0.025]
                  px-3 py-2
                  text-xs text-neutral-500
                  transition-all duration-300
                  hover:border-rose-200/10
                  hover:bg-white/[0.05]
                  hover:text-white
                "
              >
                LinkedIn
              </a>

              <a
                href="https://lochan.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  rounded-xl
                  border border-white/[0.07]
                  bg-white/[0.025]
                  px-3 py-2
                  text-xs text-neutral-500
                  transition-all duration-300
                  hover:border-rose-200/10
                  hover:bg-white/[0.05]
                  hover:text-white
                "
              >
                Portfolio
              </a>

            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.06] pt-6 text-[10px] text-neutral-700 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} Lochan Jangid. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link
              to="/privacy"
              className="transition-colors hover:text-neutral-400"
            >
              Privacy Policy
            </Link>

            <span className="text-neutral-800">•</span>

            <Link
              to="/terms"
              className="transition-colors hover:text-neutral-400"
            >
              Terms of Service
            </Link>
          </div>

        </div>

        {/* Medical disclaimer */}
        <div className="mt-6 rounded-2xl border border-white/[0.04] bg-white/[0.015] px-5 py-4">
          <p className="mx-auto max-w-3xl text-center text-[10px] leading-5 text-neutral-700">
            MedicalAI provides informational assistance and does not diagnose
            medical conditions or replace professional medical advice. If you
            believe you are experiencing an emergency, contact local emergency
            services or a qualified healthcare professional.
          </p>
        </div>

        {/* Contact */}
        <div className="mt-5 text-center">
          <a
            href="mailto:lochanjangidcoder@gmail.com"
            className="
              text-[10px] text-neutral-700
              transition-colors duration-300
              hover:text-rose-200/70
            "
          >
            lochanjangidcoder@gmail.com
          </a>
        </div>

      </div>
    </footer>
  )
}