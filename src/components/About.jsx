import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useIsSSR } from '../context/SSRContext'
import { SITE, FADE_UP, FADE_IN, SECTION_TRANSITION, ITEM_TRANSITION, STAGGER_DELAY, CLS } from '../lib/constants'

const highlights = [
  {
    title: 'MCA Graduate',
    desc: 'Master of Computer Application from Ayya Nadar Janaki Ammal College, MKU.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: 'orange',
  },
  {
    title: 'React & Remix',
    desc: 'Building production apps with React Vite & Remix at Skillmine Technology.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <circle cx="12" cy="12" r="2.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    ),
    color: 'pink',
  },
  {
    title: 'Backend Dev',
    desc: 'Building server-side applications and APIs with Node.js, Express.js & Python.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: 'purple',
  },
  {
    title: 'Production Lead',
    desc: 'Leading production bug fixes and feature development in Agile sprints.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: 'orange',
  },
]

const colorMap = {
  orange: {
    iconBg: 'from-orange-500/15 to-orange-500/5',
    iconText: 'text-orange-400',
    ring: 'ring-orange-500/15',
    hoverBorder: 'group-hover:border-orange-500/30',
  },
  pink: {
    iconBg: 'from-pink-500/15 to-pink-500/5',
    iconText: 'text-pink-400',
    ring: 'ring-pink-500/15',
    hoverBorder: 'group-hover:border-pink-500/30',
  },
  purple: {
    iconBg: 'from-purple-500/15 to-purple-500/5',
    iconText: 'text-purple-400',
    ring: 'ring-purple-500/15',
    hoverBorder: 'group-hover:border-purple-500/30',
  },
}

export default function About() {
  const isSSR = useIsSSR()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className={CLS.sectionPadding}>
      <div className="container-main" ref={ref}>
        <motion.div
          initial={isSSR ? false : FADE_UP}
          animate={inView ? FADE_IN : {}}
          transition={SECTION_TRANSITION}
          className="mb-16"
        >
          <span className={CLS.sectionLabel}>// about</span>
          <h2 className={CLS.sectionHeading}>
            A bit about<br />
            <span className="gradient-text">me</span>.
          </h2>
          <div className={CLS.sectionLine} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <motion.div
            initial={isSSR ? false : FADE_UP}
            animate={inView ? FADE_IN : {}}
            transition={{ ...ITEM_TRANSITION, delay: 0.1 }}
            className={`md:col-span-2 ${CLS.glassCard} rounded-2xl p-8`}
          >
            <p className="text-[var(--text-body)] text-lg leading-relaxed">
              I'm a {SITE.title} currently focused on frontend at Skillmine Technology, with 2+ years of
              professional experience building modern, responsive applications with React, Remix & Vite.
              I lead production bug fixes, feature development, and collaborate with design teams for pixel-perfect interfaces.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <div className="w-8 h-[1px] bg-gradient-to-r from-orange-500 to-transparent" />
              <span className="text-sm text-[var(--text-muted)] font-mono">Based in {SITE.location}</span>
            </div>
          </motion.div>

          <motion.div
            initial={isSSR ? false : FADE_UP}
            animate={inView ? FADE_IN : {}}
            transition={{ ...ITEM_TRANSITION, delay: 0.2 }}
            className="glass rounded-2xl p-8 flex flex-col justify-center items-center text-center glow-card"
          >
            <span className="text-6xl font-heading font-bold gradient-text leading-none">2+</span>
            <span className="text-sm text-[var(--text-body)] mt-3">Years of</span>
            <span className="text-sm text-[var(--text-heading)] font-medium">Experience</span>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent mt-4 mb-4" />
            <span className="text-4xl font-heading font-bold gradient-text leading-none">10+</span>
            <span className="text-sm text-[var(--text-body)] mt-2">Projects Built</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((card, i) => {
            const colors = colorMap[card.color]
            return (
              <motion.div
                key={card.title}
                initial={isSSR ? false : FADE_UP}
                animate={inView ? FADE_IN : {}}
                transition={{ ...ITEM_TRANSITION, delay: 0.3 + STAGGER_DELAY(i) }}
                className={`${CLS.glassCard} rounded-2xl p-6 group cursor-default ${colors.hoverBorder}`}
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${colors.iconBg} ring-1 ${colors.ring} flex items-center justify-center ${colors.iconText} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>
                <h3 className="font-semibold text-[var(--text-heading)] mb-1.5">{card.title}</h3>
                <p className="text-sm text-[var(--text-body)] leading-relaxed">{card.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
