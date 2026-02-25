import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'

function App() {
  const cursorRef = useRef(null)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const el = cursorRef.current
    if (!el) return
    const handleMouse = (e) => {
      el.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div className="gradient-bg" />
      <div className="noise-overlay" />

      {/* Cursor glow — uses ref + transform, no re-renders */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0 hidden md:block will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, rgba(236,72,153,0.03) 40%, transparent 70%)',
        }}
      />

      {/* Decorative gradient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
        <div className="absolute top-[10%] right-[5%] w-[600px] h-[600px] rounded-full bg-orange-500/[0.03] blur-[150px]" />
        <div className="absolute top-[50%] left-[-5%] w-[500px] h-[500px] rounded-full bg-pink-500/[0.03] blur-[150px]" />
        <div className="absolute bottom-[5%] right-[15%] w-[500px] h-[500px] rounded-full bg-purple-500/[0.02] blur-[150px]" />
      </div>

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full glass-strong flex items-center justify-center cursor-pointer hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/20 transition-all group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[var(--text-body)] group-hover:text-orange-400 transition-colors">
              <path fillRule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z" clipRule="evenodd" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
