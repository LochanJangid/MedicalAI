import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Header from '../components/home/Header'
import Hero from '../components/home/Hero'
import About from '../components/home/About'
import Footer from '../components/home/Footer'

export default function Home() {
  const { user, loading } = useAuth()

  // Covers the case where an OAuth redirect lands on '/' instead of '/chat'
  // (e.g. the exact deployment URL wasn't yet in Supabase's redirect allow-list) —
  // if a session exists, go straight to chat instead of showing the marketing page.
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-gray-400">Loading...</div>
  }
  if (user) return <Navigate to="/chat" replace />

  return (
    <div className="min-h-screen bg-neutral-950">
      <Header />
      <Hero />
      <About />
      <Footer />
    </div>
  )
}