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
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0 hidden md:block"
        style={{
          left: mousePos.x - 250,
          top: mousePos.y - 250,
          background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, rgba(236,72,153,0.04) 40%, transparent 70%)',
        }}
      />

      {/* Decorative gradient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
        <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-orange-500/[0.04] blur-[120px]" />
        <div className="absolute top-[45%] left-[0%] w-[400px] h-[400px] rounded-full bg-pink-500/[0.04] blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] rounded-full bg-purple-500/[0.03] blur-[120px]" />
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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full glass-strong flex items-center justify-center cursor-pointer hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/20 transition-all group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-[var(--text-body)] group-hover:text-orange-400 transition-colors">
              <path fillRule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z" clipRule="evenodd" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
