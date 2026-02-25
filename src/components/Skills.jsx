import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useIsSSR } from '../context/SSRContext'

const categories = [
  {
    label: 'Frontend',
    skills: ['React.js', 'Remix', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Tailwind CSS', 'Vite'],
    color: 'orange',
  },
  {
    label: 'Backend',
    skills: ['Node.js', 'Express.js', 'Python', 'REST APIs', 'Postman'],
    color: 'purple',
  },
  {
    label: 'AI Tools',
    skills: ['ChatGPT', 'GitHub Copilot', 'Claude AI', 'Cursor', 'Gemini', 'Midjourney'],
    color: 'pink',
  },
  {
    label: 'Automation',
    skills: ['N8N', 'Flowise', 'Git / GitLab', 'Agile / Scrum'],
    color: 'orange',
  },
]

const pillColor = {
  orange: 'text-orange-300/90 bg-orange-500/[0.07] border-orange-500/[0.12] hover:bg-orange-500/15 hover:border-orange-500/30 hover:shadow-[0_0_20px_rgba(249,115,22,0.12)]',
  pink: 'text-pink-300/90 bg-pink-500/[0.07] border-pink-500/[0.12] hover:bg-pink-500/15 hover:border-pink-500/30 hover:shadow-[0_0_20px_rgba(236,72,153,0.12)]',
  purple: 'text-purple-300/90 bg-purple-500/[0.07] border-purple-500/[0.12] hover:bg-purple-500/15 hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.12)]',
}

const labelColor = {
  orange: 'text-orange-500/[0.12] group-hover:text-orange-500/25',
  pink: 'text-pink-500/[0.12] group-hover:text-pink-500/25',
  purple: 'text-purple-500/[0.12] group-hover:text-purple-500/25',
}

const dotColor = {
  orange: 'bg-orange-500',
  pink: 'bg-pink-500',
  purple: 'bg-purple-500',
}

export default function Skills() {
  const isSSR = useIsSSR()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="skills" className="py-28 md:py-36 relative">
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-pink-500/[0.03] blur-[130px] pointer-events-none" />

      <div className="container-main" ref={ref}>
        {/* Header */}
        <motion.div
          initial={isSSR ? false : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-sm text-orange-400 tracking-wider">// skills</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-heading)] mt-3 mb-4">
            Tech I<br />
            <span className="gradient-text">use</span>.
          </h2>
          <div className="section-line" />
        </motion.div>

        {/* Skill rows */}
        <div>
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={isSSR ? false : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-7 md:py-9 border-b border-[var(--border-subtle)] -mx-3 md:-mx-5 px-3 md:px-5 rounded-xl hover:bg-[var(--hover-bg)] transition-all duration-500">
                {/* Category label - large decorative on left */}
                <div className="md:col-span-3 flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${dotColor[cat.color]} shrink-0 opacity-70`} />
                  <span className="font-heading font-bold text-lg md:text-xl text-[var(--text-heading)] group-hover:text-orange-300 transition-colors duration-300">
                    {cat.label}
                  </span>
                </div>

                {/* Skill pills on right */}
                <div className="md:col-span-9 flex flex-wrap gap-2.5 items-center">
                  {cat.skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      initial={isSSR ? false : { opacity: 0, scale: 0.85 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.35, delay: i * 0.08 + j * 0.04 }}
                      className={`text-sm font-medium px-4 py-2 rounded-full border backdrop-blur-sm cursor-default transition-all duration-300 hover:scale-105 ${pillColor[cat.color]}`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={isSSR ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center gap-3 mt-8"
        >
          <div className="w-8 h-[1px] bg-gradient-to-r from-orange-500/40 to-transparent" />
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {categories.reduce((sum, c) => sum + c.skills.length, 0)}+ technologies & growing
          </span>
        </motion.div>
      </div>
    </section>
  )
}
