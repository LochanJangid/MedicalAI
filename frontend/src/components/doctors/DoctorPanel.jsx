import { useState } from 'react'
import { useNearbyDoctors } from '../../hooks/useNearbyDoctors'
import { SPECIALTY_OPTIONS } from '../../lib/specialties'

const KIND_STYLES = {
  hospital:
    'bg-red-400/[0.08] text-red-300 border-red-300/[0.10]',
  clinic:
    'bg-blue-400/[0.08] text-blue-300 border-blue-300/[0.10]',
  doctor:
    'bg-emerald-400/[0.08] text-emerald-300 border-emerald-300/[0.10]',
  dentist:
    'bg-violet-400/[0.08] text-violet-300 border-violet-300/[0.10]',
}

const BUSY_TEXT = {
  locating: 'Getting your location...',
  analysing: 'Reading your symptoms...',
  loading: 'Searching nearby...',
}

function formatDistance(km) {
  return km < 1
    ? `${Math.round(km * 1000)} m away`
    : `${km.toFixed(1)} km away`
}

function mapsUrl(d) {
  return `https://www.google.com/maps/dir/?api=1&destination=${d.lat},${d.lng}`
}

/* Hospital / nearby-care icon */
function HospitalIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 21h18" />
      <path d="M5 21V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14" />
      <path d="M9 21v-5h6v5" />
      <path d="M10 9h4" />
      <path d="M12 7v4" />
    </svg>
  )
}

/* Location + medical cross icon */
function NearbyIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10.5c0 5.5-8 10.5-8 10.5S4 16 4 10.5a8 8 0 1 1 16 0Z" />
      <path d="M12 7v7" />
      <path d="M8.5 10.5h7" />
    </svg>
  )
}

function DoctorCard({ doctor }) {
  return (
    <a
      href={mapsUrl(doctor)}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group block
        rounded-2xl
        border border-white/[0.07]
        bg-white/[0.035]
        p-3.5
        backdrop-blur-xl
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-rose-200/[0.13]
        hover:bg-white/[0.055]
        hover:shadow-lg
        hover:shadow-black/20
      "
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-medium leading-snug text-neutral-100">
            {doctor.name}
          </div>

          <div className="mt-1 text-xs text-rose-300/80">
            {formatDistance(doctor.distance_km)}
          </div>
        </div>

        <span
          className={`
            shrink-0
            rounded-full
            border
            px-2
            py-1
            text-[9px]
            font-medium
            uppercase
            tracking-wider
            ${KIND_STYLES[doctor.kind] || KIND_STYLES.clinic}
          `}
        >
          {doctor.kind}
        </span>
      </div>

      {doctor.match === 'multispecialty' && (
        <div className="mt-2 text-[11px] text-neutral-500">
          Multi-specialty hospital
        </div>
      )}

      {doctor.address && (
        <div className="mt-1.5 truncate text-[11px] leading-5 text-neutral-600">
          {doctor.address}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-white/[0.05] pt-2.5">
        <span className="text-[10px] text-neutral-600">
          Open in Maps
        </span>

        <span className="text-xs text-neutral-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-rose-300">
          →
        </span>
      </div>
    </a>
  )
}

export default function DoctorPanel({ messages = [] }) {
  const {
    status,
    doctors,
    error,
    specialtyLabel,
    fallback,
    search,
  } = useNearbyDoctors()

  const [mode, setMode] = useState('auto')
  const [collapsed, setCollapsed] = useState(false)

  const busy = status in BUSY_TEXT

  const handleModeChange = (next) => {
    setMode(next)

    if (status !== 'idle') {
      search({
        mode: next,
        messages,
      })
    }
  }

  const onlyMultiSpecialty =
    status === 'done' &&
    !fallback &&
    doctors.length > 0 &&
    doctors.every(
      (d) => d.match === 'multispecialty'
    )

  return (
    <div
      className={`
        hidden
        lg:flex
        h-screen
        shrink-0
        items-center
        justify-center
        py-4
        pr-4
        transition-[width]
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${collapsed ? 'w-20' : 'w-80'}
      `}
    >
      {/* =====================================================
          EXPANDED / COLLAPSED FLOATING CARD
      ====================================================== */}
      <div
        className={`
          relative
          overflow-hidden
          border border-white/[0.08]
          bg-[#141117]/90
          shadow-2xl
          shadow-black/40
          backdrop-blur-2xl
          transition-all
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${
            collapsed
              ? `
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
              `
              : `
                flex
                h-[calc(100vh-32px)]
                w-full
                flex-col
                rounded-[26px]
              `
          }
        `}
      >
        {/* Ambient glow */}
        <div
          className="
            pointer-events-none
            absolute
            -right-16
            -top-16
            h-40
            w-40
            rounded-full
            bg-rose-400/[0.055]
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-20
            -left-16
            h-40
            w-40
            rounded-full
            bg-violet-500/[0.045]
            blur-3xl
          "
        />

        {/* =================================================
            COLLAPSED STATE
        ================================================== */}
        {collapsed ? (
          <button
            onClick={() => setCollapsed(false)}
            className="
              group
              relative
              flex
              h-full
              w-full
              items-center
              justify-center
              text-rose-300
              transition-all
              duration-300
              hover:bg-rose-200/[0.045]
            "
            title="Open nearby care"
            aria-label="Open nearby care"
          >
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border border-rose-200/[0.10]
                bg-rose-200/[0.04]
                shadow-lg
                shadow-rose-500/[0.06]
                transition-all
                duration-300
                group-hover:scale-105
                group-hover:border-rose-200/[0.18]
                group-hover:bg-rose-200/[0.07]
              "
            >
              <HospitalIcon size={18} />
            </div>

            {/* Small status dot */}
            <span
              className="
                absolute
                right-2
                top-2
                h-1.5
                w-1.5
                rounded-full
                bg-rose-300/80
                shadow-[0_0_8px_rgba(251,113,133,0.4)]
              "
            />
          </button>
        ) : (
          <>
            {/* =============================================
                EXPANDED HEADER
            ============================================== */}
            <div
              className="
                relative
                z-10
                flex
                h-[74px]
                shrink-0
                items-center
                justify-between
                border-b
                border-white/[0.06]
                px-4
              "
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className="
                    relative
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    border border-rose-200/[0.10]
                    bg-rose-200/[0.045]
                    text-rose-300
                    shadow-lg
                    shadow-rose-500/[0.06]
                  "
                >
                  <NearbyIcon size={20} />

                  <span
                    className="
                      absolute
                      right-1
                      top-1
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-rose-300/80
                      shadow-[0_0_8px_rgba(251,113,133,0.4)]
                    "
                  />
                </div>

                <div className="min-w-0">
                  <div className="text-sm font-semibold tracking-tight text-white">
                    Nearby care
                  </div>

                  <div className="mt-0.5 truncate text-[10px] text-neutral-600">
                    Find care that fits your needs
                  </div>
                </div>
              </div>

              {/* Collapse */}
              <button
                onClick={() => setCollapsed(true)}
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border border-white/[0.06]
                  bg-white/[0.025]
                  text-neutral-600
                  transition-all
                  duration-300
                  hover:border-rose-200/[0.12]
                  hover:bg-rose-200/[0.045]
                  hover:text-rose-200
                "
                title="Collapse nearby care"
                aria-label="Collapse nearby care"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="rotate-[270deg]"
                >
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>
            </div>

            {/* =============================================
                CONTENT
            ============================================== */}
            <div className="relative z-10 flex min-h-0 flex-1 flex-col">
              {/* Controls */}
              <div className="shrink-0 px-4 pt-4">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-600">
                    Looking for
                  </label>

                  {status === 'done' && (
                    <button
                      onClick={() =>
                        search({
                          mode,
                          messages,
                          refreshLocation: true,
                        })
                      }
                      className="
                        text-[10px]
                        text-neutral-600
                        transition-colors
                        hover:text-rose-300
                      "
                    >
                      Refresh
                    </button>
                  )}
                </div>

                <div className="relative">
                  <select
                    value={mode}
                    onChange={(e) =>
                      handleModeChange(e.target.value)
                    }
                    disabled={busy}
                    className="
                      w-full
                      appearance-none
                      rounded-xl
                      border border-white/[0.07]
                      bg-white/[0.035]
                      px-3
                      py-2.5
                      pr-9
                      text-xs
                      text-neutral-300
                      outline-none
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      focus:border-rose-200/[0.15]
                      focus:bg-white/[0.05]
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    <option
                      value="auto"
                      className="bg-[#141117]"
                    >
                      Auto — based on your chat
                    </option>

                    {SPECIALTY_OPTIONS.map((o) => (
                      <option
                        key={o.key}
                        value={o.key}
                        className="bg-[#141117]"
                      >
                        {o.label}
                      </option>
                    ))}
                  </select>

                  <span
                    className="
                      pointer-events-none
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-[10px]
                      text-neutral-600
                    "
                  >
                    ↓
                  </span>
                </div>

                {status === 'done' && (
                  <div className="mt-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5">
                    {fallback ? (
                      <span className="text-[10px] leading-4 text-amber-300/80">
                        No {specialtyLabel} matches nearby. Showing general results instead.
                      </span>
                    ) : onlyMultiSpecialty ? (
                      <span className="text-[10px] leading-4 text-neutral-500">
                        No dedicated {specialtyLabel} clinics found. Showing multi-specialty hospitals.
                      </span>
                    ) : (
                      <span className="text-[10px] leading-4 text-neutral-500">
                        Showing:{' '}
                        <span className="text-rose-300/80">
                          {specialtyLabel}
                        </span>
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Results */}
              <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 pt-3">
                {status === 'idle' && (
                  <div className="flex h-full flex-col items-center justify-center px-5 text-center">
                    <div
                      className="
                        mb-4
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        border border-rose-200/[0.08]
                        bg-rose-200/[0.035]
                        text-rose-300/70
                      "
                    >
                      <HospitalIcon size={24} />
                    </div>

                    <p className="max-w-[220px] text-xs leading-5 text-neutral-600">
                      Find hospitals and clinics that match your symptoms.
                    </p>

                    <button
                      onClick={() =>
                        search({
                          mode,
                          messages,
                        })
                      }
                      className="
                        mt-5
                        rounded-xl
                        bg-[#fffaf7]
                        px-4
                        py-2.5
                        text-xs
                        font-semibold
                        text-[#171318]
                        shadow-lg
                        shadow-rose-500/[0.06]
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:shadow-xl
                        hover:shadow-rose-500/[0.10]
                      "
                    >
                      Find care near me
                    </button>
                  </div>
                )}

                {busy && (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div
                      className="
                        mb-4
                        h-8
                        w-8
                        animate-spin
                        rounded-full
                        border-2
                        border-white/[0.08]
                        border-t-rose-300
                      "
                    />

                    <div className="text-xs text-neutral-500">
                      {BUSY_TEXT[status]}
                    </div>

                    <div className="mt-1 text-[10px] text-neutral-700">
                      Just a moment
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex h-full flex-col items-center justify-center px-5 text-center">
                    <div
                      className="
                        mb-4
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        border border-red-300/[0.10]
                        bg-red-400/[0.05]
                        text-lg
                        text-red-300
                      "
                    >
                      !
                    </div>

                    <p className="max-w-[230px] text-xs leading-5 text-red-300/80">
                      {error}
                    </p>

                    <button
                      onClick={() =>
                        search({
                          mode,
                          messages,
                        })
                      }
                      className="
                        mt-4
                        rounded-xl
                        border border-white/[0.08]
                        bg-white/[0.035]
                        px-4
                        py-2
                        text-xs
                        text-neutral-400
                        transition-all
                        duration-300
                        hover:border-white/[0.12]
                        hover:bg-white/[0.06]
                        hover:text-white
                      "
                    >
                      Try again
                    </button>
                  </div>
                )}

                {status === 'done' &&
                  doctors.length === 0 && (
                    <div className="flex h-full flex-col items-center justify-center px-5 text-center">
                      <div className="mb-3 text-neutral-700">
                        <HospitalIcon size={24} />
                      </div>

                      <p className="text-xs leading-5 text-neutral-600">
                        No named clinics or hospitals found nearby.
                      </p>
                    </div>
                  )}

                {status === 'done' &&
                  doctors.length > 0 && (
                    <div className="space-y-2.5">
                      {doctors.map((d, i) => (
                        <DoctorCard
                          key={`${d.name}-${i}`}
                          doctor={d}
                        />
                      ))}
                    </div>
                  )}
              </div>

              {/* Footer */}
              <div className="shrink-0 border-t border-white/[0.05] px-4 py-3">
                <div className="flex items-center justify-center gap-1.5 text-[9px] text-neutral-700">
                  <HospitalIcon size={10} />
                  Nearby care is based on available location data
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}