import { useState } from 'react'
import ToggleSwitch from '../../components/common/ToggleSwitch'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
]

function ExpandableRow({
  icon,
  label,
  value,
  children,
}) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="
          flex w-full items-center
          justify-between
          rounded-xl
          px-3 py-2.5
          text-sm
          text-neutral-400
          transition-all duration-200
          hover:bg-white/[0.045]
          hover:text-neutral-200
        "
      >
        <span className="flex items-center gap-2.5">
          <span className="text-sm opacity-70">
            {icon}
          </span>

          <span>{label}</span>
        </span>

        <span className="flex items-center gap-2 text-[10px] text-neutral-600">
          {value}

          <span
            className={`transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          >
            ↓
          </span>
        </span>
      </button>

      {open && (
        <div className="ml-8 mb-1 flex flex-col gap-0.5">
          {children}
        </div>
      )}
    </div>
  )
}

function OptionButton({
  active,
  onClick,
  children,
}) {
  return (
    <button
      onClick={onClick}
      className={`
        rounded-lg
        px-3 py-2
        text-left
        text-sm
        transition-all duration-200
        ${
          active
            ? `
              bg-rose-200/[0.06]
              text-rose-200
              font-medium
            `
            : `
              text-neutral-500
              hover:bg-white/[0.035]
              hover:text-neutral-300
            `
        }
      `}
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
  const languageLabel =
    LANGUAGES.find(
      (l) => l.code === settings.language
    )?.label || 'Default'

  return (
    <div
      className="
        absolute
        bottom-full
        left-0
        z-50
        mb-2
        w-64
        overflow-hidden
        rounded-2xl
        border border-white/[0.08]
        bg-[#141117]/95
        p-2
        shadow-2xl
        shadow-black/40
        backdrop-blur-2xl
      "
    >
      {/* Account information */}
      <div className="mb-1 border-b border-white/[0.06] px-3 py-3">
        <div className="truncate text-sm font-medium text-white">
          {userEmail?.split('@')[0]}
        </div>

        <div className="mt-0.5 truncate text-xs text-neutral-600">
          {userEmail}
        </div>
      </div>

      {/* Incognito */}
      <div
        className="
          flex items-center
          justify-between
          rounded-xl
          px-3 py-2.5
          text-sm
          text-neutral-400
          transition-colors
          hover:bg-white/[0.045]
        "
      >
        <span className="flex items-center gap-2.5">
          <span className="text-sm opacity-70">
            🕶
          </span>

          <span>Incognito</span>
        </span>

        <ToggleSwitch
          checked={incognito}
          onChange={onToggleIncognito}
        />
      </div>

      {/* Settings */}
      <button
        onClick={onOpenFullSettings}
        className="
          flex w-full items-center gap-2.5
          rounded-xl
          px-3 py-2.5
          text-sm
          text-neutral-400
          transition-all duration-200
          hover:bg-white/[0.045]
          hover:text-neutral-200
        "
      >
        <span className="text-sm opacity-70">
          ⚙
        </span>

        <span>All settings</span>
      </button>

      {/* Appearance */}
      <ExpandableRow
        icon="🎨"
        label="Appearance"
        value={theme === 'dark' ? 'Dark' : 'Light'}
      >
        <OptionButton
          active={theme === 'light'}
          onClick={() => onSetTheme('light')}
        >
          Light
        </OptionButton>

        <OptionButton
          active={theme === 'dark'}
          onClick={() => onSetTheme('dark')}
        >
          Dark
        </OptionButton>
      </ExpandableRow>

      {/* Language */}
      <ExpandableRow
        icon="🌐"
        label="Language"
        value={languageLabel}
      >
        {LANGUAGES.map((language) => (
          <OptionButton
            key={language.code}
            active={
              settings.language === language.code
            }
            onClick={() =>
              onSetLanguage(language.code)
            }
          >
            {language.label}
          </OptionButton>
        ))}
      </ExpandableRow>

      {/* Divider */}
      <div className="my-1 border-t border-white/[0.06]" />

      {/* Sign out */}
      <button
        onClick={onSignOut}
        className="
          flex w-full items-center gap-2.5
          rounded-xl
          px-3 py-2.5
          text-sm
          text-red-300/80
          transition-all duration-200
          hover:bg-red-400/[0.07]
          hover:text-red-300
        "
      >
        <span className="text-sm opacity-80">
          ↪
        </span>

        <span>Sign out</span>
      </button>
    </div>
  )
}