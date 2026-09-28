const FEATURES = [
  {
    icon: '🩺',
    title: 'Symptom-gathering chat',
    desc: 'Describe how you feel and MedicalAI asks focused follow-up questions about onset, duration, severity, location, and related symptoms.',
  },
  {
    icon: '🧠',
    title: 'AI-guided conversations',
    desc: 'Instead of throwing a huge questionnaire at you, the conversation adapts to the information you provide.',
  },
  {
    icon: '💬',
    title: 'Natural conversation',
    desc: 'Talk about your symptoms in normal language. You do not need to know medical terminology to start a conversation.',
  },
  {
    icon: '🔐',
    title: 'Authentication & private chats',
    desc: 'Sign in with Google, GitHub, or email to access your account and keep your conversations associated with your profile.',
  },
  {
    icon: '🕶️',
    title: 'Guest mode',
    desc: 'Want to explore first? Try MedicalAI without creating an account and get three free messages.',
  },
  {
    icon: '⚡',
    title: 'Built for quick interaction',
    desc: 'The interface is designed around short questions and responses so you can focus on the conversation instead of navigating a complicated form.',
  },
]

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-neutral-900 bg-neutral-950 px-6 py-28"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[100px]" />

      <div className="relative mx-auto max-w-5xl">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-400">
            <span>🧬</span>
            The experiment
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built around the conversation,
            <span className="text-cyan-400"> not the questionnaire.</span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-neutral-400 sm:text-base">
            MedicalAI is a personal project exploring how an AI assistant can
            make symptom conversations more natural. Instead of asking you to
            fill out a giant medical form, it starts with what you tell it and
            asks focused questions to understand the situation better.
          </p>
        </div>

        {/* Feature grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <div
              key={feature.title}
              className="
                group relative overflow-hidden rounded-2xl
                border border-neutral-800
                bg-neutral-900/40
                p-6
                transition-all duration-300
                hover:-translate-y-1
                hover:border-cyan-500/30
                hover:bg-neutral-900/70
              "
            >
              {/* Number */}
              <span className="absolute right-5 top-5 text-[10px] font-mono text-neutral-700">
                0{index + 1}
              </span>

              {/* Icon */}
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-950 text-xl transition group-hover:border-cyan-500/20">
                {feature.icon}
              </div>

              <h3 className="text-base font-semibold text-white">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-neutral-500">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mt-20 rounded-3xl border border-neutral-800 bg-neutral-900/30 p-6 sm:p-8">
          <div className="grid gap-8 md:grid-cols-[1fr_1.5fr] md:items-center">

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
                How it works
              </p>

              <h3 className="mt-3 text-2xl font-bold text-white">
                From a symptom to a conversation.
              </h3>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                The goal isn't to replace a doctor. It's to make the first
                step of understanding your symptoms easier and more structured.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  number: '01',
                  title: 'Describe',
                  desc: 'Tell MedicalAI what you are experiencing.',
                },
                {
                  number: '02',
                  title: 'Clarify',
                  desc: 'Answer short follow-up questions.',
                },
                {
                  number: '03',
                  title: 'Understand',
                  desc: 'Get organized information about your situation.',
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4"
                >
                  <span className="font-mono text-xs text-cyan-500">
                    {step.number}
                  </span>

                  <h4 className="mt-3 text-sm font-semibold text-white">
                    {step.title}
                  </h4>

                  <p className="mt-1 text-xs leading-5 text-neutral-600">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Project philosophy */}
        <div className="mt-16 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
            Why this exists
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-500">
            MedicalAI is being built as an open-ended experiment in AI-assisted
            health conversations. The project is evolving continuously, with
            new ideas being tested, removed, and rebuilt along the way.
          </p>
        </div>

      </div>
    </section>
  )
}