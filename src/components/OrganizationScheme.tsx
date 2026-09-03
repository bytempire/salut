import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SCHEME_STEPS } from '../data/organization'

const ICONS: Record<string, ReactNode> = {
  phone: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  calendar: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  chat: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  handshake: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
    </svg>
  ),
  shield: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  document: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  sparkle: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
}

const VB = 760
const CX = VB / 2
const CY = VB / 2
const TRACK_R = 200
const LINE_END_R = 255
const HUB_R = 155
const GAP_DEG = 10
const STEP_SWEEP = 360 / SCHEME_STEPS.length - GAP_DEG

function degToRad(d: number) {
  return (d * Math.PI) / 180
}

function polar(r: number, deg: number) {
  const a = degToRad(deg)
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) }
}

function arcPath(r: number, startDeg: number, endDeg: number) {
  const start = polar(r, startDeg)
  const end = polar(r, endDeg)
  const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y}`
}

function stepAngles(i: number) {
  const sector = 360 / SCHEME_STEPS.length
  const mid = -90 + i * sector
  return {
    start: mid - STEP_SWEEP / 2,
    mid,
    end: mid + STEP_SWEEP / 2,
  }
}

function calloutAlign(mid: number): 'left' | 'right' {
  const a = ((mid % 360) + 360) % 360
  if (a >= 90 && a <= 270) return 'right'
  return 'left'
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
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const step = SCHEME_STEPS[active]

  return (
    <div ref={ref} className="relative">
      <div
        className={`hidden lg:block mx-auto max-w-6xl transition-opacity duration-500 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="relative rounded-[2rem] overflow-hidden py-6"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(26,26,36,0.55) 0%, rgba(12,12,20,0.35) 55%, rgba(8,8,15,0.2) 100%)',
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            }}
          />

          <div className="relative mx-auto w-full max-w-[920px] aspect-square">
            <svg viewBox={`0 0 ${VB} ${VB}`} className="w-full h-full">
              <circle cx={CX} cy={CY} r={TRACK_R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={22} />
              <circle cx={CX} cy={CY} r={TRACK_R + 36} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
              <circle cx={CX} cy={CY} r={TRACK_R - 36} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={1} />

              {SCHEME_STEPS.map((s, i) => {
                const { start, mid, end } = stepAngles(i)
                const isActive = active === i
                const arcPt = polar(TRACK_R, mid)
                const endPt = polar(LINE_END_R, mid)
                const align = calloutAlign(mid)
                const stub = align === 'right' ? -20 : 20
                const tipX = endPt.x + stub
                const tipY = endPt.y

                return (
                  <g
                    key={s.num}
                    className="cursor-pointer"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                  >
                    <path
                      d={arcPath(TRACK_R, start, end)}
                      fill="none"
                      stroke="transparent"
                      strokeWidth={36}
                      strokeLinecap="round"
                    />
                    <path
                      d={arcPath(TRACK_R, start, end)}
                      fill="none"
                      stroke={s.color}
                      strokeWidth={isActive ? 20 : 14}
                      strokeLinecap="round"
                      opacity={isActive ? 1 : 0.5}
                      style={{ transition: 'stroke-width 0.2s, opacity 0.2s' }}
                    />
                    <path
                      d={`M ${arcPt.x} ${arcPt.y} L ${endPt.x} ${endPt.y} L ${tipX} ${tipY}`}
                      fill="none"
                      stroke={s.color}
                      strokeWidth={isActive ? 1.75 : 1}
                      strokeOpacity={isActive ? 0.95 : 0.35}
                      style={{ transition: 'stroke-opacity 0.2s, stroke-width 0.2s' }}
                    />
                    <circle cx={tipX} cy={tipY} r={isActive ? 4 : 3} fill={s.color} opacity={isActive ? 1 : 0.45} />
                    <circle
                      cx={arcPt.x}
                      cy={arcPt.y}
                      r={isActive ? 14 : 12}
                      fill="rgba(12,12,20,0.75)"
                      stroke={s.color}
                      strokeWidth={2}
                    />
                    <text
                      x={arcPt.x}
                      y={arcPt.y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill={s.color}
                      fontSize={12}
                      fontWeight={700}
                      className="pointer-events-none select-none"
                    >
                      {s.num}
                    </text>
                  </g>
                )
              })}

              {/* Centre disc — step details live here */}
              <circle
                cx={CX}
                cy={CY}
                r={HUB_R}
                fill="rgba(18,18,28,0.55)"
                stroke={step.color}
                strokeWidth={1.5}
                strokeOpacity={0.45}
                style={{ transition: 'stroke 0.25s' }}
              />
            </svg>

            {/* Centre: full step info */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                key={active}
                className="flex flex-col items-center justify-center text-center px-6 animate-fade-up"
                style={{
                  width: `${((HUB_R - 10) * 2 / VB) * 100}%`,
                  height: `${((HUB_R - 10) * 2 / VB) * 100}%`,
                  borderRadius: '50%',
                }}
              >
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center mb-2.5 shrink-0"
                  style={{ background: `${step.color}28`, color: step.color }}
                >
                  {ICONS[step.icon]}
                </span>
                <span className="text-[11px] font-bold tracking-wide mb-1.5 shrink-0" style={{ color: step.color }}>
                  Шаг {step.num} из 7
                </span>
                <h4 className="font-semibold text-white text-[15px] leading-snug mb-2.5 shrink-0 px-1">
                  {step.title}
                </h4>
                <p className="text-[12px] text-slate-400 leading-relaxed px-1">
                  {step.full}
                </p>
              </div>
            </div>

            {/* Outer callouts */}
            {SCHEME_STEPS.map((s, i) => {
              const { mid } = stepAngles(i)
              const endPt = polar(LINE_END_R, mid)
              const align = calloutAlign(mid)
              const stub = align === 'right' ? -20 : 20
              const tipX = endPt.x + stub
              const tipY = endPt.y
              const isActive = active === i

              return (
                <button
                  key={s.num}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="absolute max-w-[168px] transition-opacity duration-200"
                  style={{
                    left: `${(tipX / VB) * 100}%`,
                    top: `${(tipY / VB) * 100}%`,
                    transform: align === 'right' ? 'translate(-100%, -50%)' : 'translate(0%, -50%)',
                    opacity: isActive ? 1 : 0.55,
                    textAlign: align === 'right' ? 'right' : 'left',
                    paddingLeft: align === 'left' ? 8 : 0,
                    paddingRight: align === 'right' ? 8 : 0,
                  }}
                >
                  <div className={`flex items-center gap-1.5 mb-0.5 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${s.color}22`, color: s.color }}
                    >
                      {ICONS[s.icon]}
                    </span>
                    <span className="text-[9px] font-bold" style={{ color: s.color }}>
                      Шаг {s.num}
                    </span>
                  </div>
                  <h4
                    className="font-semibold text-[11px] leading-snug"
                    style={{ color: isActive ? s.color : '#e2e8f0' }}
                  >
                    {s.title}
                  </h4>
                </button>
              )
            })}
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-4">
          Наведите на сегмент или выноску
        </p>
      </div>

      {/* Mobile */}
      <div className="lg:hidden space-y-3">
        {SCHEME_STEPS.map((s, i) => (
          <button
            key={s.num}
            type="button"
            onClick={() => setActive(active === i ? -1 : i)}
            className="w-full text-left rounded-2xl overflow-hidden border"
            style={{
              borderColor: active === i ? s.color : 'rgba(255,255,255,0.06)',
              background: active === i ? `${s.color}14` : 'rgba(255,255,255,0.03)',
            }}
          >
            <div className="flex items-center gap-3 p-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                style={{ background: s.color, color: '#0c0c14' }}
              >
                {s.num}
              </div>
              <h4 className="font-semibold text-sm leading-snug flex-1" style={{ color: s.color }}>
                {s.title}
              </h4>
            </div>
            {active === i && (
              <p className="px-4 pb-4 text-xs text-slate-400 leading-relaxed">{s.full}</p>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
