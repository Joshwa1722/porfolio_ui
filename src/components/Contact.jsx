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
    <section id="contact" className="py-20 md:py-28 bg-slate-50">
      <div className="container-main" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-sm font-medium text-blue-600 mb-2">Contact</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-3">Get in touch</h2>
          <p className="text-slate-500 max-w-md">Have a project in mind? Let's work together.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              required
              placeholder="Name"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
            />
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
            />
            <textarea
              required
              rows={4}
              placeholder="Message"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all resize-none"
            />
            <button
              type="submit"
              className="w-full py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              {submitted ? 'Sent!' : 'Send Message'}
            </button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
              <p className="text-sm text-slate-500">joshwa@example.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Location</h3>
              <p className="text-sm text-slate-500">India</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Socials</h3>
              <div className="flex gap-3">
                <a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors underline underline-offset-2">LinkedIn</a>
                <a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors underline underline-offset-2">GitHub</a>
                <a href="mailto:joshwa@example.com" className="text-sm text-slate-500 hover:text-blue-600 transition-colors underline underline-offset-2">Email</a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-400">Built by Joshwa &mdash; {new Date().getFullYear()}</p>
        </div>
      </div>
    </section>
  )
}
