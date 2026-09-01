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

export default function OrganizationScheme() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const timer = setInterval(() => {
      setActive((a) => (a + 1) % SCHEME_STEPS.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [visible])

  const radius = 36

  return (
    <div ref={ref} className="relative">
      {/* Desktop circular scheme */}
      <div className="hidden lg:block relative w-full max-w-3xl mx-auto aspect-square">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(251,191,36,0.1)" strokeWidth="0.3" strokeDasharray="2 2" className={visible ? 'scheme-orbit' : ''} />
          {SCHEME_STEPS.map((_, i) => {
            const pos = getPosition(i, SCHEME_STEPS.length, radius)
            return (
              <line
                key={i}
                x1="50" y1="50" x2={pos.x} y2={pos.y}
                stroke={active === i ? 'rgba(251,191,36,0.6)' : 'rgba(255,255,255,0.08)'}
                strokeWidth={active === i ? 0.4 : 0.2}
                strokeDasharray="1 1"
                className="transition-all duration-700"
                style={{
                  strokeDashoffset: visible ? 0 : 100,
                  transition: `stroke 0.7s, stroke-dashoffset 1s ${i * 0.15}s`,
                }}
              />
            )
          })}
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`relative z-10 w-44 h-44 rounded-full bg-gradient-to-br from-indigo-900 to-night border-2 border-gold/30 flex flex-col items-center justify-center text-center p-4 shadow-2xl shadow-gold/10 ${visible ? 'scheme-pulse' : 'opacity-0'}`}>
            <span className="text-3xl mb-1">🎆</span>
            <span className="font-display font-bold text-gold text-sm leading-tight">Салюты</span>
            <span className="text-[10px] text-slate-400 mt-1 leading-snug">Организация и проведение эффектного представления</span>
          </div>
        </div>

        {SCHEME_STEPS.map((step, i) => {
          const pos = getPosition(i, SCHEME_STEPS.length, radius)
          const isActive = active === i
          return (
            <button
              key={step.num}
              type="button"
              onClick={() => setActive(i)}
              className={`absolute w-36 transition-all duration-700 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
              style={{
                left: `calc(50% + ${pos.px}% - 4.5rem)`,
                top: `calc(50% + ${pos.py}% - 3rem)`,
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <div className={`relative rounded-2xl p-3 text-center bg-gradient-to-br ${step.color} shadow-lg transition-all duration-500 ${isActive ? `ring-2 ${step.ring} scale-110 z-20` : 'opacity-80 hover:opacity-100'}`}>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-night border-2 border-gold text-gold text-xs font-bold flex items-center justify-center">
                  {step.num}
                </span>
                <div className="text-white mb-1 flex justify-center">{ICONS[step.icon]}</div>
                <p className="text-white text-[11px] font-semibold leading-tight">{step.title}</p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Mobile vertical timeline */}
      <div className="lg:hidden space-y-0">
        {SCHEME_STEPS.map((step, i) => (
          <div
            key={step.num}
            className={`flex gap-4 transition-all duration-500 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                {step.num}
              </div>
              {i < SCHEME_STEPS.length - 1 && (
                <div className="w-0.5 flex-1 bg-gradient-to-b from-gold/40 to-transparent my-1 min-h-8" />
              )}
            </div>
            <div className="pb-6">
              <h4 className="font-semibold text-white text-sm mb-1">{step.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{step.short}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Active step detail */}
      <div className={`mt-8 glass rounded-2xl p-6 text-center transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${SCHEME_STEPS[active].color} flex items-center justify-center text-white text-sm font-bold`}>
            {SCHEME_STEPS[active].num}
          </span>
          <h4 className="font-semibold text-white">{SCHEME_STEPS[active].title}</h4>
        </div>
        <p key={active} className="text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto animate-fade-up">
          {SCHEME_STEPS[active].full}
        </p>
        <div className="flex justify-center gap-1.5 mt-4">
          {SCHEME_STEPS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-gold' : 'w-1.5 bg-white/20'}`}
              aria-label={`Шаг ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
