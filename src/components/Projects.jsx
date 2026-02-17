import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const projects = [
  {
    title: 'Product Management System',
    description: 'Dashboard with CRUD operations, filtering, pagination, and real-time data updates.',
    tech: ['React', 'REST API', 'React Hook Form'],
  },
  {
    title: 'CRM — Manage User & Plant',
    description: 'CRM modules with role-based access, dynamic forms, and data management.',
    tech: ['React', 'CRM', 'RBAC'],
  },
  {
    title: 'Connector Integrations',
    description: 'Third-party integrations for Hrone and Max Healthcare with automated data sync.',
    tech: ['API', 'Hrone', 'Max Healthcare'],
  },
  {
    title: 'NLQ AI Loader',
    description: 'Natural Language Query integration with AI-powered search and data retrieval.',
    tech: ['NLQ', 'AI', 'React'],
  },
]

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="py-20 md:py-28 bg-slate-50">
      <div className="container-main" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-sm font-medium text-blue-600 mb-2">Projects</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">What I've built</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white rounded-xl border border-slate-100 p-6 hover:shadow-md hover:border-blue-100 transition-all group"
            >
              <h3 className="font-heading font-semibold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                {p.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{p.description}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {p.tech.map((t) => (
                  <span key={t} className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <button className="text-sm font-medium text-white bg-slate-900 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
                  GitHub
                </button>
                <button className="text-sm font-medium text-slate-600 border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                  Live Demo
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
