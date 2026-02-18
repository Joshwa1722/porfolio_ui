import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY })
    const handleScroll = () => setShowTop(window.scrollY > 500)
    window.addEventListener('mousemove', handleMouse)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div className="gradient-bg" />

      {/* Cursor glow */}
      <div
        className="fixed w-[400px] h-[400px] rounded-full pointer-events-none z-0 hidden md:block"
        style={{
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          background: 'radial-gradient(circle, rgba(249,115,22,0.05) 0%, rgba(236,72,153,0.03) 40%, transparent 70%)',
        }}
      />

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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full glass-strong flex items-center justify-center cursor-pointer hover:border-orange-500/30 transition-all group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-400 group-hover:text-orange-400 transition-colors">
              <path fillRule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z" clipRule="evenodd" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
