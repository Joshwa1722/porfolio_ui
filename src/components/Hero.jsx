import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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
      {/* Floating tech icons */}
      <div className="hidden lg:block">
        {floatingIcons.map((icon) => (
          <motion.div
            key={icon.label}
            className="absolute text-orange-400/30"
            style={icon.style}
            animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
            transition={{
              duration: icon.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: icon.delay,
            }}
          >
            <div className="glass rounded-2xl p-4 hover:text-orange-400/50 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300">
              {icon.svg}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="container-main">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        <div className="max-w-3xl flex-1">
          {/* Heading */}
          <motion.h1
            initial={isSSR ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-4 text-[var(--text-heading)]"
          >
            Hi, I'm{' '}
            <span className="gradient-text" style={{ filter: 'drop-shadow(0 0 30px rgba(249,115,22,0.3))' }}>Joshwa</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={isSSR ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl lg:text-3xl font-light text-[var(--text-subtle)] mb-2"
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
              className="px-10 py-4 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/25 hover:scale-105"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-10 py-4 text-sm font-medium text-[var(--text-subtle)] rounded-xl glass hover:bg-[var(--surface-bg)] hover:text-[var(--text-heading)] hover:border-orange-500/30 hover:shadow-lg transition-all duration-300 hover:scale-105"
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
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-orange-500/30 via-pink-500/30 to-purple-500/30 blur-xl animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 opacity-60" />
            <div className="relative w-80 h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-2 border-[var(--border-subtle)]">
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
