import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const groups = [
  { title: 'Frontend', skills: ['React.js', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Swiper.js', 'Tailwind CSS'] },
  { title: 'Forms & State', skills: ['React Hook Form', 'State Management', 'Form Validation', 'Dynamic Forms'] },
  { title: 'API Integration', skills: ['RESTful APIs', 'Axios / Fetch', 'Third-Party Connectors', 'Data Mapping'] },
  { title: 'UI/UX', skills: ['Responsive Design', 'Mobile-First', 'CSS Animations', 'Modern Layouts'] },
  { title: 'NLQ & AI', skills: ['NLQ Integration', 'AI Loader', 'Smart Search', 'Intelligent UI'] },
]

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="container-main" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-sm font-medium text-blue-600 mb-2">Skills</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">What I work with</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-xl border border-slate-100 p-5 hover:border-blue-100 transition-colors"
            >
              <h3 className="font-semibold text-slate-900 mb-3">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((s) => (
                  <span key={s} className="text-sm text-slate-500 bg-slate-50 px-3 py-1 rounded-md">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
