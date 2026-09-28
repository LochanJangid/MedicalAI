import { useState } from 'react'
import { useNearbyDoctors } from '../../hooks/useNearbyDoctors'
import { SPECIALTY_OPTIONS } from '../../lib/specialties'

const KIND_STYLES = {
  hospital: 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400',
  clinic: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400',
  doctor: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
  dentist: 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400',
}

const BUSY_TEXT = {
  locating: 'Getting your location...',
  analysing: 'Reading your symptoms...',
  loading: 'Searching nearby...',
}

function formatDistance(km) {
  return km < 1 ? `${Math.round(km * 1000)} m away` : `${km.toFixed(1)} km away`
}

function mapsUrl(d) {
  return `https://www.google.com/maps/dir/?api=1&destination=${d.lat},${d.lng}`
}

function DoctorCard({ doctor }) {
  return (
    <a
      href={mapsUrl(doctor)}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-snug">
          {doctor.name}
        </div>
        <span className={`shrink-0 text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full ${KIND_STYLES[doctor.kind] || KIND_STYLES.clinic}`}>
          {doctor.kind}
        </span>
      </div>
      <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">{formatDistance(doctor.distance_km)}</div>
      {doctor.match === 'multispecialty' && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Multi-specialty hospital</div>
      )}
      {doctor.address && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">{doctor.address}</div>
      )}
    </a>
  )
}

export default function DoctorPanel({ messages = [] }) {
  const { status, doctors, error, specialtyLabel, fallback, search } = useNearbyDoctors()
  const [mode, setMode] = useState('auto')
  const busy = status in BUSY_TEXT

  const handleModeChange = (next) => {
    setMode(next)
    if (status !== 'idle') search({ mode: next, messages })
  }

  const onlyMultiSpecialty =
    status === 'done' && !fallback && doctors.length > 0 && doctors.every((d) => d.match === 'multispecialty')

  return (
    <div className="hidden lg:flex flex-col w-80 shrink-0 h-screen border-l border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-950 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Nearby doctors</div>
        {status === 'done' && (
          <button
            onClick={() => search({ mode, messages, refreshLocation: true })}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Refresh
          </button>
        )}
      </div>

      <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">Looking for</label>
      <select
        value={mode}
        onChange={(e) => handleModeChange(e.target.value)}
        disabled={busy}
        className="mb-3 w-full rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-gray-100 px-2 py-1.5"
      >
        <option value="auto">Auto — based on your chat</option>
        {SPECIALTY_OPTIONS.map((o) => (
          <option key={o.key} value={o.key}>{o.label}</option>
        ))}
      </select>

      {status === 'done' && (
        <div className="text-xs mb-2 text-gray-500 dark:text-gray-400">
          {fallback ? (
            <span className="text-amber-600 dark:text-amber-400">
              No {specialtyLabel} matches nearby — showing general results instead.
            </span>
          ) : onlyMultiSpecialty ? (
            <span>No dedicated {specialtyLabel} clinics found — showing multi-specialty hospitals.</span>
          ) : (
            <span>Showing: {specialtyLabel}</span>
          )}
        </div>
      )}

      <div className="flex-1 overflow-y-auto min-h-0 space-y-2">
        {status === 'idle' && (
          <div className="h-full flex flex-col items-center justify-center text-center gap-3 px-4">
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Find hospitals and clinics that match your symptoms.
            </p>
            <button
              onClick={() => search({ mode, messages })}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors"
            >
              Find doctors near me
            </button>
          </div>
        )}

        {busy && (
          <div className="h-full flex items-center justify-center text-sm text-gray-400 dark:text-gray-500">
            {BUSY_TEXT[status]}
          </div>
        )}

        {status === 'error' && (
          <div className="h-full flex flex-col items-center justify-center text-center gap-3 px-4">
            <p className="text-sm text-red-500">{error}</p>
            <button
              onClick={() => search({ mode, messages })}
              className="px-4 py-2 rounded-xl border border-gray-300 dark:border-neutral-700 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800"
            >
              Try again
            </button>
          </div>
        )}

        {status === 'done' && doctors.length === 0 && (
          <div className="h-full flex items-center justify-center text-center text-sm text-gray-400 dark:text-gray-500 px-4">
            No named clinics or hospitals found nearby.
          </div>
        )}

        {status === 'done' && doctors.map((d, i) => <DoctorCard key={`${d.name}-${i}`} doctor={d} />)}
      </div>
    </div>
  )
}