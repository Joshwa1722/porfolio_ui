import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-main flex items-center justify-between h-16">
        <a href="#home" className="font-heading text-xl font-bold text-slate-900">
          Joshwa<span className="text-blue-600">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#contact" className="text-sm font-medium text-white bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Hire Me
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 cursor-pointer" aria-label="Menu">
          <div className="space-y-1.5">
            <span className={`block w-5 h-0.5 bg-slate-700 transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-slate-700 transition-all ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-slate-700 transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 py-4">
          <div className="container-main flex flex-col gap-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-slate-600 py-1.5">
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="text-sm font-medium text-white bg-blue-600 px-5 py-2 rounded-lg text-center mt-2">
              Hire Me
            </a>
          </div>
        </div>
      )}
    </motion.nav>
  )
}
