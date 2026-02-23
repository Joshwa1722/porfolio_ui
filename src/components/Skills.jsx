import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useIsSSR } from '../context/SSRContext'

const groups = [
  {
    title: 'Frontend',
    color: 'orange',
    skills: ['React.js', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Swiper.js', 'Tailwind CSS'],
  },
  {
    title: 'Forms & State',
    color: 'pink',
    skills: ['React Hook Form', 'State Management', 'Form Validation', 'Dynamic Forms'],
  },
  {
    title: 'API Integration',
    color: 'purple',
    skills: ['RESTful APIs', 'Axios / Fetch', 'Third-Party Connectors', 'Data Mapping'],
  },
  {
    title: 'UI/UX',
    color: 'orange',
    skills: ['Responsive Design', 'Mobile-First', 'CSS Animations', 'Modern Layouts'],
  },
  {
    title: 'NLQ & AI',
    color: 'pink',
    skills: ['NLQ Integration', 'AI Loader', 'Smart Search', 'Intelligent UI'],
  },
]

const colorMap = {
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', badge: 'bg-orange-500/10 text-orange-300' },
  pink: { bg: 'bg-pink-500/10', text: 'text-pink-400', badge: 'bg-pink-500/10 text-pink-300' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', badge: 'bg-purple-500/10 text-purple-300' },
}

function TiltCard({ children, className }) {
  const [transform, setTransform] = useState('')

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTransform(`perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`)
  }

  const handleMouseLeave = () => setTransform('')

  return (
    <div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: 'transform 0.3s ease-out' }}
    >
      {children}
    </div>
  )
}

export default function Skills() {
  const isSSR = useIsSSR()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="container-main" ref={ref}>
        <motion.div
          initial={isSSR ? false : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-sm font-medium text-orange-400 mb-3 tracking-wider uppercase">Skills</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">What I work with</h2>
          <div className="section-line" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group, i) => {
            const colors = colorMap[group.color]
            return (
              <motion.div
                key={group.title}
                initial={isSSR ? false : { opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <TiltCard className="glass rounded-2xl p-6 glow-card h-full cursor-default">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${colors.bg} mb-4`}>
                    <span className={`text-sm font-semibold ${colors.text}`}>{group.title}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((s) => (
                      <span
                        key={s}
                        className={`text-sm px-3 py-1.5 rounded-lg ${colors.badge} transition-all duration-300 hover:scale-105`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
