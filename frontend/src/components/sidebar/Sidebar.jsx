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
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const initial = userEmail?.[0]?.toUpperCase() || '?'

  return (
    <div
      className={`flex flex-col h-screen shrink-0 bg-gray-50 dark:bg-neutral-950 border-r border-gray-200 dark:border-neutral-800 transition-all duration-200 p-3
        ${collapsed ? 'w-16' : 'w-64'}`}
    >
      <div className="flex items-center justify-between mb-4">
        {!collapsed && <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">MedicalAI</span>}
        <button
          onClick={onToggleCollapsed}
          className="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-neutral-800"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <line x1="9" y1="4" x2="9" y2="20" />
          </svg>
        </button>
      </div>

      <button
        onClick={onNewChat}
        className={`flex items-center gap-2 rounded-lg border border-gray-200 dark:border-neutral-700 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800 mb-3
          ${collapsed ? 'justify-center px-2' : ''}`}
      >
        <span className="text-base leading-none">+</span>
        {!collapsed && <span>New chat</span>}
      </button>

      {!collapsed && (
        <div className="flex-1 overflow-y-auto space-y-0.5">
          {conversations.length === 0 && (
            <div className="text-xs text-gray-400 dark:text-gray-500 px-2 py-1">No conversations yet</div>
          )}
          {conversations.map((c) => (
            <div
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`group flex items-center justify-between rounded-lg px-2 py-1.5 text-sm cursor-pointer
                ${c.id === activeId
                  ? 'bg-gray-200 dark:bg-neutral-800 font-medium text-gray-900 dark:text-gray-100'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800/60'}`}
            >
              <span className="truncate">{c.title}</span>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(c.id) }}
                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 px-1"
                aria-label="Delete conversation"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      {collapsed && <div className="flex-1" />}

      <div className="relative mt-2" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className={`w-full flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800
            ${collapsed ? 'justify-center' : ''}`}
        >
          <div className="h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold shrink-0">
            {initial}
          </div>
          {!collapsed && (
            <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{userEmail}</span>
          )}
        </button>

        {menuOpen && (
          <AccountMenu
            userEmail={userEmail}
            incognito={incognito}
            onToggleIncognito={onToggleIncognito}
            theme={theme}
            onSetTheme={onSetTheme}
            settings={settings}
            onSetLanguage={onSetLanguage}
            onOpenFullSettings={() => { setMenuOpen(false); onOpenFullSettings() }}
            onSignOut={onSignOut}
          />
        )}
      </div>
    </div>
  )
}