import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SCHEME_STEPS } from '../data/organization'

const ICONS: Record<string, ReactNode> = {
  phone: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  calendar: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  chat: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  handshake: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
    </svg>
  ),
  shield: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  document: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  sparkle: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
}

function getPosition(index: number, total: number, radius: number) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2
  return {
    x: 50 + Math.cos(angle) * radius,
    y: 50 + Math.sin(angle) * radius,
    px: Math.cos(angle) * radius,
    py: Math.sin(angle) * radius,
  }
}

function SchemeNode({
  step,
  index,
  isActive,
  visible,
  onActivate,
  radius,
}: {
  step: (typeof SCHEME_STEPS)[number]
  index: number
  isActive: boolean
  visible: boolean
  onActivate: () => void
  radius: number
}) {
  const pos = getPosition(index, SCHEME_STEPS.length, radius)
  const isLarge = step.full.length > 100

  return (
    <button
      type="button"
      onClick={onActivate}
      onMouseEnter={onActivate}
      className={`absolute transition-all duration-500 ease-out ${
        visible ? 'opacity-100' : 'opacity-0 scale-75'
      } ${isActive ? 'z-30' : 'z-10'}`}
      style={{
        left: `calc(50% + ${pos.px}%)`,
        top: `calc(50% + ${pos.py}%)`,
        transform: 'translate(-50%, -50%)',
        transitionDelay: visible ? `${index * 60}ms` : '0ms',
      }}
    >
      <div
        className={`relative bg-gradient-to-br ${step.color} shadow-xl transition-all duration-500 ease-out flex flex-col items-center justify-center text-center rounded-full aspect-square shrink-0 ${
          isActive
            ? `${isLarge ? 'w-56 h-56' : 'w-48 h-48 sm:w-52 sm:h-52'} p-3 ring-4 ${step.ring} z-20`
            : 'w-14 h-14 opacity-75 hover:opacity-100 hover:scale-110'
        }`}
      >
        <span className={`absolute w-6 h-6 rounded-full bg-night border-2 border-gold text-gold text-[10px] font-bold flex items-center justify-center z-10 transition-all duration-500 ${
          isActive ? '-top-1 -right-1' : '-top-1.5 -right-1.5'
        }`}>
          {step.num}
        </span>

        {isActive ? (
          <div className="text-white animate-fade-up flex flex-col items-center justify-center h-full px-1">
            <div className="mb-1.5 shrink-0">{ICONS[step.icon]}</div>
            <h4 className="font-semibold text-[10px] sm:text-xs leading-tight mb-1.5">{step.title}</h4>
            <p className="text-[8px] sm:text-[9px] leading-snug text-white/90 overflow-y-auto max-h-[55%] scrollbar-none">{step.full}</p>
          </div>
        ) : (
          <div className="text-white flex items-center justify-center">
            {ICONS[step.icon]}
          </div>
        )}
      </div>
    </button>
  )
}

export default function OrganizationScheme() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || paused) return
    let i = 0
    setActive(0)
    const timer = setInterval(() => {
      i = (i + 1) % SCHEME_STEPS.length
      setActive(i)
    }, 4500)
    return () => clearInterval(timer)
  }, [visible, paused])

  const radius = 36
  const highlighted = active

  return (
    <div ref={ref} className="relative">
      {/* Desktop diagram */}
      <div
        className="hidden lg:block relative w-full max-w-5xl mx-auto aspect-square min-h-[520px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); setActive(null) }}
      >
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke="rgba(251,191,36,0.12)"
            strokeWidth="0.4"
            strokeDasharray="2 2"
            className={visible ? 'scheme-orbit' : ''}
          />
          {SCHEME_STEPS.map((_, i) => {
            const pos = getPosition(i, SCHEME_STEPS.length, radius)
            return (
              <line
                key={i}
                x1="50" y1="50" x2={pos.x} y2={pos.y}
                stroke={highlighted === i ? 'rgba(251,191,36,0.7)' : 'rgba(255,255,255,0.06)'}
                strokeWidth={highlighted === i ? 0.5 : 0.2}
                strokeDasharray="1.5 1.5"
                className="transition-all duration-500"
              />
            )
          })}
        </svg>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-900 to-night border-2 border-gold/40 flex flex-col items-center justify-center text-center p-3 shadow-2xl shadow-gold/10 transition-all duration-500 ${visible ? 'scheme-pulse' : 'opacity-0'} ${highlighted !== null ? 'scale-90 opacity-60' : ''}`}>
            <span className="text-2xl mb-1">🎆</span>
            <span className="font-display font-bold text-gold text-sm leading-tight">Салюты</span>
            <span className="text-[9px] text-slate-400 mt-1 leading-snug px-1">
              Организация и проведение эффектного представления
            </span>
          </div>
        </div>

        {SCHEME_STEPS.map((s, i) => (
          <SchemeNode
            key={s.num}
            step={s}
            index={i}
            isActive={highlighted === i}
            visible={visible}
            radius={radius}
            onActivate={() => setActive(i)}
          />
        ))}
      </div>

      <p className="hidden lg:block text-center text-xs text-slate-500 mt-4">
        Наведите на шаг, чтобы увидеть описание
      </p>

      {/* Mobile accordion */}
      <div className="lg:hidden space-y-3">
        {SCHEME_STEPS.map((s, i) => (
          <button
            key={s.num}
            type="button"
            onClick={() => setActive(active === i ? null : i)}
            className={`w-full text-left glass rounded-2xl transition-all duration-300 border-l-4 overflow-hidden ${
              active === i ? `${s.bg} border-gold` : 'border-transparent'
            }`}
          >
            <div className="flex items-center gap-3 p-4">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center text-white shrink-0`}>
                {ICONS[s.icon]}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-gold text-[10px] font-bold">Шаг {s.num}</span>
                <h4 className="font-semibold text-white text-sm leading-snug">{s.title}</h4>
              </div>
              <span className={`text-slate-500 transition-transform duration-300 ${active === i ? 'rotate-180' : ''}`}>▼</span>
            </div>
            <div className={`px-4 overflow-hidden transition-all duration-500 ${active === i ? 'max-h-48 pb-4' : 'max-h-0'}`}>
              <p className="text-xs text-slate-400 leading-relaxed">{s.full}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
