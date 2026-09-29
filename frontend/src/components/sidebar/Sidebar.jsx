import { useState, useRef, useEffect } from 'react'
import AccountMenu from './AccountMenu'

export default function Sidebar({
  conversations,
  activeId,
  onSelect,
  onNewChat,
  onDelete,
  collapsed,
  onToggleCollapsed,
  mobileOpen,
  onCloseMobile,
  userEmail,
  avatarUrl,
  incognito,
  onToggleIncognito,
  theme,
  onSetTheme,
  settings,
  onSetLanguage,
  onOpenFullSettings,
  onSignOut,
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () =>
      document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (id) => {
    onSelect(id)
    onCloseMobile?.()
  }

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40
          flex h-screen shrink-0 flex-col
          border-r border-white/[0.07]
          bg-[#0d0b10]/95
          p-3
          shadow-2xl shadow-black/20
          backdrop-blur-2xl
          transition-[width,transform] duration-300
          md:static md:z-auto md:translate-x-0
          ${collapsed ? 'md:w-16' : 'md:w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header */}
        <div
          className={`
            mb-5 flex h-10 shrink-0 items-center
            ${collapsed ? 'justify-center' : 'justify-between'}
          `}
        >
          {!collapsed ? (
            <>
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-lg">
                  🧬

                  <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-rose-300/80" />
                </div>

                <div className="min-w-0">
                  <div className="text-sm font-semibold tracking-tight text-white">
                    MedicalAI
                  </div>

                  <div className="truncate text-[9px] text-neutral-600">
                    a gentler way to understand
                  </div>
                </div>
              </div>

              {/* Desktop collapse */}
              <button
                onClick={onToggleCollapsed}
                className="hidden shrink-0 rounded-xl p-2 text-neutral-600 transition-all duration-200 hover:bg-white/[0.05] hover:text-neutral-300 md:inline-flex"
                title="Collapse sidebar"
                aria-label="Collapse sidebar"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="16"
                    rx="2"
                  />
                  <line
                    x1="9"
                    y1="4"
                    x2="9"
                    y2="20"
                  />
                </svg>
              </button>

              {/* Mobile close */}
              <button
                onClick={onCloseMobile}
                className="ml-1 rounded-xl p-2 text-neutral-600 transition-all duration-200 hover:bg-white/[0.05] hover:text-neutral-300 md:hidden"
                aria-label="Close sidebar"
              >
                ×
              </button>
            </>
          ) : (
            /* Collapsed header */
            <div className="flex w-full items-center justify-center">
              <button
                onClick={onToggleCollapsed}
                className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-lg shadow-lg shadow-rose-500/[0.04] transition-all duration-200 hover:border-rose-200/[0.15] hover:bg-white/[0.06]"
                title="Expand sidebar"
                aria-label="Expand sidebar"
              >
                🧬
              </button>
            </div>
          )}
        </div>

        {/* New Chat */}
        <button
          onClick={() => {
            onNewChat()
            onCloseMobile?.()
          }}
          className={`
            group mb-4 flex shrink-0 items-center gap-2.5 rounded-xl
            border border-white/[0.08] bg-white/[0.035]
            px-3.5 py-2.5 text-sm font-medium text-neutral-300
            backdrop-blur-xl transition-all duration-300
            hover:-translate-y-0.5
            hover:border-rose-200/[0.14]
            hover:bg-white/[0.055]
            hover:text-white
            ${collapsed ? 'md:justify-center md:px-2.5' : ''}
          `}
        >
          <span className="text-lg leading-none text-rose-300/80">
            +
          </span>

          <span className={collapsed ? 'md:hidden' : ''}>
            New chat
          </span>
        </button>

        {/* Conversations */}
        <div
          className={`
            min-h-0 flex-1 overflow-y-auto space-y-1 pr-1
            ${collapsed ? 'md:hidden' : ''}
          `}
        >
          {conversations.length === 0 && (
            <div className="px-2 py-2 text-xs text-neutral-600">
              No conversations yet
            </div>
          )}

          {conversations.map((c) => (
            <div
              key={c.id}
              onClick={() => handleSelect(c.id)}
              className={`
                group flex cursor-pointer items-center justify-between
                rounded-xl px-3 py-2.5 text-sm transition-all duration-200
                ${
                  c.id === activeId
                    ? 'border border-rose-200/[0.08] bg-rose-200/[0.045] font-medium text-white'
                    : 'border border-transparent text-neutral-500 hover:border-white/[0.05] hover:bg-white/[0.035] hover:text-neutral-300'
                }
              `}
            >
              <span className="min-w-0 truncate">
                {c.title}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(c.id)
                }}
                className="ml-2 shrink-0 rounded-lg px-1.5 text-neutral-700 opacity-0 transition-all duration-200 hover:bg-red-400/[0.08] hover:text-red-300 group-hover:opacity-100"
                aria-label="Delete conversation"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Profile / Account */}
        <div
          className="relative mt-3 shrink-0 border-t border-white/[0.06] pt-3"
          ref={menuRef}
        >
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className={`
              group flex w-full items-center gap-2.5 rounded-xl
              border border-transparent
              px-2.5 py-2.5
              transition-all duration-200
              hover:border-white/[0.06]
              hover:bg-white/[0.035]
              ${collapsed ? 'md:justify-center md:px-2' : ''}
            `}
          >
            {/* 
              PROFILE LOGIC:
              If avatarUrl exists -> show profile photo.
              If avatarUrl does not exist -> show love icon.
            */}
            <div
                className="
                  relative flex h-8 w-8 shrink-0
                  items-center justify-center
                  overflow-hidden
                  rounded-xl
                  border border-rose-200/[0.12]
                  bg-rose-200/[0.045]
                  text-sm
                  text-rose-300
                  shadow-lg
                  shadow-rose-500/[0.08]
                  transition-all duration-300
                  group-hover:border-rose-200/[0.20]
                  group-hover:bg-rose-200/[0.07]
                  group-hover:shadow-rose-500/[0.14]
                "
              >
                <span className="transition-transform duration-300 group-hover:scale-125">
                  ♡
                </span>

                <span
                  className="
                    absolute
                    -right-0.5
                    -top-0.5
                    h-2 w-2
                    rounded-full
                    bg-rose-300/80
                    shadow-[0_0_10px_rgba(251,113,133,0.35)]
                  "
                />
              </div>

            {/* User information */}
            <div
              className={`
                min-w-0 flex-1 text-left
                ${collapsed ? 'md:hidden' : ''}
              `}
            >
              <div className="truncate text-sm font-medium text-neutral-300">
                {userEmail}
              </div>

              <div className="mt-0.5 text-[9px] text-neutral-600">
                Account
              </div>
            </div>

            {/* Menu indicator */}
            {!collapsed && (
              <span className="text-xs text-neutral-700">
                ⋯
              </span>
            )}
          </button>

          {/* Account Menu */}
          {menuOpen && (
            <AccountMenu
              userEmail={userEmail}
              incognito={incognito}
              onToggleIncognito={onToggleIncognito}
              theme={theme}
              onSetTheme={onSetTheme}
              settings={settings}
              onSetLanguage={onSetLanguage}
              onOpenFullSettings={() => {
                setMenuOpen(false)
                onOpenFullSettings()
              }}
              onSignOut={onSignOut}
            />
          )}
        </div>
      </aside>
    </>
  )
}