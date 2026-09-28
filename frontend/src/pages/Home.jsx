import Header from '../components/home/Header'
import Hero from '../components/home/Hero'
import About from '../components/home/About'
import Footer from '../components/home/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <Header />
      <Hero />
      <About />
      <Footer />
    </div>
  )
}