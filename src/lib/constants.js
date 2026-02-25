// ── Site Info ──
export const SITE = {
  name: 'Joshwa',
  email: 'joshwa@example.com',
  location: 'India',
  title: 'Full Stack Developer',
}

// ── Navigation Links ──
export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

// ── Animation Presets ──
export const FADE_UP = { opacity: 0, y: 30 }
export const FADE_IN = { opacity: 1, y: 0 }
export const FADE_UP_SLOW = { opacity: 0, y: 40 }
export const SECTION_TRANSITION = { duration: 0.6 }
export const ITEM_TRANSITION = { duration: 0.5 }
export const STAGGER_DELAY = (i, base = 0.08) => i * base

// ── Common Classes ──
export const CLS = {
  sectionPadding: 'py-28 md:py-36 relative',
  sectionLabel: 'font-mono text-sm text-orange-400 tracking-wider',
  sectionHeading: 'font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-heading)] mt-3 mb-4',
  sectionLine: 'section-line',
  glassCard: 'glass rounded-2xl glow-card gradient-border-animated',
  primaryBtn: 'text-sm font-semibold text-white rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30',
  ghostBtn: 'text-sm font-medium text-[var(--text-subtle)] rounded-full glass hover:bg-[var(--surface-bg)] hover:text-[var(--text-heading)] hover:border-orange-500/25 transition-all duration-300',
}

// ── Social Links ──
export const SOCIALS = [
  {
    label: 'LinkedIn',
    href: '#',
    icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z',
    viewBox: '0 0 24 24',
  },
  {
    label: 'GitHub',
    href: '#',
    icon: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z',
    viewBox: '0 0 24 24',
  },
  {
    label: 'Email',
    href: 'mailto:joshwa@example.com',
    icon: 'M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Zm16 4.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z',
    viewBox: '0 0 20 20',
  },
]
