import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import profilePhoto from './assets/profile.png'

const API_BASE_URL = import.meta.env.VITE_API_URL || ''

type EducationItem = {
  period: string
  degree: string
  institution: string
  details?: string
}

type ProjectItem = {
  title: string
  stack: string[]
  description?: string
  links?: {
    github?: string
    live?: string
  }
}

type Skills = {
  frontend: string[]
  backend: string[]
  machine_learning: string[]
  databases: string[]
  tools: string[]
  core: string[]
}

type Profile = {
  name: string
  headline: string
  location: string
  email: string
  phone: string
  open_to_work?: boolean
  links?: {
    github?: string
    linkedin?: string
    portfolio?: string
  }
  about: string
  education: EducationItem[]
  skills: Skills
  projects: ProjectItem[]
  experience?: Array<{
    title: string
    company: string
    period: string
    description?: string
    link?: string
  }>
  certifications: string[]
}

function Stars({ count = 48 }: { count?: number }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.2,
        delay: Math.random() * 2.8,
        duration: 1.8 + Math.random() * 2.4,
        opacity: 0.15 + Math.random() * 0.35,
        depth: 0.2 + Math.random() * 0.8,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none absolute inset-0">
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-slate-900"
          animate={{
            x: mousePos.x * s.depth,
            y: mousePos.y * s.depth,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: Math.min(0.45, s.opacity + 0.08),
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            boxShadow:
              '0 0 0.5px rgba(15,23,42,0.35), 0 0 10px rgba(99,102,241,0.16), 0 0 14px rgba(56,189,248,0.12)',
          }}
        />
      ))}
    </div>
  )
}

function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      const target = e.target as HTMLElement
      setIsHovering(target.closest('a, button') !== null)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500 mix-blend-difference"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.1 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-400/50"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.2 }}
      />
    </>
  )
}

function MeshBackground({ isDark }: { isDark: boolean }) {
  return (
    <div className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden transition-colors duration-700 ${isDark ? 'bg-[#1e293b]' : 'bg-[#f8fafc]'}`}>
      <motion.div
        animate={{
          x: [0, 150, -150, 0],
          y: [0, -100, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-1/4 -top-1/4 h-[900px] w-[900px] rounded-full bg-violet-500/20 blur-[60px]"
      />
      <motion.div
        animate={{
          x: [0, -180, 180, 0],
          y: [0, 150, -150, 0],
          scale: [1, 0.8, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-1/4 top-1/6 h-[1000px] w-[1000px] rounded-full bg-sky-400/20 blur-[60px]"
      />
      <motion.div
        animate={{
          x: [0, 120, -120, 0],
          y: [0, 180, -180, 0],
          scale: [1, 1.1, 0.8, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/6 left-1/4 h-[850px] w-[850px] rounded-full bg-fuchsia-400/20 blur-[60px]"
      />
      <div className={`absolute inset-0 transition-colors duration-700 ${isDark ? 'bg-gradient-to-b from-[#1e293b]/60 via-transparent to-[#1e293b]/90' : 'bg-gradient-to-b from-white/40 via-transparent to-white/60'}`} />
    </div>
  )
}

function useInViewOnce<T extends Element>(threshold = 0.15) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, inView }
}

function Typewriter({ words, className }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [speed, setSpeed] = useState(150)

  useEffect(() => {
    const handleTyping = () => {
      const fullText = words[index % words.length]
      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      )

      if (!isDeleting && text === fullText) {
        setSpeed(2000) // Delay at end
        setIsDeleting(true)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setIndex((prev) => prev + 1)
        setSpeed(500)
      } else {
        setSpeed(isDeleting ? 50 : 150)
      }
    }

    const timer = setTimeout(handleTyping, speed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, index, words, speed])

  return (
    <span className={className}>
      {text}
      <span className="ml-1 inline-block h-8 w-0.5 animate-pulse rounded-full bg-violet-500 align-middle" />
    </span>
  )
}

function Magnetic({ children, strength = 0.25 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = (clientX - (left + width / 2)) * strength
    const y = (clientY - (top + height / 2)) * strength
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  )
}

function RevealSection({
  id,
  children,
  className,
}: {
  id?: string
  className?: string
  children: React.ReactNode
}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.2)
  return (
    <section id={id} className={className}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
        animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </section>
  )
}

function App() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isDark, setIsDark] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactSubject, setContactSubject] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [contactStatus, setContactStatus] = useState<
    'idle' | 'submitting' | 'sent' | 'error'
  >('idle')

  const [activeSkillFilter, setActiveSkillFilter] = useState<string>('All')
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  )
  const [photoOpen, setPhotoOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('#about')

  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scrollBar = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.4,
  })

  const gridStagger = useMemo(
    () => ({
      hidden: {},
      show: { transition: { staggerChildren: 0.06, delayChildren: 0.02 } },
    }),
    [],
  )
  const gridItem = useMemo(
    () => ({
      hidden: { opacity: 0, y: 10, filter: 'blur(6px)' },
      show: { opacity: 1, y: 0, filter: 'blur(0px)' },
    }),
    [],
  )

  function SpotlightCard({
    children,
    className,
    onClick,
    as = 'div',
  }: {
    children: React.ReactNode
    className?: string
    onClick?: () => void
    as?: 'div' | 'button'
  }) {
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const [hovered, setHovered] = useState(false)
    const [rotate, setRotate] = useState({ x: 0, y: 0 })
    const Comp: any = as

    return (
      <Comp
        type={as === 'button' ? 'button' : undefined}
        onClick={onClick}
        onPointerMove={(e: React.PointerEvent) => {
          const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
          const x = e.clientX - r.left
          const y = e.clientY - r.top
          setPos({ x, y })

          if (!reduceMotion) {
            const rotX = (y - r.height / 2) / (r.height / 2) * -6
            const rotY = (x - r.width / 2) / (r.width / 2) * 6
            setRotate({ x: rotX, y: rotY })
          }
        }}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => {
          setHovered(false)
          setRotate({ x: 0, y: 0 })
        }}
        style={{
          perspective: '1200px',
        }}
        className={
          `group relative overflow-hidden rounded-[2rem] border transition-all duration-500 backdrop-blur-3xl shadow-2xl ` +
          (isDark 
            ? 'border-white/20 bg-white/15 hover:border-violet-400/50 hover:bg-white/[0.18] hover:shadow-violet-500/30' 
            : 'border-slate-200 bg-white/80 hover:border-violet-500/30 hover:bg-white hover:shadow-xl'
          ) + ' ' +
          (className ?? '')
        }
      >
        <motion.div
          animate={{ 
            rotateX: rotate.x, 
            rotateY: rotate.y,
            scale: hovered ? 1.01 : 1
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 0.5 }}
          className="relative h-full w-full p-px"
        >
          {/* Main Spotlight Glow */}
          <div 
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, rgba(139,92,246,0.15), rgba(56,189,248,0.05), transparent 65%)`,
            }}
          />

          {/* Sharp Center Highlight */}
          <div 
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(180px circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.08), transparent 80%)`,
            }}
          />
          
          {/* Rim Light / Neon Edge */}
          <span
            className="pointer-events-none absolute inset-0 opacity-0 transition duration-500"
            style={{
              opacity: hovered && !reduceMotion ? 1 : 0,
              background: `radial-gradient(320px circle at ${pos.x}px ${pos.y}px, rgba(139,92,246,0.2), rgba(14,165,233,0.1), transparent 60%)`,
            }}
          />

          {/* Inner Content Wrapper */}
          <div className="relative z-10 h-full w-full">{children}</div>
        </motion.div>
      </Comp>
    )
  }

  useEffect(() => {
    let cancelled = false
    async function run() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`${API_BASE_URL}/api/profile/`)
        if (!res.ok) throw new Error(`Failed to load profile (${res.status})`)
        const data = (await res.json()) as Profile
        if (!cancelled) setProfile(data)
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Failed to load profile'
        if (!cancelled) setError(msg)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const skillGroups = useMemo(() => {
    if (!profile) return []
    return [
      { label: 'Frontend', items: profile.skills.frontend },
      { label: 'Backend', items: profile.skills.backend },
      { label: 'Machine Learning', items: profile.skills.machine_learning },
      { label: 'Databases', items: profile.skills.databases },
      { label: 'Tools', items: profile.skills.tools },
      { label: 'Core', items: profile.skills.core },
    ]
  }, [profile])

  const stackChips = useMemo(() => {
    if (!profile) return []
    const all = [
      ...profile.skills.frontend,
      ...profile.skills.backend,
      ...profile.skills.databases,
      ...profile.skills.machine_learning,
      ...profile.skills.tools,
    ]
    return Array.from(new Set(all))
  }, [profile])

  const allSkillFilters = useMemo(() => {
    if (!profile) return ['All']
    return ['All', ...Object.keys(profile.skills)]
  }, [profile])

  const filteredProjects = useMemo(() => {
    if (!profile) return []
    if (activeSkillFilter === 'All') return profile.projects
    const filterKey = activeSkillFilter
    const filterTerms = new Set(
      (profile.skills as Record<string, string[]>)[filterKey] ?? [],
    )
    return profile.projects.filter((p) => p.stack.some((t) => filterTerms.has(t)))
  }, [activeSkillFilter, profile])

  async function onSubmitContact(e: FormEvent) {
    e.preventDefault()
    setContactStatus('submitting')
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          subject: contactSubject,
          message: contactMessage,
        }),
      })
      if (!res.ok) throw new Error(`Failed to send message (${res.status})`)
      setContactStatus('sent')
      setContactSubject('')
      setContactMessage('')
      window.setTimeout(() => setContactStatus('idle'), 2600)
    } catch {
      setContactStatus('error')
      window.setTimeout(() => setContactStatus('idle'), 2600)
    }
  }

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#stack', label: 'My Stack' },
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Projects' },
    { href: '#education', label: 'Education' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#contact', label: 'Contact' },
  ] as const

  useEffect(() => {
    const ids = navItems.map((n) => n.href.slice(1))
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    if (!els.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))
        if (visible[0]?.target?.id) setActiveSection(`#${visible[0].target.id}`)
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: [0.08, 0.15, 0.25, 0.4] },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MotionConfig
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
      }
    >
      {!reduceMotion && <CustomCursor />}
      <div className={`min-h-screen scroll-smooth transition-colors duration-700 ${isDark ? 'bg-[#1e293b] text-slate-200' : 'bg-[#f8fafc] text-slate-800'} selection:bg-violet-500/30`}>
        <motion.div
          className="fixed left-0 right-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 shadow-[0_0_15px_rgba(124,58,237,0.6)]"
          style={{ scaleX: scrollBar }}
        />

        <MeshBackground isDark={isDark} />
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          {!reduceMotion ? <Stars count={32} /> : null}
        </div>

      <header className={`sticky top-0 z-40 border-b transition-colors duration-700 backdrop-blur-3xl ${isDark ? 'border-white/5 bg-[#1e293b]/80' : 'border-slate-200 bg-white/70'}`}>
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-4 py-4">
          <a href="#" className={`flex items-center gap-2 font-bold tracking-tighter ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            <span className="h-2 w-2 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
            {profile?.name ?? 'Portfolio'}
          </a>
          <nav className={`hidden gap-6 text-sm font-medium md:flex ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {navItems.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={
                  'relative transition-colors ' +
                  (isDark ? 'hover:text-slate-100 ' : 'hover:text-slate-900 ') +
                  (activeSection === n.href 
                    ? (isDark ? 'text-slate-100' : 'text-slate-900') 
                    : ''
                  )
                }
              >
                {activeSection === n.href ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-sky-500"
                  />
                ) : null}
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all active:scale-90 ${isDark ? 'bg-white/5 text-yellow-400 hover:bg-white/10 ring-1 ring-white/10' : 'bg-slate-100 text-violet-600 hover:bg-slate-200 ring-1 ring-slate-200'}`}
              aria-label="Toggle Theme"
            >
              {isDark ? '🌙' : '☀️'}
            </button>
            <Magnetic strength={0.2}>
              <a
                className={`group relative overflow-hidden rounded-full px-5 py-2 text-sm font-bold transition-all hover:scale-105 active:scale-95 ${isDark ? 'bg-white text-black' : 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'}`}
                href="#contact"
              >
                <span className="relative z-10">Hire Me</span>
                <div className={`absolute inset-0 -translate-x-full transition-transform duration-500 group-hover:translate-x-full ${isDark ? 'bg-gradient-to-r from-transparent via-black/5 to-transparent' : 'bg-gradient-to-r from-transparent via-white/10 to-transparent'}`} />
              </a>
            </Magnetic>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        {loading ? (
          <div className="grid gap-4">
            <div className="h-40 animate-pulse rounded-2xl border border-white/10 bg-white/45" />
            <div className="h-28 animate-pulse rounded-xl border border-white/10 bg-white/45" />
            <div className="h-28 animate-pulse rounded-xl border border-white/10 bg-white/45" />
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-red-100">
            {error}
            <div className="mt-2 text-sm text-red-200/80">
              Please check if the backend API is reachable at <code className="break-all">{API_BASE_URL || 'your backend URL'}</code>.
            </div>
          </div>
        ) : !profile ? (
          <div className="rounded-xl border border-white/10 bg-white/55 backdrop-blur-md p-6">
            No profile data.
          </div>
        ) : (
          <>
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`relative overflow-hidden rounded-[2.5rem] border border-white/10 ${isDark ? 'bg-white/5' : 'bg-slate-50'} backdrop-blur-3xl p-8 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] md:p-12`}
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-violet-500/25 blur-[120px]" />
                <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-sky-500/20 blur-[120px]" />
              </div>
              
              <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-center">
                <div className="flex flex-col gap-8">
                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className={`inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-black uppercase tracking-widest ${isDark ? 'text-violet-300' : 'text-violet-700'} ring-1 ring-violet-500/20`}
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500"></span>
                      </span>
                      Available for projects
                    </motion.div>
                    <h1 className="text-4xl font-black tracking-tighter md:text-7xl">
                      I'm <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-sky-400 bg-clip-text text-transparent">{profile?.name?.split(' ')[0] ?? 'Ganika'}</span>
                    </h1>
                    <div className="text-xl font-bold md:text-3xl">
                      <Typewriter
                        words={[
                          'Python Django Expert',
                          'Full Stack Engineer',
                          'AI/ML Enthusiast',
                          'UI/UX Designer',
                        ]}
                        className="bg-gradient-to-r from-violet-400 to-sky-400 bg-clip-text text-transparent"
                      />
                    </div>
                    <p className={`max-w-xl text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'} font-medium`}>
                      {profile?.headline}
                    </p>
                  </div>

                  <div className={`flex flex-wrap gap-4 text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    <div className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 ring-1 ring-white/10 transition-colors hover:bg-white/10">
                      <span className="text-violet-400">📍</span> {profile?.location}
                    </div>
                    <a
                      href={`mailto:${profile?.email}`}
                      className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 ring-1 ring-white/10 transition-colors hover:bg-white/10"
                    >
                      <span className="text-sky-400">✉️</span> {profile?.email}
                    </a>
                  </div>

                  <div className="flex flex-wrap gap-5">
                    <Magnetic strength={0.15}>
                      <a
                        href="#projects"
                        className="group relative flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-violet-500 px-8 py-4 text-base font-bold text-slate-100 shadow-lg shadow-violet-600/25 transition-all hover:scale-105 active:scale-95"
                      >
                        <span className="relative z-10">Explore Work</span>
                        <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 -translate-x-full group-hover:translate-x-full" />
                      </a>
                    </Magnetic>
                    <Magnetic strength={0.15}>
                      <a
                        href="#contact"
                        className={`flex items-center gap-2 rounded-2xl ${isDark ? 'bg-white/5 text-slate-100' : 'bg-slate-100 text-slate-900'} px-8 py-4 text-base font-bold ring-1 ring-white/10 transition-all hover:bg-white/10 hover:scale-105 active:scale-95`}
                      >
                        Let's Talk
                      </a>
                    </Magnetic>
                  </div>
                </div>

                <div className="flex justify-center md:justify-end">
                  <div className="relative">
                    <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-violet-500 via-fuchsia-500 to-sky-500 opacity-20 blur-2xl animate-pulse" />
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="relative"
                    >
                      <div className="cursor-zoom-in overflow-hidden rounded-[2.5rem] border-2 border-white/20 bg-slate-800 shadow-2xl ring-1 ring-white/20">
                        <img
                          src={profilePhoto}
                          alt={profile?.name}
                          className="h-64 w-48 object-cover md:h-80 md:w-60 grayscale hover:grayscale-0 transition-all duration-700"
                          onClick={() => setPhotoOpen(true)}
                        />
                      </div>
                      <div className="absolute -bottom-4 -right-4 h-12 w-12 rounded-2xl bg-violet-600 flex items-center justify-center text-xl shadow-xl ring-2 ring-slate-950">
                        🚀
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.section>

            <RevealSection id="about" className="mt-20 scroll-mt-24">
              <h2 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'} flex items-center gap-2`}>
                <span className="h-6 w-1 rounded-full bg-violet-500" />
                About
              </h2>
              <p className={`mt-6 text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'} font-medium`}>
                {profile?.about}
              </p>
            </RevealSection>

            <RevealSection id="stack" className="mt-24 scroll-mt-24">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <h2 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'} flex items-center gap-2`}>
                  <span className="h-6 w-1 rounded-full bg-sky-500" />
                  Technical Stack
                </h2>
                {profile?.open_to_work ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Open for opportunities
                  </span>
                ) : null}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {stackChips.map((s) => (
                  <motion.span
                    key={s}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`rounded-xl border border-white/10 ${isDark ? 'bg-white/5 text-slate-200' : 'bg-slate-100 text-slate-700'} px-4 py-2 text-sm font-medium transition-colors hover:border-violet-500/30 hover:bg-white/10`}
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </RevealSection>

            <RevealSection id="services" className="mt-24 scroll-mt-24">
              <h2 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'} flex items-center gap-2`}>
                <span className="h-6 w-1 rounded-full bg-fuchsia-500" />
                Core Expertise
              </h2>
              <div className={`mt-3 text-lg ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Crafting digital experiences with precision and passion.
              </div>
              <motion.div
                className="mt-10 grid gap-6 md:grid-cols-2"
                variants={gridStagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                {skillGroups.map((g, idx) => (
                  <motion.div key={g.label} variants={gridItem}>
                    <SpotlightCard className="p-8">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-xs font-black uppercase tracking-widest text-violet-500">
                            {String(idx + 1).padStart(2, '0')}
                          </div>
                          <div className={`mt-2 text-xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                            {g.label}
                          </div>
                        </div>
                        <div className="text-2xl text-slate-700 transition-colors group-hover:text-violet-500">
                          ✦
                        </div>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {g.items.slice(0, 8).map((s) => (
                          <span
                            key={s}
                            className={`rounded-lg bg-white/5 px-3 py-1 text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'} ring-1 ring-white/5 transition-colors group-hover:bg-white/10 ${isDark ? 'group-hover:text-slate-100' : 'group-hover:text-slate-900'}`}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <p className={`mt-6 text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-700'} group-hover:${isDark ? 'text-slate-300' : 'text-slate-900'}`}>
                        {g.label === 'Frontend'
                          ? 'Crafting high-performance, pixel-perfect user interfaces with modern React ecosystems.'
                          : g.label === 'Backend'
                            ? 'Architecting scalable server-side logic and robust API infrastructures with Django and Node.'
                            : g.label === 'Machine Learning'
                              ? 'Leveraging data-driven insights to build intelligent models and predictive analytics.'
                              : g.label === 'Databases'
                                ? 'Optimizing data flow with sophisticated NoSQL schemas and high-efficiency queries.'
                                : g.label === 'Tools'
                                  ? 'Streamlining development cycles with advanced devtools and automated workflows.'
                                  : 'Deep-rooted understanding of algorithmic efficiency and system architecture.'}
                      </p>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </motion.div>
            </RevealSection>

            <RevealSection id="projects" className="mt-28 scroll-mt-24">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <h2 className={`text-3xl font-black tracking-tighter ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  Featured Projects
                </h2>
                <div className="flex flex-wrap gap-2">
                  {allSkillFilters.map((f) => {
                    const selected = f === activeSkillFilter
                    const label =
                      f === 'All'
                        ? 'Everything'
                        : f === 'machine_learning'
                          ? 'AI & ML'
                          : f.charAt(0).toUpperCase() + f.slice(1)
                    return (
                      <button
                        key={f}
                        className={
                          'rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-all ' +
                          (selected
                            ? `bg-violet-600 ${isDark ? 'text-slate-100' : 'text-slate-900'} shadow-lg shadow-violet-600/30 ring-2 ring-violet-400/50`
                            : `bg-white/5 ${isDark ? 'text-slate-400' : 'text-slate-500'} hover:bg-white/10 hover:text-slate-200 ring-1 ring-white/10`)
                        }
                        onClick={() => setActiveSkillFilter(f)}
                        type="button"
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <motion.div
                className="mt-12 grid gap-8 md:grid-cols-2"
                layout
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((p) => (
                    <motion.div
                      key={p.title}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.35 }}
                    >
                      <SpotlightCard
                        as="button"
                        onClick={() => setSelectedProject(p)}
                        className="w-full text-left group/card"
                      >
                        <div className="relative aspect-video overflow-hidden rounded-t-[2rem] bg-slate-800/50">
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60" />
                          <div className="flex h-full items-center justify-center text-4xl opacity-40 grayscale group-hover/card:grayscale-0 group-hover/card:scale-110 transition-all duration-700">
                            {p.stack[0]?.toLowerCase().includes('python') ? '🐍' : '💻'}
                          </div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex flex-wrap gap-2">
                              {p.stack.slice(0, 3).map((t) => (
                                <span key={t} className={`rounded-lg ${isDark ? 'bg-violet-600/20 text-violet-300' : 'bg-violet-600/10 text-violet-700'} backdrop-blur-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider ring-1 ring-violet-500/30`}>
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className={`text-xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'} group-hover/card:text-violet-400 transition-colors`}>
                            {p.title}
                          </h3>
                          {p.description ? (
                            <p className={`mt-3 line-clamp-2 text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
                              {p.description}
                            </p>
                          ) : null}
                          <div className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-violet-500">
                            View details <span className="text-lg transition-transform group-hover/card:translate-x-1">→</span>
                          </div>
                        </div>
                      </SpotlightCard>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </RevealSection>

            <RevealSection id="experience" className="mt-28 scroll-mt-24">
              <h2 className={`text-3xl font-black tracking-tighter ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Experience</h2>
              <div className="mt-12 space-y-12">
                {profile.experience?.map((e, idx) => (
                  <div key={idx} className="relative pl-12 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-[2px] before:bg-gradient-to-b before:from-violet-500 before:to-transparent">
                    <div className="absolute left-[-5px] top-2 h-2.5 w-2.5 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.8)] ring-4 ring-slate-950" />
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h3 className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{e.title}</h3>
                        <div className="text-lg font-medium text-violet-400">{e.company}</div>
                      </div>
                      <div className={`rounded-full bg-white/5 px-4 py-1.5 text-xs font-black uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'} ring-1 ring-white/10`}>
                        {e.period}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealSection>

            <RevealSection id="education" className="mt-28 scroll-mt-24">
              <h2 className={`text-3xl font-black tracking-tighter ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Education</h2>
              <motion.div
                className="mt-12 grid gap-6 md:grid-cols-2"
                variants={gridStagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                {profile.education.map((e) => (
                  <motion.div key={`${e.period}-${e.degree}`} variants={gridItem}>
                    <SpotlightCard className="p-8">
                      <div className="flex flex-col gap-2">
                        <div className="text-xs font-black uppercase tracking-widest text-sky-500">{e.period}</div>
                        <div className={`text-xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{e.degree}</div>
                        <div className="${isDark ? 'text-slate-300' : 'text-slate-600'} font-medium">
                          {e.institution}
                        </div>
                        {e.details ? (
                        <div className={`mt-4 text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {e.details}
                          </div>
                        ) : null}
                      </div>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </motion.div>
            </RevealSection>

            <RevealSection id="certifications" className="mt-28 scroll-mt-24">
              <h2 className={`text-3xl font-black tracking-tighter ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                Certifications
              </h2>
              <motion.div
                className="mt-12 grid gap-4 md:grid-cols-2"
                variants={gridStagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                {profile.certifications.map((c) => (
                  <motion.div key={c} variants={gridItem}>
                    <SpotlightCard className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/20">
                          📜
                        </div>
                        <div className={`text-base font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{c}</div>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </motion.div>
            </RevealSection>

            <RevealSection id="contact" className="mt-32 pb-40 scroll-mt-24">
              <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
                <div className="relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/5 backdrop-blur-3xl p-8 shadow-2xl md:p-14">
                  <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />
                  <h2 className={`text-4xl font-black tracking-tighter ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    Let's Build Something <span className="bg-gradient-to-r from-violet-400 to-sky-400 bg-clip-text text-transparent">Extraordinary</span>
                  </h2>
                  <p className={`mt-6 text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'} font-medium`}>
                    Have a vision? Let’s turn it into a high-performance reality.
                  </p>

                  <form className="mt-12 space-y-8" onSubmit={onSubmitContact}>
                    <div className="grid gap-8 md:grid-cols-2">
                      <div className="group space-y-3">
                        <label className={`text-xs font-black uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-600'} transition-colors group-focus-within:text-violet-400`} htmlFor="name">Name</label>
                        <input
                          id="name"
                          type="text"
                          required
                          placeholder="What should I call you?"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className={`w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 ${isDark ? 'text-slate-100' : 'text-slate-900'} placeholder:text-slate-600 outline-none transition-all focus:border-violet-500/50 focus:bg-white/10 focus:ring-4 focus:ring-violet-500/10`}
                        />
                      </div>
                      <div className="group space-y-3">
                        <label className={`text-xs font-black uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-600'} transition-colors group-focus-within:text-sky-400`} htmlFor="email">Email</label>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="Where can I reply?"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className={`w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 ${isDark ? 'text-slate-100' : 'text-slate-900'} placeholder:text-slate-600 outline-none transition-all focus:border-sky-500/50 focus:bg-white/10 focus:ring-4 focus:ring-sky-500/10`}
                        />
                      </div>
                    </div>
                    <div className="group space-y-3">
                      <label className={`text-xs font-black uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-600'} transition-colors group-focus-within:text-fuchsia-400`} htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        required
                        rows={6}
                        placeholder="Tell me about your amazing project..."
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        className={`w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-5 py-4 ${isDark ? 'text-slate-100' : 'text-slate-900'} placeholder:text-slate-600 outline-none transition-all focus:border-fuchsia-500/50 focus:bg-white/10 focus:ring-4 focus:ring-fuchsia-500/10`}
                      />
                    </div>
                    <Magnetic strength={0.1}>
                      <button
                        type="submit"
                        disabled={contactStatus === 'submitting'}
                        className={`group relative w-full overflow-hidden rounded-2xl bg-violet-600 py-5 text-base font-black uppercase tracking-widest ${isDark ? 'text-slate-100' : 'text-slate-900'} transition-all hover:bg-violet-500 active:scale-[0.98] disabled:opacity-50`}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {contactStatus === 'submitting' ? 'Transmitting...' : 'Launch Message 🚀'}
                        </span>
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 -translate-x-full group-hover:translate-x-full" />
                      </button>
                    </Magnetic>
                  </form>
                </div>

                <div className="space-y-8">
                  <div className="rounded-[2.5rem] border border-white/20 bg-white/5 backdrop-blur-3xl p-10 shadow-2xl">
                    <h3 className={`text-xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Digital Coordinates</h3>
                    <div className="mt-10 space-y-8">
                      <div className="flex items-center gap-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20">
                          ✉️
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase tracking-widest text-slate-500">Email</div>
                          <a href={`mailto:${profile.email}`} className={`text-lg font-medium ${isDark ? 'text-slate-100' : 'text-slate-900'} hover:text-violet-400 transition-colors tracking-tight`}>{profile.email}</a>
                        </div>
                      </div>
                      <div className="flex items-center gap-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/20">
                          📞
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase tracking-widest text-slate-500">Phone</div>
                          <a href={`tel:${profile.phone}`} className={`text-lg font-medium ${isDark ? 'text-slate-100' : 'text-slate-900'} hover:text-sky-400 transition-colors tracking-tight`}>{profile.phone}</a>
                        </div>
                      </div>
                      <div className="flex items-center gap-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-500/10 text-fuchsia-400 ring-1 ring-fuchsia-500/20">
                          📍
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase tracking-widest text-slate-500">Location</div>
                          <div className={`text-lg font-medium ${isDark ? 'text-slate-100' : 'text-slate-900'} tracking-tight`}>{profile.location}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-violet-600/15 via-sky-600/10 to-fuchsia-600/15 p-10 shadow-2xl ring-1 ring-white/10">
                    <h3 className={`text-xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Social Impulse</h3>
                    <p className={`mt-3 text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'} leading-relaxed font-medium`}>Synced everywhere across the web. Let’s connect and share ideas.</p>
                    <div className="mt-10 flex gap-5">
                      {['GitHub', 'LinkedIn', 'Twitter'].map(s => (
                        <Magnetic key={s} strength={0.3}>
                          <button className={`h-14 w-14 flex items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 text-xl ${isDark ? 'text-slate-100' : 'text-slate-900'} hover:bg-white/10 hover:ring-white/20 transition-all shadow-xl`}>
                            {s[0]}
                          </button>
                        </Magnetic>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>
          </>
        )}
      </main>

      <footer className="mt-20 border-t border-white/5 bg-slate-950/50 py-12 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} font-medium`}>
            © {new Date().getFullYear()} {profile?.name}. All rights reserved.
          </div>
          <div className="flex gap-8">
            {['Privacy', 'Terms', 'Sitemap'].map(item => (
              <a key={item} href="#" className={`text-xs font-black uppercase tracking-widest text-slate-500 hover:${isDark ? 'text-slate-100' : 'text-slate-900'} transition-colors`}>{item}</a>
            ))}
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedProject ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] border border-white/20 bg-slate-900/95 p-10 text-left shadow-2xl backdrop-blur-3xl"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className={`text-3xl font-black tracking-tighter ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    {selectedProject.title}
                  </h3>
                  {selectedProject.description ? (
                    <p className={`mt-4 text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {selectedProject.description}
                    </p>
                  ) : null}
                </div>
                  <button
                    type="button"
                    className={`rounded-xl bg-white/5 p-2 ${isDark ? 'text-slate-400' : 'text-slate-500'} hover:bg-white/10 hover:${isDark ? 'text-slate-100' : 'text-slate-900'} transition-all ring-1 ring-white/10`}
                    onClick={() => setSelectedProject(null)}
                  >
                  ✕
                </button>
              </div>

              <div className="mt-8">
                <div className="text-xs font-black uppercase tracking-widest text-violet-500">
                  Technology Stack
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedProject.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg bg-violet-600/10 border border-violet-500/20 px-3 py-1.5 text-xs font-bold text-violet-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {selectedProject.links?.live || selectedProject.links?.github ? (
                <div className="mt-10 flex flex-wrap gap-4">
                  {selectedProject.links?.live ? (
                    <a
                        className={`rounded-xl bg-violet-600 px-6 py-3 text-sm font-black uppercase tracking-widest ${isDark ? 'text-slate-100' : 'text-slate-900'} shadow-lg shadow-violet-600/30 transition hover:bg-violet-500 active:scale-[0.98]`}
                      href={selectedProject.links.live}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live Demo ⚡
                    </a>
                  ) : null}
                  {selectedProject.links?.github ? (
                    <a
                        className={`rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-black uppercase tracking-widest ${isDark ? 'text-slate-100' : 'text-slate-900'} transition hover:bg-white/10 active:scale-[0.98]`}
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Source Code
                    </a>
                  ) : null}
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {photoOpen ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPhotoOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl"
              initial={{ scale: 0.97, y: 12, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
                <div className={`text-sm font-medium ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  {profile?.name ?? 'Profile photo'}
                </div>
                <button
                  type="button"
                  className="rounded-lg border border-white/10 bg-white px-3 py-2 text-sm text-slate-900 hover:bg-slate-50"
                  onClick={() => setPhotoOpen(false)}
                >
                  Close
                </button>
              </div>
              <div className="bg-slate-50 p-4">
                <img
                  src={profilePhoto}
                  alt={profile?.name ? `${profile.name} profile` : 'Profile'}
                  className="mx-auto max-h-[70vh] w-auto rounded-xl object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {contactStatus === 'sent' ? (
          <motion.div
            className="fixed bottom-4 right-4 z-[70] rounded-xl border border-emerald-600/20 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            Message sent successfully.
          </motion.div>
        ) : contactStatus === 'error' ? (
          <motion.div
            className="fixed bottom-4 right-4 z-[70] rounded-xl border border-red-600/20 bg-red-50 px-4 py-3 text-sm text-red-900 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            Couldn’t send. Please try again.
          </motion.div>
        ) : null}
      </AnimatePresence>
      </div>
    </MotionConfig>
  )
}

export default App
