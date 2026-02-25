import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useIsSSR } from '../context/SSRContext'
import { FADE_UP, FADE_UP_SLOW, FADE_IN, SECTION_TRANSITION, STAGGER_DELAY, CLS } from '../lib/constants'

const projects = [
  {
    title: 'FCS Admin UI',
    description: 'Web-based admin dashboard for a US-based debt collection agency. Manages debtors, creditors, payments, workflows, and communications with role-based access control and real-time analytics.',
    tech: ['React Remix', 'RBAC', 'Analytics', 'REST API'],
    image: '/project-fcs.jpg',
    accent: 'orange',
  },
  {
    title: 'DataVUI',
    description: 'Data visualization platform where users connect to databases, create interactive charts, organize customizable drag-and-drop dashboards, and set up alerts for data conditions.',
    tech: ['React', 'Data Viz', 'Drag & Drop', 'Charts'],
    image: '/project-datavui.jpg',
    accent: 'pink',
  },
  {
    title: 'CKYC Platform',
    description: 'Centralized KYC registry for financial institutions to securely store, validate, and retrieve customer identity records with compliance management and API integrations.',
    tech: ['React', 'KYC', 'Compliance', 'API'],
    image: '/project-ckyc.jpg',
    accent: 'purple',
  },
  {
    title: 'E-Commerce Platforms',
    description: 'Scalable e-commerce apps (Meditech & Marketplace Coffee) with product listing, filtering, cart/wishlist, checkout workflows, and secure REST API integrations.',
    tech: ['React', 'E-Commerce', 'State Mgmt', 'REST API'],
    image: '/project-ecommerce.jpg',
    accent: 'orange',
  },
]

const accentStyles = {
  orange: {
    badge: 'bg-orange-500/10 text-orange-300 border border-orange-500/15',
    num: 'text-white/[0.08]',
    dot: 'bg-orange-500',
    overlay: 'from-orange-950/60 via-transparent to-transparent',
  },
  pink: {
    badge: 'bg-pink-500/10 text-pink-300 border border-pink-500/15',
    num: 'text-white/[0.08]',
    dot: 'bg-pink-500',
    overlay: 'from-pink-950/60 via-transparent to-transparent',
  },
  purple: {
    badge: 'bg-purple-500/10 text-purple-300 border border-purple-500/15',
    num: 'text-white/[0.08]',
    dot: 'bg-purple-500',
    overlay: 'from-purple-950/60 via-transparent to-transparent',
  },
}

const GITHUB_ICON = 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z'

export default function Projects() {
  const isSSR = useIsSSR()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className={CLS.sectionPadding}>
      <div className="container-main" ref={ref}>
        <motion.div
          initial={isSSR ? false : FADE_UP}
          animate={inView ? FADE_IN : {}}
          transition={SECTION_TRANSITION}
          className="mb-16"
        >
          <span className={CLS.sectionLabel}>// projects</span>
          <h2 className={CLS.sectionHeading}>
            What I've<br />
            <span className="gradient-text">built</span>.
          </h2>
          <div className={CLS.sectionLine} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => {
            const styles = accentStyles[p.accent]
            const num = String(i + 1).padStart(2, '0')
            return (
              <motion.div
                key={p.title}
                initial={isSSR ? false : FADE_UP_SLOW}
                animate={inView ? FADE_IN : {}}
                transition={{ ...SECTION_TRANSITION, delay: STAGGER_DELAY(i, 0.12) }}
                whileHover={{ y: -8 }}
                className={`${CLS.glassCard} overflow-hidden group`}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={208}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${styles.overlay} opacity-60`} />
                  <span className={`absolute bottom-3 right-4 sm:right-5 text-6xl sm:text-8xl font-heading font-bold ${styles.num} select-none`}>
                    {num}
                  </span>
                  <div className="absolute top-4 left-5 flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${styles.dot}`} />
                    <span className="text-xs font-mono text-white/50 uppercase tracking-wider">Project {num}</span>
                  </div>
                </div>

                <div className="p-5 sm:p-7">
                  <h3 className="font-heading font-bold text-xl text-[var(--text-heading)] mb-3 group-hover:text-orange-300 transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[var(--text-body)] leading-relaxed mb-6">{p.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tech.map((t) => (
                      <span key={t} className={`text-xs font-medium px-3 py-1.5 rounded-full ${styles.badge}`}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500/80 to-pink-500/80 hover:from-orange-500 hover:to-pink-500 transition-all hover:shadow-lg hover:shadow-orange-500/20 cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d={GITHUB_ICON} />
                      </svg>
                      GitHub
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-sm font-medium text-[var(--text-subtle)] px-5 py-2.5 rounded-full border border-[var(--border-subtle)] hover:text-[var(--text-heading)] hover:bg-[var(--hover-bg)] hover:border-orange-500/25 transition-all cursor-pointer"
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
