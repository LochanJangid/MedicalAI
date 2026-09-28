export default function SettingsPanel({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[75vh] overflow-y-auto rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-lg text-neutral-500 hover:bg-neutral-800 hover:text-white transition"
        >
          ×
        </button>

        <article className="px-6 py-6">
          {/* Coming Soon */}
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Coming Soon
          </p>

          <h2 className="mt-2 pr-8 text-2xl font-bold leading-tight text-white">
            Settings are still being built
          </h2>

          <p className="mt-3 text-sm leading-6 text-neutral-400">
            We're still working on the full settings experience for MedicalAI.
            Until then, there's not much to configure here.
          </p>

          <div className="my-5 h-px bg-neutral-800" />

          {/* Spider-Man */}
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-400">
            Meanwhile...
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            Let's talk about Spider-Man.
          </h3>

          <div className="mt-4 space-y-4 text-sm leading-6 text-neutral-400">
            <p>
              Tobey Maguire's Spider-Man is one of those characters that
              somehow refuses to stay in the past. After returning in
              <span className="text-neutral-200">
                {' '}Spider-Man: No Way Home
              </span>
              , the possibility of seeing his Peter Parker again has become
              one of the biggest multiverse discussions among fans.
            </p>

            <p>
              The interesting question is what an older Tobey Peter Parker
              would actually do in another major Marvel conflict. He's no
              longer the inexperienced Spider-Man from the first movie.
            </p>

            <p>
              If the multiverse becomes central to
              <span className="text-neutral-200">
                {' '}Avengers: Doomsday
              </span>
              , there is plenty of room for theories about where his universe
              could fit into the story.
            </p>
          </div>

          {/* Discussion */}
          <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
            <p className="text-sm font-medium text-white">
              🕷 Let's talk about it
            </p>

            <p className="mt-2 text-xs leading-5 text-neutral-500">
              Have a Spider-Man theory, want to discuss the Raimi trilogy,
              Tobey's return, or just argue about which Spider-Man is the
              best? Humans apparently require somewhere to have these debates.
            </p>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              {/* Email */}
              <a
                href="mailto:YOUR_EMAIL@example.com?subject=Spider-Man%20Discussion"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-2.5 text-xs font-medium text-gray-300 transition hover:border-cyan-500/50 hover:text-cyan-400"
              >
                <span>✉</span>
                Email me
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/lochan-jangid/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-2.5 text-xs font-medium text-gray-300 transition hover:border-blue-500/50 hover:text-blue-400"
              >
                <span>in</span>
                LinkedIn
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 border-t border-neutral-800 pt-4">
            <p className="text-center text-[10px] text-neutral-600">
              MedicalAI · Settings coming soon
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}