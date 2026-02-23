import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsSSR } from '../context/SSRContext'

const skills = ['React.js', 'JavaScript', 'API Integration', 'AI & NLQ', 'UI/UX Design']

const floatingIcons = [
  {
    label: 'React',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <circle cx="12" cy="12" r="2.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    ),
    style: { top: '15%', right: '10%' },
    duration: 6,
    delay: 0,
  },
  {
    label: 'JS',
    svg: <span className="font-mono font-bold text-lg">JS</span>,
    style: { top: '55%', right: '5%' },
    duration: 7,
    delay: 1,
  },
  {
    label: 'API',
    svg: <span className="font-mono font-bold text-base">{'{ }'}</span>,
    style: { top: '35%', right: '18%' },
    duration: 5,
    delay: 0.5,
  },
  {
    label: 'AI',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
        <path d="M8 14s-4 2-4 6h16c0-4-4-6-4-6" />
        <circle cx="9" cy="7" r="0.5" fill="currentColor" />
        <circle cx="15" cy="7" r="0.5" fill="currentColor" />
      </svg>
    ),
    style: { top: '70%', right: '15%' },
    duration: 8,
    delay: 1.5,
  },
]

export default function Hero() {
  const isSSR = useIsSSR()
  const [views, setViews] = useState(null)
  const [displayText, setDisplayText] = useState('')
  const [skillIndex, setSkillIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3001/api/views', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setViews(data.views))
      .catch(() => {})
  }, [])

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
      {/* Floating tech icons */}
      <div className="hidden lg:block">
        {floatingIcons.map((icon) => (
          <motion.div
            key={icon.label}
            className="absolute text-orange-400/20"
            style={icon.style}
            animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
            transition={{
              duration: icon.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: icon.delay,
            }}
          >
            <div className="glass rounded-2xl p-4 hover:text-orange-400/40 transition-colors">
              {icon.svg}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="container-main">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        <div className="max-w-3xl flex-1">
          {/* Status badge */}
          <motion.div
            initial={isSSR ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="flex items-center gap-2 glass rounded-full px-4 py-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
              </span>
              <span className="text-sm text-slate-400">Available for work</span>
            </div>
            <AnimatePresence>
              {views !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1.5 glass rounded-full px-3 py-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-orange-400">
                    <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs text-slate-500">{views}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={isSSR ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-4"
          >
            Hi, I'm{' '}
            <span className="gradient-text">Joshwa</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={isSSR ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-400 mb-2"
          >
            Full Stack Developer | React Specialist
          </motion.p>

          {/* Typing effect */}
          <motion.div
            initial={isSSR ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-10"
          >
            <span className="font-mono text-lg text-orange-400/80">
              {displayText}
            </span>
            <span className="typing-cursor" />
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={isSSR ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="px-8 py-3.5 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/25 hover:scale-105"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 text-sm font-medium text-slate-300 rounded-xl glass hover:bg-white/[0.06] hover:text-white hover:border-orange-500/30 transition-all duration-300 hover:scale-105"
            >
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Profile image */}
        <motion.div
          initial={isSSR ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:flex flex-shrink-0"
        >
          <div className="relative">
            {/* Glow ring behind image */}
            <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-purple-500/20 blur-xl" />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 opacity-60" />
            <div className="relative w-80 h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-2 border-white/10">
              <img
                src="/profile.jpg"
                alt="Joshwa"
                className="w-full h-full object-cover"
                style={{ objectPosition: '60% 15%' }}
              />
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  )
}
