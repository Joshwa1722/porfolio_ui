import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useIsSSR } from '../context/SSRContext'
import { SITE, SOCIALS, FADE_UP, FADE_IN, SECTION_TRANSITION, CLS } from '../lib/constants'

function SocialIcon({ path, viewBox = '0 0 24 24', size = 'w-5 h-5' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} fill="currentColor" className={size}>
      <path d={path} />
    </svg>
  )
}

export default function Contact() {
  const isSSR = useIsSSR()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className={CLS.sectionPadding}>
      <div className="container-main" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 max-w-5xl">

          {/* Left: Bold heading + info */}
          <motion.div
            initial={isSSR ? false : FADE_UP}
            animate={inView ? FADE_IN : {}}
            transition={SECTION_TRANSITION}
          >
            <span className={CLS.sectionLabel}>// contact</span>
            <h2 className="font-heading text-6xl md:text-7xl lg:text-8xl font-bold text-[var(--text-heading)] mt-3 leading-[0.95]">
              Let's<br />
              <span className="gradient-text">Talk</span>.
            </h2>
            <p className="text-[var(--text-body)] text-lg mt-8 max-w-md leading-relaxed">
              Have a project in mind? I'd love to hear about it. Let's build something amazing together.
            </p>

            <div className="mt-10 space-y-4">
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-[var(--text-body)] hover:text-orange-400 transition-colors group">
                <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:border-orange-500/30 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                    <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
                  </svg>
                </div>
                <span className="text-sm">{SITE.email}</span>
              </a>
              <div className="flex items-center gap-3 text-[var(--text-body)]">
                <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm">{SITE.location}</span>
              </div>
            </div>

            <div className="mt-10">
              <p className="text-xs font-mono text-[var(--text-muted)] tracking-wider uppercase mb-4">Follow me</p>
              <div className="flex gap-3">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-11 h-11 rounded-full glass flex items-center justify-center text-[var(--text-body)] hover:text-orange-400 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/10"
                  >
                    <SocialIcon path={social.icon} viewBox={social.viewBox} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={isSSR ? false : FADE_UP}
            animate={inView ? FADE_IN : {}}
            transition={{ ...SECTION_TRANSITION, delay: 0.15 }}
          >
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="relative group">
                <input type="text" required placeholder="Your Name" className="input-underline text-lg" />
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-orange-500 to-pink-500 group-focus-within:w-full transition-all duration-500" />
              </div>
              <div className="relative group">
                <input type="email" required placeholder="Your Email" className="input-underline text-lg" />
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-orange-500 to-pink-500 group-focus-within:w-full transition-all duration-500" />
              </div>
              <div className="relative group">
                <textarea required rows={4} placeholder="Your Message" className="input-underline text-lg resize-none" />
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-orange-500 to-pink-500 group-focus-within:w-full transition-all duration-500" />
              </div>
              <div className="pt-6">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 cursor-pointer transition-all duration-500 rounded-full ${
                    submitted
                      ? 'bg-green-600 shadow-lg shadow-green-500/25 text-sm font-semibold text-white'
                      : CLS.primaryBtn + ' px-8 py-4'
                  }`}
                >
                  {submitted ? 'Message Sent!' : 'Send Message'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-32 pt-8 border-t border-[var(--border-subtle)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <a href="#home" className="font-heading text-xl font-bold text-[var(--text-heading)]">
              J<span className="gradient-text text-2xl font-extrabold">.</span>
            </a>
            <p className="text-sm text-[var(--text-muted)]">
              &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-orange-400 hover:bg-orange-500/5 transition-all"
                >
                  <SocialIcon path={s.icon} viewBox={s.viewBox} size="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
