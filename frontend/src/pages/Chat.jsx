import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useConversations } from '../hooks/useConversations'
import { useSettings } from '../hooks/useSettings'
import { useTheme } from '../hooks/useTheme'
import Sidebar from '../components/sidebar/Sidebar'
import SettingsPanel from '../components/settings/SettingsPanel'
import ChatWindow from '../components/chat/ChatWindow'
import DoctorPanel from '../components/doctors/DoctorPanel'

export default function Chat() {
  const { user, signOut } = useAuth()
  const { conversations, refresh, deleteConversation } = useConversations()
  const { settings, updateSettings } = useSettings()
  const { theme, setTheme } = useTheme()

  const [activeId, setActiveId] = useState(null)
  const [incognito, setIncognito] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([])

  if (!user) return <div className="h-screen flex items-center justify-center text-gray-500">Loading...</div>

  const handleNewChat = () => setActiveId(null)

  const handleSelect = (id) => {
    setIncognito(false)
    setActiveId(id)
  }

  const handleDelete = async (id) => {
    await deleteConversation(id)
    if (id === activeId) setActiveId(null)
  }

  const handleConversationCreated = (id) => {
    setActiveId(id)
    refresh()
  }

  return (
    <div className="flex h-screen bg-white dark:bg-neutral-900">
      <Sidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={handleSelect}
        onNewChat={handleNewChat}
        onDelete={handleDelete}
        collapsed={sidebarCollapsed}
        onToggleCollapsed={() => setSidebarCollapsed((c) => !c)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        userEmail={user.email}
        avatarUrl={user.user_metadata?.avatar_url}
        incognito={incognito}
        onToggleIncognito={() => setIncognito((v) => !v)}
        theme={theme}
        onSetTheme={setTheme}
        settings={settings}
        onSetLanguage={(lang) => updateSettings({ language: lang })}
        onOpenFullSettings={() => setSettingsOpen(true)}
        onSignOut={signOut}
      />

      <div className="flex-1 min-w-0 flex flex-col h-screen">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-200 dark:border-neutral-800 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-1.5 -ml-1.5 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
              aria-label="Open sidebar"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <span className="font-semibold text-gray-900 dark:text-gray-100">MedicalAI</span>
          </div>
          {incognito && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
              🕶 Incognito on
            </span>
          )}
        </div>
        <ChatWindow
          key={activeId || 'new'}
          conversationId={activeId}
          incognito={incognito}
          onConversationCreated={handleConversationCreated}
          onMessagesChange={setChatMessages}
        />
      </div>

      <DoctorPanel messages={chatMessages} />

      {settingsOpen && (
        <SettingsPanel
          settings={settings}
          onUpdateSettings={updateSettings}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </div>
  )
}