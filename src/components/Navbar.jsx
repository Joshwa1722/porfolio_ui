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

  return (
    <motion.nav
      initial={isSSR ? false : { y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-strong shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="container-main flex items-center justify-between h-16 md:h-18">
        <a href="#home" className="font-heading text-xl font-bold text-[var(--text-heading)]">
          Joshwa<span className="gradient-text text-2xl">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm text-[var(--text-body)] hover:text-[var(--text-heading)] transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-orange-500 after:to-pink-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
          <ThemeToggle />
          <a
            href="#contact"
            className="text-sm font-semibold text-white px-5 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 transition-all duration-300 shadow-md shadow-orange-500/15 hover:shadow-lg hover:shadow-orange-500/25"
          >
            Hire Me
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 cursor-pointer"
          aria-label="Menu"
        >
          <div className="space-y-1.5">
            <span className={`block w-5 h-0.5 bg-[var(--text-subtle)] transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[var(--text-subtle)] transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[var(--text-subtle)] transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Gradient bottom line when scrolled */}
      {scrolled && (
        <div className="h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden glass-strong"
          >
            <div className="container-main flex flex-col gap-1 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-[var(--text-body)] hover:text-[var(--text-heading)] py-2.5 px-3 rounded-lg hover:bg-[var(--hover-bg)] transition-all"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex items-center gap-3 px-3 py-2">
                <ThemeToggle />
              </div>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 px-5 py-2.5 rounded-lg text-center mt-2"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
