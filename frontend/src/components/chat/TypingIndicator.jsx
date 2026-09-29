export default function TypingIndicator({ forceDark }) {
  const bg = forceDark ? 'bg-neutral-800' : 'bg-gray-100 dark:bg-neutral-800'
  const dot = forceDark ? 'bg-gray-400' : 'bg-gray-400 dark:bg-gray-500'

  return (
    <div className="flex justify-start my-2">
      <div className={`flex items-center gap-1 rounded-2xl px-4 py-3 ${bg}`}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full ${dot} animate-bounce`}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  )
}