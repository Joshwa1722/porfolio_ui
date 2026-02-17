import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const cards = [
  { title: 'MCA Graduate', desc: 'Strong foundation in computer applications & software engineering.' },
  { title: 'React Developer', desc: 'Building modern web apps with component-driven architecture.' },
  { title: 'Connector Dev', desc: 'Integrating third-party APIs like Hrone & Max Healthcare.' },
  { title: 'CRM Experience', desc: 'Built Manage User & Manage Plant modules with RBAC.' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-20 md:py-28 bg-slate-50">
      <div className="container-main" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-sm font-medium text-blue-600 mb-2">About</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-4">A bit about me</h2>
          <p className="text-slate-500 leading-relaxed max-w-2xl">
            I'm a passionate Frontend Developer with hands-on experience building modern web applications
            using React.js. I specialize in creating intuitive interfaces, integrating RESTful APIs,
            and developing scalable CRM modules and third-party connectors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white rounded-xl p-5 border border-slate-100 hover:border-blue-100 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-slate-900 mb-1.5">{card.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
