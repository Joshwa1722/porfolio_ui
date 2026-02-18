import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container-main" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-sm font-medium text-orange-400 mb-3 tracking-wider uppercase">Contact</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">Get in touch</h2>
          <div className="section-line mb-4" />
          <p className="text-slate-400 max-w-md text-lg">Have a project in mind? Let's work together.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              required
              placeholder="Name"
              className="w-full px-5 py-3.5 rounded-xl glass text-white placeholder-slate-500 outline-none input-glow"
            />
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full px-5 py-3.5 rounded-xl glass text-white placeholder-slate-500 outline-none input-glow"
            />
            <textarea
              required
              rows={4}
              placeholder="Message"
              className="w-full px-5 py-3.5 rounded-xl glass text-white placeholder-slate-500 outline-none input-glow resize-none"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3.5 text-sm font-medium text-white rounded-xl cursor-pointer transition-all duration-500 ${
                submitted
                  ? 'bg-green-600 shadow-lg shadow-green-500/25'
                  : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 hover:shadow-lg hover:shadow-orange-500/25'
              }`}
            >
              {submitted ? 'Sent!' : 'Send Message'}
            </motion.button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass rounded-xl p-5 glow-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                    <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Email</h3>
                  <p className="text-sm text-slate-400">joshwa@example.com</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-5 glow-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Location</h3>
                  <p className="text-sm text-slate-400">India</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">Socials</h3>
              <div className="flex gap-3">
                {[
                  {
                    label: 'LinkedIn',
                    href: '#',
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
                      </svg>
                    ),
                  },
                  {
                    label: 'GitHub',
                    href: '#',
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
                      </svg>
                    ),
                  },
                  {
                    label: 'Email',
                    href: 'mailto:joshwa@example.com',
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                        <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
                      </svg>
                    ),
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-12 h-12 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-orange-400 hover:bg-white/[0.06] hover:border-orange-500/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/10"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-white/[0.06] text-center">
          <p className="text-sm text-slate-500">
            Designed & built by <span className="text-slate-400">Joshwa</span> &mdash; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  )
}
