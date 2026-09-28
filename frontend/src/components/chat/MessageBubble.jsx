export default function MessageBubble({ role, content, forceDark }) {
  const isUser = role === 'user'
  const assistantClasses = forceDark
    ? 'bg-neutral-800 text-gray-100'
    : 'bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-gray-100'

  return (
    <div className={`flex my-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed
          ${isUser ? 'bg-blue-600 text-white' : assistantClasses}`}
      >
        {content}
      </div>
    </div>
  )
}