import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useIsSSR } from '../context/SSRContext'
import { FADE_UP, FADE_IN, SECTION_TRANSITION, STAGGER_DELAY, CLS } from '../lib/constants'

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
    <section id="skills" className={`${CLS.sectionPadding} overflow-hidden`}>
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-pink-500/[0.03] blur-[130px] pointer-events-none" />

      <div className="container-main" ref={ref}>
        <motion.div
          initial={isSSR ? false : FADE_UP}
          animate={inView ? FADE_IN : {}}
          transition={SECTION_TRANSITION}
          className="mb-16"
        >
          <span className={CLS.sectionLabel}>// skills</span>
          <h2 className={CLS.sectionHeading}>
            Tech I<br />
            <span className="gradient-text">use</span>.
          </h2>
          <div className={CLS.sectionLine} />
        </motion.div>

        <div>
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={isSSR ? false : { opacity: 0, y: 20 }}
              animate={inView ? FADE_IN : {}}
              transition={{ duration: 0.5, delay: STAGGER_DELAY(i) }}
              className="group"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-7 md:py-9 border-b border-[var(--border-subtle)] -mx-3 md:-mx-5 px-3 md:px-5 rounded-xl hover:bg-[var(--hover-bg)] transition-all duration-500">
                <div className="md:col-span-3 flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${dotColor[cat.color]} shrink-0 opacity-70`} />
                  <span className="font-heading font-bold text-lg md:text-xl text-[var(--text-heading)] group-hover:text-orange-300 transition-colors duration-300">
                    {cat.label}
                  </span>
                </div>

                <div className="md:col-span-9 flex flex-wrap gap-2.5 items-center">
                  {cat.skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      initial={isSSR ? false : { opacity: 0, scale: 0.85 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.35, delay: STAGGER_DELAY(i) + j * 0.04 }}
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

        <motion.div
          initial={isSSR ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ ...SECTION_TRANSITION, delay: 0.6 }}
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
