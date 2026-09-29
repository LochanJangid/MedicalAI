import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mt-1"
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

const markdownComponents = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  ul: ({ children }) => <ul className="list-disc pl-5 mb-2 space-y-0.5">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-5 mb-2 space-y-0.5">{children}</ol>,
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  code: ({ children }) => (
    <code className="px-1 py-0.5 rounded bg-black/10 dark:bg-white/10 text-[0.85em]">{children}</code>
  ),
}

export default function MessageBubble({ role, content, timestamp, forceDark }) {
  const isUser = role === 'user'
  const assistantClasses = forceDark
    ? 'bg-neutral-800 text-gray-100'
    : 'bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-gray-100'

  const time = timestamp
    ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : null

  return (
    <div className={`group flex flex-col my-2 animate-[fadeIn_0.25s_ease-out] ${isUser ? 'items-end' : 'items-start'}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed
          ${isUser ? 'bg-blue-600 text-white' : assistantClasses}`}
      >
        {isUser ? content : <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>}
      </div>
      <div className="flex items-center gap-2 px-1">
        {time && <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">{time}</span>}
        {!isUser && content !== 'Typing...' && <CopyButton text={content} />}
      </div>
    </div>
  )
}