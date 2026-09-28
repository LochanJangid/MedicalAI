import { Link } from 'react-router-dom'
import GuestChatWindow from '../components/chat/GuestChatWindow'

export default function GuestChat() {
  return (
    <div className="flex h-screen bg-neutral-950">
      <div className="flex-1 min-w-0 flex flex-col h-screen">
        <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-800 shrink-0">
          <span className="flex items-center gap-2 font-semibold text-gray-100">
            <span>🧬</span>
            <span>MedicalAI</span>
          </span>
          <Link
            to="/login"
            className="text-sm px-3 py-1.5 rounded-lg border border-neutral-700 text-gray-200 hover:bg-neutral-800"
          >
            Sign in
          </Link>
        </div>
        <GuestChatWindow />
      </div>
    </div>
  )
}