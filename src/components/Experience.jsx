import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useIsSSR } from '../context/SSRContext'

const timeline = [
  {
    year: '2024',
    role: 'Frontend Developer',
    title: 'Skillmine Technology',
    desc: 'Leading production bug fixes and implementing new features using React Remix. Collaborating with design teams for pixel-perfect interfaces and managing GitLab repositories.',
    tags: ['React', 'Remix', 'Production', 'GitLab'],
  },
  {
    year: '2024',
    role: 'Trainee',
    title: 'Skillmine Technology',
    desc: 'Developed core frontend modules using React Vite. Created reusable UI components reducing development time by 15%. Participated in Agile sprint planning.',
    tags: ['React Vite', 'Agile', 'API', 'Postman'],
  },
  {
    year: '2022',
    role: 'Student',
    title: 'Master of Computer Application',
    desc: 'Ayya Nadar Janaki Ammal College (Autonomous), affiliated to Madurai Kamaraj University. CGPA: 7.1',
    tags: ['MCA', 'Computer Science'],
  },
  {
    year: '2022',
    role: 'Graduate',
    title: 'Bachelor of Computer Application',
    desc: 'Ayya Nadar Janaki Ammal College (Autonomous), affiliated to Madurai Kamaraj University. CGPA: 7.2',
    tags: ['BCA', 'Foundations'],
  },
]

export default function Experience() {
  const isSSR = useIsSSR()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="py-28 md:py-36 relative">
      <div className="container-main" ref={ref}>
        <motion.div
          initial={isSSR ? false : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-sm text-orange-400 tracking-wider">// experience</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-heading)] mt-3 mb-4">
            My<br />
            <span className="gradient-text">journey</span>.
          </h2>
          <div className="section-line" />
        </motion.div>

        {/* Editorial timeline */}
        <div className="max-w-4xl">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={isSSR ? false : { opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 border-b border-[var(--border-subtle)] hover:bg-[var(--hover-bg)] transition-all duration-500 -mx-4 md:-mx-6 px-4 md:px-6 rounded-xl">
                {/* Year - large decorative */}
                <div className="md:col-span-3 flex items-start">
                  <span className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--text-heading)] opacity-15 group-hover:opacity-30 group-hover:text-orange-400 transition-all duration-500 leading-none select-none">
                    {item.year}
                  </span>
                </div>

                {/* Content */}
                <div className="md:col-span-9">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-2 h-2 rounded-full bg-orange-500 pulse-dot" />
                    <h3 className="font-heading font-bold text-xl text-[var(--text-heading)] group-hover:text-orange-300 transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-orange-400/60 font-mono ml-5 mb-3">{item.role}</p>
                  <p className="text-[var(--text-body)] leading-relaxed mb-4 ml-5">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 ml-5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-3 py-1 rounded-full bg-orange-500/8 text-orange-400/70 border border-orange-500/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
