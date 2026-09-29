import React from 'react'
import { Link } from 'react-router-dom'

export default function Terms() {
  return (
    <main className="min-h-screen bg-[#0d0b10] text-neutral-200">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-280px] h-[650px] w-[950px] -translate-x-1/2 rounded-full bg-rose-400/[0.07] blur-3xl" />
        <div className="absolute bottom-[-280px] left-[-160px] h-[550px] w-[550px] rounded-full bg-violet-500/[0.07] blur-3xl" />
        <div className="absolute right-[-180px] top-1/3 h-[450px] w-[450px] rounded-full bg-rose-300/[0.035] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
        {/* Header */}
        <header className="mb-14">
          <div className="mb-8 flex items-center justify-between gap-4">
            <Link
              to="/"
              className="group flex items-center gap-3"
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-lg shadow-lg shadow-rose-500/[0.04] transition-all duration-300 group-hover:-rotate-2 group-hover:border-rose-200/20">
                🧬
                <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-rose-300/80" />
              </div>

              <div>
                <div className="text-sm font-semibold tracking-tight text-white">
                  MedicalAI
                </div>
                <div className="text-[9px] text-neutral-600">
                  a gentler way to understand
                </div>
              </div>
            </Link>

            <Link
              to="/"
              className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-2.5 text-xs font-medium text-neutral-400 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-white"
            >
              ← Home
            </Link>
          </div>

          <div className="rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-9">
            <div className="mb-5 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-300/80" />
              <span className="text-[10px] uppercase tracking-[0.22em] text-neutral-600">
                MedicalAI / Legal
              </span>
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Terms of Service
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base">
              The terms and conditions governing your use of MedicalAI.
            </p>

            <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-neutral-600">
              <span className="text-violet-300/70">♡</span>
              Last updated: September 28, 2026
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="grid gap-10 lg:grid-cols-[180px_1fr]">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-8">
              <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-neutral-600">
                Contents
              </p>

              <nav className="space-y-2 border-l border-white/[0.07] pl-4 text-xs">
                {[
                  ['service', 'The Service'],
                  ['medical', 'Medical Disclaimer'],
                  ['accounts', 'Accounts'],
                  ['acceptable', 'Acceptable Use'],
                  ['content', 'User Content'],
                  ['ai', 'AI-Generated Content'],
                  ['thirdparty', 'Third-Party Services'],
                  ['availability', 'Availability'],
                  ['termination', 'Termination'],
                  ['liability', 'Liability'],
                  ['changes', 'Changes'],
                  ['contact', 'Contact'],
                ].map(([id, label]) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="block text-neutral-600 transition hover:text-violet-300"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Document */}
          <article className="max-w-3xl space-y-14">
            {/* Intro */}
            <section>
              <p className="text-lg leading-8 text-neutral-300">
                Welcome to MedicalAI. These Terms of Service ("Terms") govern
                your access to and use of the MedicalAI website and services.
              </p>

              <p className="mt-5 leading-7 text-neutral-500">
                By accessing or using MedicalAI, you agree to these Terms. If
                you do not agree with these Terms, you should not use the
                service.
              </p>
            </section>

            {/* 01 */}
            <section id="service">
              <SectionHeader number="01" title="The Service" />

              <p className="leading-7 text-neutral-500">
                MedicalAI is an AI-powered health information assistant
                designed to help users organize and understand information
                about symptoms.
              </p>

              <p className="mt-5 leading-7 text-neutral-500">
                MedicalAI may ask questions about symptoms such as their
                duration, severity, location, onset, and related symptoms in
                order to provide informational responses.
              </p>

              <Notice>
                MedicalAI is an informational technology service and is not a
                healthcare provider.
              </Notice>
            </section>

            {/* 02 */}
            <section id="medical">
              <SectionHeader number="02" title="Medical Disclaimer" />

              <div className="rounded-2xl border border-amber-300/[0.12] bg-amber-300/[0.035] p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-300/[0.12] bg-amber-300/[0.05]">
                    <span className="text-xs text-amber-300">!</span>
                  </div>

                  <p className="font-medium text-amber-200">
                    MedicalAI does not provide medical diagnosis or treatment.
                  </p>
                </div>

                <p className="text-sm leading-7 text-neutral-500">
                  Information provided by MedicalAI is generated using
                  artificial intelligence and is intended for informational
                  purposes only. It should not be considered professional
                  medical advice, diagnosis, or treatment.
                </p>

                <p className="mt-4 text-sm leading-7 text-neutral-500">
                  You should consult a qualified healthcare professional for
                  medical advice, diagnosis, or treatment decisions.
                </p>

                <p className="mt-4 text-sm leading-7 text-neutral-500">
                  If you believe you are experiencing a medical emergency,
                  contact your local emergency service or seek immediate
                  medical attention.
                </p>
              </div>
            </section>

            {/* 03 */}
            <section id="accounts">
              <SectionHeader number="03" title="Accounts" />

              <p className="leading-7 text-neutral-500">
                Some features of MedicalAI may require you to create an
                account.
              </p>

              <p className="mt-5 leading-7 text-neutral-500">
                You are responsible for maintaining the security of your
                account credentials and for activity that occurs through your
                account.
              </p>

              <p className="mt-5 leading-7 text-neutral-500">
                You agree to provide accurate information when creating an
                account and to update information when necessary.
              </p>
            </section>

            {/* 04 */}
            <section id="acceptable">
              <SectionHeader number="04" title="Acceptable Use" />

              <p className="leading-7 text-neutral-500">
                You agree to use MedicalAI only for lawful purposes and in
                accordance with these Terms.
              </p>

              <p className="mt-5 leading-7 text-neutral-500">
                You must not use MedicalAI to:
              </p>

              <BulletList
                items={[
                  'Break or violate applicable laws or regulations',
                  'Attempt to gain unauthorized access to the service',
                  'Interfere with or disrupt the operation of MedicalAI',
                  'Submit malicious code or other harmful content',
                  'Abuse automated systems or attempt to overload the service',
                  'Impersonate another person or entity',
                  'Use the service to intentionally mislead or harm others',
                ]}
              />
            </section>

            {/* 05 */}
            <section id="content">
              <SectionHeader number="05" title="User Content" />

              <p className="leading-7 text-neutral-500">
                You may provide information, including symptom descriptions,
                through MedicalAI.
              </p>

              <p className="mt-5 leading-7 text-neutral-500">
                You are responsible for the information you choose to submit
                to the service.
              </p>

              <p className="mt-5 leading-7 text-neutral-500">
                Do not submit information that you do not have the right to
                provide or that you do not want processed by an online
                service.
              </p>
            </section>

            {/* 06 */}
            <section id="ai">
              <SectionHeader number="06" title="AI-Generated Content" />

              <p className="leading-7 text-neutral-500">
                MedicalAI uses artificial intelligence to generate responses.
                AI-generated responses may contain errors, incomplete
                information, or information that is not appropriate for your
                particular circumstances.
              </p>

              <p className="mt-5 leading-7 text-neutral-500">
                You should independently verify important information and
                consult qualified professionals when making health-related
                decisions.
              </p>

              <div className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-4 backdrop-blur-xl">
                <span className="text-[10px] uppercase tracking-[0.14em] text-violet-300/60">
                  AI system
                </span>

                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  AI output is generated probabilistically and should not be
                  treated as guaranteed factual or medically accurate
                  information.
                </p>
              </div>
            </section>

            {/* 07 */}
            <section id="thirdparty">
              <SectionHeader number="07" title="Third-Party Services" />

              <p className="leading-7 text-neutral-500">
                MedicalAI may use third-party services for functionality such
                as authentication, hosting, databases, AI processing,
                analytics, monitoring, and other infrastructure.
              </p>

              <p className="mt-5 leading-7 text-neutral-500">
                Your use of certain third-party services may also be subject
                to the terms and policies of those providers.
              </p>
            </section>

            {/* 08 */}
            <section id="availability">
              <SectionHeader number="08" title="Service Availability" />

              <p className="leading-7 text-neutral-500">
                We may modify, suspend, or discontinue portions of MedicalAI
                at any time.
              </p>

              <p className="mt-5 leading-7 text-neutral-500">
                We do not guarantee that the service will always be available,
                uninterrupted, secure, or error-free.
              </p>
            </section>

            {/* 09 */}
            <section id="termination">
              <SectionHeader number="09" title="Termination" />

              <p className="leading-7 text-neutral-500">
                You may stop using MedicalAI at any time.
              </p>

              <p className="mt-5 leading-7 text-neutral-500">
                We may suspend or terminate access to MedicalAI if we
                reasonably believe that you have violated these Terms, abused
                the service, or created a security or legal risk.
              </p>

              <p className="mt-5 leading-7 text-neutral-500">
                Provisions that by their nature should survive termination,
                including disclaimers and limitations of liability, will
                continue to apply.
              </p>
            </section>

            {/* 10 */}
            <section id="liability">
              <SectionHeader number="10" title="Disclaimer & Liability" />

              <p className="leading-7 text-neutral-500">
                MedicalAI is provided on an "as is" and "as available" basis
                to the extent permitted by applicable law.
              </p>

              <p className="mt-5 leading-7 text-neutral-500">
                We do not guarantee the accuracy, completeness, reliability,
                or suitability of information generated by the service.
              </p>

              <p className="mt-5 leading-7 text-neutral-500">
                To the maximum extent permitted by applicable law, MedicalAI
                and its operators will not be responsible for losses or
                damages resulting from reliance on AI-generated information
                or from the use or inability to use the service.
              </p>

              <Notice>
                Nothing in these Terms is intended to exclude or limit any
                liability that cannot legally be excluded or limited.
              </Notice>
            </section>

            {/* 11 */}
            <section id="changes">
              <SectionHeader number="11" title="Changes to These Terms" />

              <p className="leading-7 text-neutral-500">
                We may update these Terms from time to time.
              </p>

              <p className="mt-5 leading-7 text-neutral-500">
                When material changes are made, we will update the "Last
                updated" date at the top of this page.
              </p>

              <p className="mt-5 leading-7 text-neutral-500">
                Your continued use of MedicalAI after updated Terms become
                effective constitutes acceptance of the updated Terms.
              </p>
            </section>

            {/* 12 */}
            <section id="contact">
              <SectionHeader number="12" title="Contact" />

              <p className="leading-7 text-neutral-500">
                If you have questions about these Terms or MedicalAI, you can
                contact us at:
              </p>

              <div className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 backdrop-blur-xl">
                <div className="text-[10px] uppercase tracking-[0.16em] text-neutral-600">
                  Contact
                </div>

                <a
                  href="mailto:lochanjangidcoder@gmail.com"
                  className="mt-2 block text-sm text-violet-300 transition hover:text-violet-200"
                >
                  lochanjangidcoder@gmail.com
                </a>

                <div className="mt-5 h-px bg-white/[0.06]" />

                <div className="mt-5 text-sm text-neutral-500">
                  MedicalAI
                </div>
              </div>
            </section>

            {/* Final notice */}
            <section className="border-t border-white/[0.07] pt-10">
              <div className="rounded-[24px] border border-violet-200/[0.08] bg-violet-200/[0.025] p-6 sm:p-8">
                <div className="flex gap-4">
                  <span className="mt-0.5 text-lg text-violet-300/80">
                    ♡
                  </span>

                  <div>
                    <h2 className="font-medium text-white">
                      Use MedicalAI responsibly
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-neutral-500">
                      MedicalAI is designed to assist with health information,
                      not replace qualified healthcare professionals. Always
                      seek professional medical advice when making important
                      healthcare decisions.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </article>
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-white/[0.06] pt-8">
          <div className="flex flex-col gap-3 text-[10px] uppercase tracking-[0.14em] text-neutral-700 sm:flex-row sm:items-center sm:justify-between">
            <span>MedicalAI / Terms</span>
            <span>© 2026 MedicalAI</span>
          </div>
        </footer>
      </div>
    </main>
  )
}

/* -------------------------------- */
/* Reusable Components               */
/* -------------------------------- */

function SectionHeader({ number, title }) {
  return (
    <div className="mb-6 flex items-baseline gap-4">
      <span className="text-[10px] tracking-widest text-violet-300/50">
        {number}
      </span>

      <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
        {title}
      </h2>
    </div>
  )
}

function BulletList({ items }) {
  return (
    <ul className="mt-5 space-y-3 text-sm leading-6 text-neutral-500">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-300/60" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function Notice({ children }) {
  return (
    <div className="mt-6 rounded-2xl border border-violet-200/[0.07] bg-violet-200/[0.025] px-5 py-4 text-sm leading-6 text-neutral-500">
      <span className="mr-2 text-[10px] uppercase tracking-wider text-violet-300/70">
        Note
      </span>

      {children}
    </div>
  )
}