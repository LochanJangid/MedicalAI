import { supabase } from '../../lib/supabaseClient'

export default function GoogleLoginButton() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/chat` },
    })
    if (error) console.error('Google login failed:', error.message)
  }

  return (
    <button
      onClick={handleLogin}
      className="w-full flex items-center justify-center gap-2 rounded-xl bg-white text-neutral-900 px-4 py-2.5 text-sm font-medium hover:bg-gray-100 transition-colors shadow-lg shadow-cyan-500/10"
    >
      <svg width="18" height="18" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.9 32.6 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.1 5.1 29.3 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.7-.4-4z"/>
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.1 5.1 29.3 3 24 3c-7.5 0-14 4.1-17.7 10.7z"/>
        <path fill="#4CAF50" d="M24 45c5.2 0 10-2 13.6-5.3l-6.3-5.2C29.3 36.6 26.8 37.5 24 37.5c-5.3 0-9.8-3.4-11.4-8.1l-6.5 5C9.9 40.8 16.4 45 24 45z"/>
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.4 5.6-6.4 7.1l6.3 5.2C38.9 37.4 43 31.6 43 24c0-1.4-.1-2.7-.4-4z"/>
      </svg>
      Sign in with Google
    </button>
  )
}