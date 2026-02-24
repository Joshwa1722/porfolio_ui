import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useIsSSR } from '../context/SSRContext'

const projects = [
  {
    title: 'Product Management System',
    description: 'Dashboard with CRUD operations, filtering, pagination, and real-time data updates.',
    tech: ['React', 'REST API', 'React Hook Form'],
    gradient: 'from-orange-600/40 to-pink-600/40',
    accent: 'orange',
  },
  {
    title: 'CRM — Manage User & Plant',
    description: 'CRM modules with role-based access, dynamic forms, and data management.',
    tech: ['React', 'CRM', 'RBAC'],
    gradient: 'from-pink-600/40 to-purple-600/40',
    accent: 'pink',
  },
  {
    title: 'Connector Integrations',
    description: 'Third-party integrations for Hrone and Max Healthcare with automated data sync.',
    tech: ['API', 'Hrone', 'Max Healthcare'],
    gradient: 'from-purple-600/40 to-orange-600/40',
    accent: 'purple',
  },
  {
    title: 'NLQ AI Loader',
    description: 'Natural Language Query integration with AI-powered search and data retrieval.',
    tech: ['NLQ', 'AI', 'React'],
    gradient: 'from-orange-600/40 to-red-600/40',
    accent: 'orange',
  },
]

const accentMap = {
  orange: {
    badge: 'bg-orange-500/15 text-orange-300',
    line: 'bg-gradient-to-r from-orange-500 to-pink-500',
  },
  pink: {
    badge: 'bg-pink-500/15 text-pink-300',
    line: 'bg-gradient-to-r from-pink-500 to-purple-500',
  },
  purple: {
    badge: 'bg-purple-500/15 text-purple-300',
    line: 'bg-gradient-to-r from-purple-500 to-orange-500',
  },
}

export default function Projects() {
  const isSSR = useIsSSR()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      {/* Decorative orbs */}
      <div className="absolute top-[10%] -right-32 w-[400px] h-[400px] rounded-full bg-purple-500/[0.03] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] -left-32 w-[400px] h-[400px] rounded-full bg-orange-500/[0.03] blur-[100px] pointer-events-none" />

      <div className="container-main" ref={ref}>
        <motion.div
          initial={isSSR ? false : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-sm font-medium text-orange-400 mb-3 tracking-wider uppercase">Projects</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-heading)] mb-2">What I've built</h2>
          <div className="section-line" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => {
            const colors = accentMap[p.accent]
            const num = String(i + 1).padStart(2, '0')
            return (
              <motion.div
                key={p.title}
                initial={isSSR ? false : { opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass rounded-2xl overflow-hidden glow-card group"
              >
                {/* Gradient preview */}
                <div className={`h-48 bg-gradient-to-br ${p.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]" />
                  <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }} />
                  {/* Number watermark */}
                  <span className="absolute bottom-3 right-4 text-6xl font-bold text-white/[0.06] font-heading select-none">{num}</span>
                </div>

                {/* Full-width accent separator */}
                <div className={`h-[2px] ${colors.line}`} />

                <div className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-[var(--text-heading)] mb-2 group-hover:text-orange-300 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[var(--text-body)] leading-relaxed mb-5">{p.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tech.map((t) => (
                      <span key={t} className={`text-xs font-medium px-2.5 py-1 rounded-lg ${colors.badge}`}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="flex items-center gap-2 text-sm font-semibold text-white px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500/80 to-pink-500/80 hover:from-orange-500 hover:to-pink-500 transition-all cursor-pointer hover:shadow-lg hover:shadow-orange-500/20"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
                      </svg>
                      GitHub
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-sm font-medium text-[var(--text-subtle)] px-4 py-2 rounded-lg border border-[var(--border-subtle)] hover:text-[var(--text-heading)] hover:bg-[var(--hover-bg)] hover:border-orange-500/20 transition-all cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Zm7.47-.53a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M13 3.75A.75.75 0 0 1 13.75 3h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V4.5h-3.75A.75.75 0 0 1 13 3.75Z" clipRule="evenodd" />
                      </svg>
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
