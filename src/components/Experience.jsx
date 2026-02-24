import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useIsSSR } from '../context/SSRContext'

const timeline = [
  {
    year: '2024',
    title: 'NLQ & AI Integration',
    desc: 'Integrated NLQ with AI-powered loader for intelligent data retrieval in enterprise apps.',
  },
  {
    year: '2024',
    title: 'Connector Development',
    desc: 'Built Hrone & Max Healthcare connector integrations for seamless data synchronization.',
  },
  {
    year: '2023-24',
    title: 'CRM Module Development',
    desc: 'Developed Manage User & Manage Plant modules with RBAC and dynamic forms.',
  },
  {
    year: '2023',
    title: 'Learning & MCA',
    desc: 'Completed MCA and gained hands-on experience with React, APIs, and frontend development.',
  },
]

export default function Experience() {
  const isSSR = useIsSSR()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="py-24 md:py-32 relative">
      {/* Decorative orb */}
      <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] rounded-full bg-pink-500/[0.03] blur-[100px] pointer-events-none" />

      <div className="container-main" ref={ref}>
        <motion.div
          initial={isSSR ? false : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-sm font-medium text-orange-400 mb-3 tracking-wider uppercase">Experience</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-heading)] mb-2">My journey</h2>
          <div className="section-line" />
        </motion.div>

        <div className="max-w-2xl relative">
          {/* Timeline gradient line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-[3px] bg-gradient-to-b from-orange-500/55 via-pink-500/55 to-purple-500/55 rounded-full" />

          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={isSSR ? false : { opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative pl-10 pb-10 last:pb-0 group"
            >
              {/* Glowing dot */}
              <div className="absolute left-0 top-1.5">
                <div className="w-4 h-4 rounded-full bg-[var(--bg-body)] border-2 border-orange-500/70 group-hover:border-orange-400 group-hover:shadow-[0_0_12px_rgba(249,115,22,0.4)] transition-all relative">
                  <div className="absolute inset-0 rounded-full bg-orange-500/20 animate-ping" style={{ animationDuration: '3s' }} />
                </div>
              </div>

              <div className="glass rounded-xl overflow-hidden glow-card">
                <div className="h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500" />
                <div className="p-5">
                  <span className="inline-block text-xs font-mono font-medium text-orange-400 bg-orange-500/10 px-3 py-1 rounded-md mb-3 border-l-2 border-orange-500/50">
                    {item.year}
                  </span>
                  <h3 className="font-semibold text-[var(--text-heading)] mb-1.5 text-lg">{item.title}</h3>
                  <p className="text-sm text-[var(--text-body)] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
