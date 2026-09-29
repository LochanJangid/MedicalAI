import { useState } from 'react'

export default function ChatInput({
  onSend,
  disabled,
  placeholder,
  forceDark,
}) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!text.trim() || disabled) return

    onSend(text.trim())
    setText('')
  }

  const wrapperClasses = forceDark
    ? `
      group
      flex
      items-center
      gap-2
      rounded-[20px]
      border border-white/[0.08]
      bg-[#151217]/95
      px-2
      py-2
      shadow-[0_18px_50px_rgba(0,0,0,0.35)]
      backdrop-blur-2xl
      transition-all duration-300
      focus-within:border-rose-200/[0.16]
      focus-within:bg-[#18141a]/95
      focus-within:shadow-[0_18px_60px_rgba(0,0,0,0.45)]
    `
    : `
      flex
      items-center
      gap-2
      rounded-[20px]
      border border-gray-200
      bg-gray-50
      px-2
      py-2
      dark:border-white/[0.08]
      dark:bg-[#151217]/95
      dark:backdrop-blur-2xl
      dark:focus-within:border-rose-200/[0.16]
    `

  const inputClasses = forceDark
    ? `
      min-w-0
      flex-1
      bg-transparent
      px-2
      py-2.5
      text-sm
      text-white
      outline-none
      placeholder:text-neutral-600
    `
    : `
      min-w-0
      flex-1
      bg-transparent
      px-2
      py-2.5
      text-sm
      text-gray-900
      outline-none
      placeholder:text-gray-400
      dark:text-white
      dark:placeholder:text-neutral-600
    `

  return (
    <form
      onSubmit={handleSubmit}
      className={wrapperClasses}
    >
      {/* Love / medical accent */}
      <div
        className="
          ml-1
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-xl
          border border-rose-200/[0.08]
          bg-rose-200/[0.035]
          text-sm
          text-rose-300/70
          transition-all duration-300
          group-focus-within:border-rose-200/[0.14]
          group-focus-within:bg-rose-200/[0.055]
          group-focus-within:text-rose-300
        "
      >
        ♡
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          placeholder || "Describe how you're feeling..."
        }
        className={inputClasses}
        disabled={disabled}
        autoComplete="off"
      />

      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="
          flex
          h-9
          shrink-0
          items-center
          justify-center
          gap-1.5
          rounded-xl
          bg-[#fffaf7]
          px-3.5
          text-xs
          font-semibold
          text-[#171318]
          shadow-lg
          shadow-black/10
          transition-all duration-300
          hover:-translate-y-0.5
          hover:shadow-xl
          hover:shadow-rose-500/[0.10]
          disabled:cursor-not-allowed
          disabled:opacity-40
          disabled:hover:translate-y-0
        "
      >
        {disabled ? (
          <span
            className="
              h-3.5
              w-3.5
              animate-spin
              rounded-full
              border-2
              border-[#171318]/20
              border-t-[#171318]
            "
          />
        ) : (
          <>
            <span>Send</span>

            <span className="text-sm">
              →
            </span>
          </>
        )}
      </button>
    </form>
  )
}