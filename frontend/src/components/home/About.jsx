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
    icon: '🏥',
    title: 'Nearby care suggestions',
    desc: 'When location-based suggestions are available, MedicalAI can help you explore nearby hospitals and clinics relevant to your situation.',
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
    title: 'Built for conversation',
    desc: 'Short questions and responses keep the experience focused, simple, and easier to navigate than a traditional medical form.',
  },
]

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#0d0b10] px-6 py-28"
    >
      {/* Soft atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-24 h-64 w-64 rounded-full bg-rose-300/5 blur-[110px]" />
        <div className="absolute right-[8%] top-1/3 h-72 w-72 rounded-full bg-violet-300/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">

        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500 backdrop-blur-xl">
            <span className="text-sm">🧬</span>
            The idea behind MedicalAI
          </div>

          <h2 className="text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
            Built around a conversation,
            <span className="block bg-gradient-to-r from-rose-200 via-violet-200 to-amber-100 bg-clip-text text-transparent">
              not a giant questionnaire.
            </span>
          </h2>

          <p className="mt-6 text-sm leading-7 text-neutral-500 sm:text-base">
            MedicalAI is an independent project exploring how AI can make
            symptom conversations feel more natural. Instead of starting with
            a long medical form, you start with your own words and the
            conversation gradually becomes more structured.
          </p>
        </div>

        {/* Feature grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <div
              key={feature.title}
              className="
                group relative overflow-hidden rounded-[24px]
                border border-white/[0.07]
                bg-white/[0.025]
                p-6
                backdrop-blur-xl
                transition-all duration-500
                hover:-translate-y-1
                hover:border-rose-200/15
                hover:bg-white/[0.045]
              "
            >
              {/* Soft hover glow */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-rose-300/0 blur-[45px] transition duration-500 group-hover:bg-rose-300/10" />

              {/* Number */}
              <span className="absolute right-5 top-5 font-mono text-[10px] text-neutral-700 transition-colors group-hover:text-rose-200/30">
                0{index + 1}
              </span>

              {/* Icon */}
              <div
                className="
                  relative mb-6 flex h-12 w-12 items-center justify-center
                  rounded-[16px]
                  border border-white/[0.08]
                  bg-[#151218]
                  text-xl
                  shadow-lg
                  transition-all duration-300
                  group-hover:-rotate-2
                  group-hover:border-rose-200/15
                "
              >
                {feature.icon}
              </div>

              <h3 className="relative text-base font-semibold text-white">
                {feature.title}
              </h3>

              <p className="relative mt-2 text-sm leading-6 text-neutral-500">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mt-20 overflow-hidden rounded-[30px] border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl">

          <div className="grid gap-10 p-6 sm:p-8 md:grid-cols-[0.9fr_1.5fr] md:items-center">

            <div>
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-200/60">
                <span>♡</span>
                How it works
              </div>

              <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                One conversation.
                <span className="block text-neutral-500">
                  One step at a time.
                </span>
              </h3>

              <p className="mt-4 max-w-md text-sm leading-6 text-neutral-500">
                The goal isn't to replace a doctor. It's to make the first
                step of understanding what you're experiencing feel a little
                easier and more organized.
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
                  desc: 'Review organized information about your situation.',
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="
                    group rounded-[20px]
                    border border-white/[0.06]
                    bg-[#0d0b10]/70
                    p-5
                    transition-all duration-300
                    hover:border-rose-200/10
                  "
                >
                  <span className="font-mono text-xs text-rose-200/50">
                    {step.number}
                  </span>

                  <h4 className="mt-4 text-sm font-semibold text-white">
                    {step.title}
                  </h4>

                  <p className="mt-1.5 text-xs leading-5 text-neutral-600">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Philosophy */}
        <div className="mt-20 text-center">

          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-white/10" />
            <span className="text-sm text-rose-200/50">🧬</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-white/10" />
          </div>

          <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-700">
            Why this exists
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-600">
            MedicalAI is an evolving experiment in AI-assisted health
            conversations. Ideas are tested, improved, removed, and rebuilt
            as the project grows.
          </p>

        </div>

      </div>
    </section>
  )
}
