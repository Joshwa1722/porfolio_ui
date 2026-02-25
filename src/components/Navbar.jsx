import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsSSR } from '../context/SSRContext'
import ThemeToggle from './ThemeToggle'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const isSSR = useIsSSR()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <motion.nav
        initial={isSSR ? false : { y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="container-main flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="font-heading text-2xl font-bold text-[var(--text-heading)] relative z-50">
            J<span className="gradient-text text-3xl font-extrabold">.</span>
          </a>

          {/* Centered pill nav */}
          <div className={`hidden md:flex items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-500 ${
            scrolled ? 'glass-strong shadow-lg shadow-black/20' : 'glass'
          }`}>
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative text-sm text-[var(--text-body)] hover:text-[var(--text-heading)] px-4 py-2 rounded-full hover:bg-[var(--surface-bg)] transition-all duration-300"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <a
              href="#contact"
              className="relative text-sm font-semibold text-white px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 transition-all duration-300 shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 cursor-pointer relative z-50"
            aria-label="Menu"
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-[var(--text-subtle)] transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-[var(--text-subtle)] transition-all duration-300 ${open ? 'opacity-0 scale-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-[var(--text-subtle)] transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Full-screen mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[var(--bg-body)]/95 backdrop-blur-2xl" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="text-4xl font-heading font-bold text-[var(--text-heading)] hover:text-orange-400 transition-colors py-3"
                >
                  {l.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.45 }}
                className="flex items-center gap-4 mt-8"
              >
                <ThemeToggle />
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-3 rounded-full"
                >
                  Let's Talk
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
