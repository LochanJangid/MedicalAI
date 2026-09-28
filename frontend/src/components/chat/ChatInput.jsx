import { useState } from 'react'

export default function ChatInput({ onSend, disabled, placeholder, forceDark }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim() || disabled) return
    onSend(text.trim())
    setText('')
  }

  const wrapperClasses = forceDark
    ? 'flex gap-2 rounded-2xl border border-neutral-700 bg-neutral-800 p-2'
    : 'flex gap-2 rounded-2xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 p-2'

  const inputClasses = forceDark
    ? 'flex-1 bg-transparent outline-none text-sm text-gray-100 placeholder-gray-500 px-2 py-1.5'
    : 'flex-1 bg-transparent outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 px-2 py-1.5'

  return (
    <form onSubmit={handleSubmit} className={wrapperClasses}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder || "Describe how you're feeling..."}
        className={inputClasses}
      />
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="px-4 py-1.5 rounded-xl bg-blue-600 text-white text-sm disabled:opacity-50"
      >
        Send
      </button>
    </form>
  )
}