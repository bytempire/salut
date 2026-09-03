import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SCHEME_STEPS } from '../data/organization'
import { IconFirework } from './Icons'

const ICONS: Record<string, ReactNode> = {
  phone: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  calendar: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  chat: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  handshake: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
    </svg>
  ),
  shield: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  document: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  sparkle: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
}

const CX = 200
const CY = 200
const RING_RADII = [48, 68, 88, 108, 128, 148]
const ARC_SWEEP = 48 // degrees of coloured arc
const LABEL_R = 195

function degToRad(d: number) {
  return (d * Math.PI) / 180
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const a = degToRad(deg)
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
}

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const start = polar(cx, cy, r, startDeg)
  const end = polar(cx, cy, r, endDeg)
  const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0
  const sweep = endDeg > startDeg ? 1 : 0
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} ${sweep} ${end.x} ${end.y}`
}

function calloutSide(angle: number): 'left' | 'right' {
  const a = ((angle % 360) + 360) % 360
  return a > 90 && a < 270 ? 'left' : 'right'
}

export default function OrganizationScheme() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(0)
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
    const timer = setInterval(() => {
      setActive((a) => (a + 1) % SCHEME_STEPS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [visible, paused])

  return (
    <div ref={ref} className="relative">
      {/* Desktop concentric chart */}
      <div
        className="hidden lg:block relative mx-auto max-w-5xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className={`relative rounded-[2rem] overflow-hidden transition-opacity duration-700 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              'radial-gradient(ellipse at 40% 50%, #1a1a24 0%, #0c0c14 55%, #08080f 100%)',
          }}
        >
          {/* subtle grain */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            }}
          />

          <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-6 py-10">
            {/* Left callouts */}
            <div className="flex flex-col gap-6 justify-center py-4">
              {SCHEME_STEPS.filter((s) => calloutSide(s.angle) === 'left')
                .sort((a, b) => a.angle - b.angle)
                .map((step) => {
                  const i = SCHEME_STEPS.findIndex((s) => s.num === step.num)
                  const isActive = active === i
                  return (
                    <Callout
                      key={step.num}
                      step={step}
                      side="left"
                      isActive={isActive}
                      onHover={() => setActive(i)}
                    />
                  )
                })}
            </div>

            {/* Chart */}
            <div className="relative w-[400px] h-[400px] shrink-0">
              <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible">
                {/* Concentric guide rings */}
                {RING_RADII.map((r) => (
                  <circle
                    key={r}
                    cx={CX}
                    cy={CY}
                    r={r}
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth={1}
                  />
                ))}

                {/* Coloured arcs + leader lines */}
                {SCHEME_STEPS.map((step, i) => {
                  const r = RING_RADII[step.ring - 1] ?? RING_RADII[RING_RADII.length - 1]
                  const start = step.angle - ARC_SWEEP / 2
                  const end = step.angle + ARC_SWEEP / 2
                  const mid = polar(CX, CY, r, step.angle)
                  const elbow = polar(CX, CY, LABEL_R - 10, step.angle)
                  const side = calloutSide(step.angle)
                  const labelEndX = side === 'right' ? 385 : 15
                  const isActive = active === i

                  return (
                    <g
                      key={step.num}
                      className="cursor-pointer transition-opacity duration-300"
                      style={{ opacity: isActive ? 1 : 0.45 }}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => setActive(i)}
                    >
                      {/* Arc track highlight */}
                      <path
                        d={arcPath(CX, CY, r, start, end)}
                        fill="none"
                        stroke={step.color}
                        strokeWidth={isActive ? 14 : 11}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                        style={{
                          filter: isActive ? `drop-shadow(0 0 8px ${step.color}88)` : undefined,
                        }}
                      />
                      {/* Step number on arc */}
                      <text
                        x={mid.x}
                        y={mid.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#0c0c14"
                        fontSize={isActive ? 13 : 11}
                        fontWeight={700}
                        className="pointer-events-none select-none transition-all duration-300"
                      >
                        {step.num}
                      </text>
                      {/* Anchor dot */}
                      <circle cx={mid.x} cy={mid.y} r={isActive ? 4 : 0} fill={step.color} className="transition-all duration-300" />
                      {/* Leader line: arc → elbow → side */}
                      <path
                        d={`M ${mid.x} ${mid.y} L ${elbow.x} ${elbow.y} L ${labelEndX} ${elbow.y}`}
                        fill="none"
                        stroke={step.color}
                        strokeWidth={isActive ? 1.5 : 0.8}
                        strokeOpacity={isActive ? 0.9 : 0.25}
                        className="transition-all duration-500"
                      />
                      <circle
                        cx={labelEndX}
                        cy={elbow.y}
                        r={3}
                        fill={step.color}
                        opacity={isActive ? 1 : 0.3}
                        className="transition-opacity duration-500"
                      />
                    </g>
                  )
                })}

                {/* Centre hub */}
                <circle cx={CX} cy={CY} r={36} fill="#12121c" stroke="rgba(251,191,36,0.35)" strokeWidth={1.5} />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex flex-col items-center text-center w-16">
                  <IconFirework size={22} className="text-gold mb-0.5" />
                  <span className="font-display font-bold text-gold text-[11px] leading-tight">Салюты</span>
                </div>
              </div>
            </div>

            {/* Right callouts */}
            <div className="flex flex-col gap-6 justify-center py-4">
              {SCHEME_STEPS.filter((s) => calloutSide(s.angle) === 'right')
                .sort((a, b) => a.angle - b.angle)
                .map((step) => {
                  const i = SCHEME_STEPS.findIndex((s) => s.num === step.num)
                  const isActive = active === i
                  return (
                    <Callout
                      key={step.num}
                      step={step}
                      side="right"
                      isActive={isActive}
                      onHover={() => setActive(i)}
                    />
                  )
                })}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-4">
          Наведите на дугу или описание, чтобы выделить шаг
        </p>
      </div>

      {/* Mobile timeline */}
      <div className="lg:hidden space-y-3">
        {SCHEME_STEPS.map((step, i) => (
          <button
            key={step.num}
            type="button"
            onClick={() => setActive(active === i ? -1 : i)}
            className="w-full text-left rounded-2xl transition-all duration-300 overflow-hidden border"
            style={{
              borderColor: active === i ? step.color : 'rgba(255,255,255,0.06)',
              background: active === i ? `${step.color}14` : 'rgba(255,255,255,0.03)',
            }}
          >
            <div className="flex items-center gap-3 p-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-night font-bold text-sm shrink-0"
                style={{ background: step.color }}
              >
                {step.num}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm leading-snug" style={{ color: step.color }}>
                  {step.title}
                </h4>
              </div>
              <svg
                className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${active === i ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
              </svg>
            </div>
            <div className={`px-4 overflow-hidden transition-all duration-500 ${active === i ? 'max-h-40 pb-4' : 'max-h-0'}`}>
              <p className="text-xs text-slate-400 leading-relaxed">{step.full}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function Callout({
  step,
  side,
  isActive,
  onHover,
}: {
  step: (typeof SCHEME_STEPS)[number]
  side: 'left' | 'right'
  isActive: boolean
  onHover: () => void
}) {
  return (
    <button
      type="button"
      onMouseEnter={onHover}
      onFocus={onHover}
      className={`text-left transition-all duration-500 max-w-[220px] ${
        side === 'left' ? 'ml-auto' : 'mr-auto'
      } ${isActive ? 'opacity-100 translate-x-0' : 'opacity-40'}`}
    >
      <div className={`flex items-center gap-2 mb-1.5 ${side === 'left' ? 'flex-row-reverse' : ''}`}>
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
          style={{ background: `${step.color}22`, color: step.color }}
        >
          {ICONS[step.icon]}
        </span>
        <span className="text-[10px] font-bold tracking-wide" style={{ color: step.color }}>
          Шаг {step.num}
        </span>
      </div>
      <h4
        className={`font-semibold text-sm leading-snug mb-1 ${side === 'left' ? 'text-right' : 'text-left'}`}
        style={{ color: isActive ? step.color : '#e2e8f0' }}
      >
        {step.title}
      </h4>
      <p
        className={`text-[11px] leading-relaxed text-slate-400 transition-all duration-500 ${
          side === 'left' ? 'text-right' : 'text-left'
        } ${isActive ? 'max-h-28 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        {step.full}
      </p>
    </button>
  )
}
