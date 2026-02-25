import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useIsSSR } from '../context/SSRContext'

const skills = ['React & Remix', 'JavaScript (ES6+)', 'REST API Integration', 'NLQ & AI', 'Pixel-Perfect UI']

export default function Hero() {
  const isSSR = useIsSSR()
  const [displayText, setDisplayText] = useState('')
  const [skillIndex, setSkillIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const skill = skills[skillIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(skill.substring(0, displayText.length + 1))
          if (displayText === skill) {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          setDisplayText(skill.substring(0, displayText.length - 1))
          if (displayText === '') {
            setIsDeleting(false)
            setSkillIndex((prev) => (prev + 1) % skills.length)
          }
        }
      },
      isDeleting ? 40 : 80
    )
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, skillIndex])

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Hero gradient accent */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-orange-500/[0.04] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="container-main relative">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16 lg:gap-8">

          {/* Left: Text content */}
          <div className="max-w-3xl flex-1 pt-8 lg:pt-16">
            {/* Status badge */}
            <motion.div
              initial={isSSR ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 glass rounded-full px-5 py-2.5 mb-10"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              <span className="text-sm text-[var(--text-body)]">Available for work</span>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={isSSR ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-xl md:text-2xl text-[var(--text-body)] mb-3 font-light">Hey, I'm</p>
              <h1 className="font-heading text-7xl sm:text-8xl md:text-[9rem] lg:text-[10rem] font-bold leading-[0.9] tracking-tight mb-2">
                <span className="gradient-text" style={{ filter: 'drop-shadow(0 0 40px rgba(249,115,22,0.2))' }}>
                  Joshwa
                </span>
                <span className="gradient-text">.</span>
              </h1>
            </motion.div>

            {/* Subtitle line with accent */}
            <motion.div
              initial={isSSR ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex items-center gap-5 mt-6 mb-4"
            >
              <div className="w-12 h-[2px] bg-gradient-to-r from-orange-500 to-pink-500 rounded-full" />
              <p className="text-lg md:text-xl text-[var(--text-subtle)] font-light tracking-wide">
                Frontend Developer at Skillmine Technology
              </p>
            </motion.div>

            {/* Typing effect */}
            <motion.div
              initial={isSSR ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mb-12"
            >
              <span className="font-mono text-base text-orange-400/70">
                &gt; {displayText}
              </span>
              <span className="typing-cursor" />
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={isSSR ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="group flex items-center gap-3 px-8 py-4 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-105"
              >
                View Projects
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="#contact"
                className="px-8 py-4 text-sm font-medium text-[var(--text-subtle)] rounded-full glass hover:bg-[var(--surface-bg)] hover:text-[var(--text-heading)] hover:border-orange-500/25 transition-all duration-300 hover:scale-105"
              >
                Contact Me
              </a>
            </motion.div>
          </div>

          {/* Right: Profile image */}
          <motion.div
            initial={isSSR ? false : { opacity: 0, scale: 0.85, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-shrink-0 mt-12"
          >
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-orange-500/20 via-pink-500/15 to-purple-500/20 blur-2xl" />

              {/* Gradient border frame */}
              <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 opacity-50" />

              {/* Image container */}
              <div className="relative w-72 h-[22rem] xl:w-80 xl:h-[25rem] rounded-3xl overflow-hidden">
                <img
                  src="/profile.jpg"
                  alt="Joshwa"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '60% 15%' }}
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>

              {/* Decorative orbiting dots */}
              <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full border border-orange-500/40 bg-orange-500/10 backdrop-blur-sm" />
              <div className="absolute -bottom-3 -left-3 w-4 h-4 rounded-full border border-pink-500/40 bg-pink-500/10 backdrop-blur-sm" />
              <div className="absolute top-1/2 -right-5 w-3 h-3 rounded-full bg-purple-500/30" />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={isSSR ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 scroll-indicator"
        >
          <span className="text-[10px] text-[var(--text-muted)] tracking-[0.3em] uppercase font-mono">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-orange-500/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
