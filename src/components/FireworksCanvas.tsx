import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  decay: number
  color: string
  size: number
}

interface Rocket {
  x: number
  y: number
  vy: number
  targetY: number
  color: string
  trail: { x: number; y: number; alpha: number }[]
}

const COLORS = [
  '#fbbf24', '#f59e0b', '#ef4444', '#f97316',
  '#a855f7', '#ec4899', '#22d3ee', '#34d399',
]

function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}

export default function FireworksCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const rockets: Rocket[] = []
    const particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const spawnRocket = () => {
      rockets.push({
        x: Math.random() * canvas.width * 0.8 + canvas.width * 0.1,
        y: canvas.height,
        vy: -(Math.random() * 3 + 5),
        targetY: Math.random() * canvas.height * 0.45 + canvas.height * 0.05,
        color: randomColor(),
        trail: [],
      })
    }

    const explode = (x: number, y: number, color: string) => {
      const count = Math.floor(Math.random() * 40 + 60)
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3
        const speed = Math.random() * 4 + 2
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: Math.random() * 0.015 + 0.01,
          color: Math.random() > 0.3 ? color : randomColor(),
          size: Math.random() * 2 + 1,
        })
      }
    }

    let spawnTimer = 0

    const animate = () => {
      ctx.fillStyle = 'rgba(6, 6, 15, 0.2)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      spawnTimer++
      if (spawnTimer > 60 + Math.random() * 80) {
        spawnRocket()
        if (Math.random() > 0.5) spawnRocket()
        spawnTimer = 0
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i]
        r.trail.push({ x: r.x, y: r.y, alpha: 1 })
        if (r.trail.length > 12) r.trail.shift()

        r.y += r.vy
        r.vy *= 0.98

        for (const t of r.trail) {
          t.alpha *= 0.85
          ctx.beginPath()
          ctx.arc(t.x, t.y, 1.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(251, 191, 36, ${t.alpha * 0.6})`
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = r.color
        ctx.fill()

        if (r.y <= r.targetY || r.vy > -0.5) {
          explode(r.x, r.y, r.color)
          rockets.splice(i, 1)
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.04
        p.vx *= 0.99
        p.alpha -= p.decay

        if (p.alpha <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        const [r, g, b] = hexToRgb(p.color)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha * 0.15})`
        ctx.fill()
      }

      animId = requestAnimationFrame(animate)
    }

    ctx.fillStyle = '#06060f'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [255, 255, 255]
}
