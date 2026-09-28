import React from "react";

export default function Privacy() {
  return (
    <main className="min-h-screen bg-[#05070a] text-zinc-200">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/[0.04] blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[500px] rounded-full bg-blue-500/[0.03] blur-3xl" />
      </div>

      {/* Lab grid */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.025] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:py-24">

        {/* Header */}
        <header className="mb-16 border-b border-zinc-800/80 pb-10">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 text-cyan-400"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M9 3v6.5L4.5 17A3 3 0 0 0 7.1 21h9.8a3 3 0 0 0 2.6-4L15 9.5V3" />
                <path d="M8 3h8" />
                <path d="M7 14h10" />
              </svg>
            </div>

            <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400">
              MedicalAI / Legal
            </span>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">
            How MedicalAI collects, uses, protects, and handles information
            provided by users.
          </p>

          <div className="mt-6 flex items-center gap-2 font-mono text-xs text-zinc-600">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            LAST UPDATED: SEPTEMBER 28, 2026
          </div>
        </header>

        {/* Content */}
        <div className="grid gap-12 lg:grid-cols-[180px_1fr]">

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-10">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                Contents
              </p>

              <nav className="space-y-2 border-l border-zinc-800 pl-4 text-xs">
                {[
                  ["information", "Information"],
                  ["usage", "How we use it"],
                  ["ai", "AI processing"],
                  ["sharing", "Data sharing"],
                  ["security", "Security"],
                  ["rights", "Your rights"],
                ].map(([id, label]) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="block text-zinc-500 transition hover:text-cyan-400"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Document */}
          <article className="max-w-3xl space-y-14">

            {/* Introduction */}
            <section>
              <p className="text-lg leading-8 text-zinc-300">
                MedicalAI ("MedicalAI", "we", "us", or "our") is an AI-powered
                health information assistant designed to help users organize
                and understand information about their symptoms.
              </p>

              <p className="mt-5 leading-7 text-zinc-400">
                This Privacy Policy explains what information MedicalAI may
                collect, how it is used, how it is protected, and what choices
                you have regarding your information.
              </p>
            </section>

            {/* 01 */}
            <section id="information">
              <SectionHeader number="01" title="Information We Collect" />

              <p className="leading-7 text-zinc-400">
                Depending on how you use MedicalAI, we may collect the
                following categories of information.
              </p>

              <InfoBlock title="Account Information">
                <ul>
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Authentication information</li>
                  <li>Account preferences</li>
                </ul>
              </InfoBlock>

              <InfoBlock title="Health Information">
                <ul>
                  <li>Symptoms</li>
                  <li>Symptom duration and onset</li>
                  <li>Symptom severity</li>
                  <li>Body location</li>
                  <li>Related symptoms</li>
                  <li>Other information voluntarily provided</li>
                </ul>
              </InfoBlock>

              <InfoBlock title="Technical Information">
                <ul>
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device information</li>
                  <li>Operating system</li>
                  <li>Usage information</li>
                  <li>Error and diagnostic information</li>
                </ul>
              </InfoBlock>
            </section>

            {/* 02 */}
            <section id="usage">
              <SectionHeader number="02" title="How We Use Information" />

              <p className="leading-7 text-zinc-400">
                Information we collect may be used to:
              </p>

              <BulletList
                items={[
                  "Provide and operate MedicalAI",
                  "Understand the symptoms and information you provide",
                  "Generate responses from the AI assistant",
                  "Maintain and improve the service",
                  "Detect and prevent abuse, fraud, and security problems",
                  "Troubleshoot technical problems",
                  "Communicate with you about your account or the service",
                ]}
              />

              <Notice>
                We do not use your information to make medical decisions on
                your behalf.
              </Notice>
            </section>

            {/* 03 */}
            <section id="ai">
              <SectionHeader number="03" title="AI & Health Information" />

              <p className="leading-7 text-zinc-400">
                MedicalAI uses artificial intelligence to process information
                provided by users. The AI assistant is designed to gather and
                organize symptom information.
              </p>

              <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-5">
                <div className="flex gap-4">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-amber-500/20 bg-amber-500/10">
                    <span className="text-xs text-amber-400">!</span>
                  </div>

                  <div>
                    <p className="font-medium text-amber-300">
                      Medical disclaimer
                    </p>

                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      MedicalAI is not a doctor, medical professional, or
                      emergency service. It does not provide a medical
                      diagnosis or prescribe treatment.
                    </p>

                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                      If you believe you are experiencing a medical emergency,
                      contact your local emergency service or seek immediate
                      medical attention.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 04 */}
            <section id="sharing">
              <SectionHeader number="04" title="How We Share Information" />

              <p className="leading-7 text-zinc-400">
                We do not sell your personal information.
              </p>

              <p className="mt-5 leading-7 text-zinc-400">
                Information may be shared with service providers necessary to
                operate MedicalAI, including:
              </p>

              <BulletList
                items={[
                  "Hosting providers",
                  "Database providers",
                  "Authentication providers",
                  "AI or model providers",
                  "Analytics and monitoring providers",
                ]}
              />

              <p className="mt-5 leading-7 text-zinc-400">
                These providers may process information on our behalf and are
                expected to handle information according to their applicable
                agreements and security requirements.
              </p>
            </section>

            {/* 05 */}
            <section>
              <SectionHeader number="05" title="Data Retention" />

              <p className="leading-7 text-zinc-400">
                We retain information only for as long as reasonably necessary
                to provide the service, maintain security, comply with legal
                obligations, resolve disputes, and enforce our agreements.
              </p>

              <p className="mt-5 leading-7 text-zinc-400">
                If you delete your account, we will take reasonable steps to
                delete or de-identify associated information, subject to
                information that we are legally required or permitted to
                retain.
              </p>
            </section>

            {/* 06 */}
            <section id="security">
              <SectionHeader number="06" title="Data Security" />

              <p className="leading-7 text-zinc-400">
                We use reasonable technical and organizational measures
                intended to protect information against unauthorized access,
                loss, misuse, alteration, or disclosure.
              </p>

              <p className="mt-5 leading-7 text-zinc-400">
                However, no internet service can guarantee absolute security.
              </p>

              <div className="mt-6 flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3">
                <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />

                <span className="font-mono text-xs text-zinc-500">
                  SECURITY STATUS / REASONABLE SAFEGUARDS
                </span>
              </div>
            </section>

            {/* 07 */}
            <section id="rights">
              <SectionHeader number="07" title="Your Choices & Rights" />

              <p className="leading-7 text-zinc-400">
                Depending on where you live, you may have rights regarding
                your personal information, including the right to:
              </p>

              <BulletList
                items={[
                  "Request access to information we hold about you",
                  "Request correction of inaccurate information",
                  "Request deletion of your information",
                  "Request restrictions on certain processing",
                  "Withdraw consent where processing is based on consent",
                ]}
              />

              <p className="mt-5 leading-7 text-zinc-400">
                To make a privacy-related request, contact us using the email
                address below.
              </p>
            </section>

            {/* 08 */}
            <section>
              <SectionHeader number="08" title="Children's Privacy" />

              <p className="leading-7 text-zinc-400">
                MedicalAI is not intended for children unless explicitly
                stated otherwise. We do not knowingly collect personal
                information from children in violation of applicable law.
              </p>
            </section>

            {/* 09 */}
            <section>
              <SectionHeader number="09" title="Third-Party Services" />

              <p className="leading-7 text-zinc-400">
                MedicalAI may rely on third-party services to provide
                functionality such as authentication, hosting, databases,
                AI processing, analytics, and monitoring.
              </p>

              <p className="mt-5 leading-7 text-zinc-400">
                Those services may process information according to their own
                privacy policies and terms.
              </p>
            </section>

            {/* 10 */}
            <section>
              <SectionHeader number="10" title="International Data Transfers" />

              <p className="leading-7 text-zinc-400">
                Depending on the services used to operate MedicalAI, your
                information may be processed or stored in countries other than
                the country where you live.
              </p>
            </section>

            {/* 11 */}
            <section>
              <SectionHeader number="11" title="Changes to This Policy" />

              <p className="leading-7 text-zinc-400">
                We may update this Privacy Policy from time to time. When we
                make changes, we will update the "Last updated" date at the top
                of this page.
              </p>
            </section>

            {/* 12 */}
            <section>
              <SectionHeader number="12" title="Contact Us" />

              <p className="leading-7 text-zinc-400">
                If you have questions, concerns, or requests regarding this
                Privacy Policy or your personal information, contact us at:
              </p>

              <div className="mt-6 rounded-xl border border-zinc-800 bg-[#080b0f] p-6">
                <div className="font-mono text-xs uppercase tracking-wider text-zinc-600">
                  Privacy Contact
                </div>

                <a
                  href="mailto:lochanjangidcoder@gmail.com"
                  className="mt-2 block text-sm text-cyan-400 transition hover:text-cyan-300"
                >
                  lochanjangidcoder@gmail.com
                </a>

                <div className="mt-5 h-px bg-zinc-800" />

                <div className="mt-5 text-sm text-zinc-500">
                  MedicalAI
                </div>
              </div>
            </section>

            {/* Final disclaimer */}
            <section className="border-t border-zinc-800 pt-10">
              <div className="rounded-2xl border border-cyan-500/10 bg-cyan-500/[0.025] p-6 sm:p-8">
                <h2 className="font-medium text-white">
                  Medical information disclaimer
                </h2>

                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  MedicalAI is an informational technology tool and is not a
                  substitute for a qualified healthcare professional. Do not
                  rely on MedicalAI for diagnosis, emergency medical decisions,
                  or treatment recommendations.
                </p>
              </div>
            </section>
          </article>
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-zinc-900 pt-8">
          <div className="flex flex-col gap-3 font-mono text-[10px] uppercase tracking-wider text-zinc-700 sm:flex-row sm:items-center sm:justify-between">
            <span>MedicalAI / Privacy</span>
            <span>© 2026 MedicalAI</span>
          </div>
        </footer>
      </div>
    </main>
  );
}

/* ----------------------------- */
/* Components                    */
/* ----------------------------- */

function SectionHeader({ number, title }) {
  return (
    <div className="mb-6 flex items-baseline gap-4">
      <span className="font-mono text-[10px] tracking-widest text-cyan-500/70">
        {number}
      </span>

      <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
        {title}
      </h2>
    </div>
  );
}

function InfoBlock({ title, children }) {
  return (
    <div className="mt-6 rounded-xl border border-zinc-800/80 bg-zinc-900/20 p-5">
      <h3 className="mb-3 text-sm font-medium text-zinc-200">{title}</h3>

      <div className="text-sm leading-7 text-zinc-500 [&_li]:relative [&_li]:pl-5 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.8em] [&_li]:before:h-1 [&_li]:before:w-1 [&_li]:before:rounded-full [&_li]:before:bg-cyan-500/50">
        {children}
      </div>
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="mt-5 space-y-3 text-sm leading-6 text-zinc-500">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-500/60" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Notice({ children }) {
  return (
    <div className="mt-6 rounded-lg border border-cyan-500/10 bg-cyan-500/[0.025] px-5 py-4 text-sm leading-6 text-zinc-400">
      <span className="mr-2 font-mono text-[10px] uppercase tracking-wider text-cyan-500">
        Note
      </span>
      {children}
    </div>
  );
}