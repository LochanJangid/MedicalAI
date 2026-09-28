import { useState } from 'react'
import ToggleSwitch from '../../components/common/ToggleSwitch'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
]

function ExpandableRow({ icon, label, value, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800"
      >
        <span className="flex items-center gap-2">
          <span>{icon}</span>
          <span>{label}</span>
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500">{value}</span>
      </button>
      {open && (
        <div className="ml-8 mb-1 flex flex-col gap-0.5">
          {children}
        </div>
      )}
    </div>
  )
}

function OptionButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`text-left px-3 py-1.5 rounded-md text-sm
        ${active ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800'}`}
    >
      {children}
    </button>
  )
}

export default function AccountMenu({
  userEmail,
  incognito,
  onToggleIncognito,
  theme,
  onSetTheme,
  settings,
  onSetLanguage,
  onOpenFullSettings,
  onSignOut,
}) {
  const languageLabel = LANGUAGES.find((l) => l.code === settings.language)?.label || 'Default'

  return (
    <div className="absolute bottom-full left-0 mb-2 w-64 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-xl p-2 z-50">
      <div className="px-3 py-2 mb-1 border-b border-gray-100 dark:border-neutral-800">
        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
          {userEmail?.split('@')[0]}
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500 truncate">{userEmail}</div>
      </div>

      <div className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800">
        <span className="flex items-center gap-2">
          <span>🕶</span>
          <span>Incognito</span>
        </span>
        <ToggleSwitch checked={incognito} onChange={onToggleIncognito} />
      </div>

      <button
        onClick={onOpenFullSettings}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800"
      >
        <span>⚙</span>
        <span>All settings</span>
      </button>

      <ExpandableRow icon="🎨" label="Appearance" value={theme === 'dark' ? 'Dark' : 'Light'}>
        <OptionButton active={theme === 'light'} onClick={() => onSetTheme('light')}>Light</OptionButton>
        <OptionButton active={theme === 'dark'} onClick={() => onSetTheme('dark')}>Dark</OptionButton>
      </ExpandableRow>

      <ExpandableRow icon="🌐" label="Language" value={languageLabel}>
        {LANGUAGES.map((l) => (
          <OptionButton key={l.code} active={settings.language === l.code} onClick={() => onSetLanguage(l.code)}>
            {l.label}
          </OptionButton>
        ))}
      </ExpandableRow>

      <div className="my-1 border-t border-gray-100 dark:border-neutral-800" />

      <button
        onClick={onSignOut}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
      >
        <span>↪</span>
        <span>Sign out</span>
      </button>
    </div>
  )
}