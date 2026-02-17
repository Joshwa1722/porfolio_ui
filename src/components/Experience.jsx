import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

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
    year: '2023–24',
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
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="py-20 md:py-28">
      <div className="container-main" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-sm font-medium text-blue-600 mb-2">Experience</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">My journey</h2>
        </motion.div>

        <div className="max-w-2xl">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative pl-8 pb-8 last:pb-0 border-l-2 border-slate-100 last:border-transparent"
            >
              {/* Dot */}
              <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-blue-600" />

              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{item.year}</span>
              <h3 className="font-semibold text-slate-900 mt-2 mb-1">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
