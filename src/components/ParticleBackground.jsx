import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 140
const CONNECTION_DISTANCE = 160
const MOUSE_RADIUS = 220

const DRIFT_SPEED = 0.18
const DRIFT_DAMPING = 0.995
const EDGE_PADDING = 10
const TWINKLE_SPEED_MIN = 0.006
const TWINKLE_SPEED_MAX = 0.018

function createParticle(width, height) {
  const bigStar = Math.random() < 0.12
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * DRIFT_SPEED,
    vy: (Math.random() - 0.5) * DRIFT_SPEED,
    radius: bigStar ? Math.random() * 1.1 + 1.1 : Math.random() * 0.7 + 0.5,
    baseAlpha: bigStar ? 0.35 + Math.random() * 0.35 : 0.08 + Math.random() * 0.22,
    tw: Math.random() * Math.PI * 2,
    twSpeed: TWINKLE_SPEED_MIN + Math.random() * (TWINKLE_SPEED_MAX - TWINKLE_SPEED_MIN),
    hueShift: Math.random(),
  }
}

export default function ParticleBackground() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef([])
  const animationRef = useRef(null)
  const hoverRef = useRef(0)
  const frameRef = useRef({ sampleStart: 0, frames: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let width = window.innerWidth
    let height = window.innerHeight

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(width, height),
      )
    }

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      hoverRef.current = Math.min(1, hoverRef.current + 0.08)
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
      hoverRef.current = 0
    }

    const draw = (ts) => {
      ctx.clearRect(0, 0, width, height)

      const particles = particlesRef.current
      const mouse = mouseRef.current
      const hoverStrength = hoverRef.current

      let linksDrawn = 0
      let nearMouseCount = 0
      let avgSpeed = 0

      particles.forEach((particle) => {
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < MOUSE_RADIUS && dist > 0) {
          nearMouseCount += 1
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
          const pull = force * 0.012
          particle.vx += (dx / dist) * pull
          particle.vy += (dy / dist) * pull
        }

        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < -EDGE_PADDING) particle.x = width + EDGE_PADDING
        if (particle.x > width + EDGE_PADDING) particle.x = -EDGE_PADDING
        if (particle.y < -EDGE_PADDING) particle.y = height + EDGE_PADDING
        if (particle.y > height + EDGE_PADDING) particle.y = -EDGE_PADDING

        particle.vx *= DRIFT_DAMPING
        particle.vy *= DRIFT_DAMPING

        particle.tw += particle.twSpeed
        const twinkle = 0.6 + 0.4 * (0.5 + 0.5 * Math.sin(particle.tw))

        const mouseGlow = Math.max(0, 1 - dist / MOUSE_RADIUS) * hoverStrength
        const alpha = Math.min(1, particle.baseAlpha * twinkle + mouseGlow * 0.25)

        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
        avgSpeed += speed

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius + mouseGlow * 1.2, 0, Math.PI * 2)
        const cool = particle.hueShift < 0.18 ? 1 : 0
        const r = cool ? 210 : 255
        const g = cool ? 230 : 255
        const b = 255
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
        ctx.fill()
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DISTANCE) {
            const midX = (a.x + b.x) / 2
            const midY = (a.y + b.y) / 2
            const mouseDx = mouse.x - midX
            const mouseDy = mouse.y - midY
            const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy)
            const mouseGlow = Math.max(0, 1 - mouseDist / MOUSE_RADIUS) * hoverStrength
            if (mouseGlow <= 0) continue

            const distGlow = 1 - dist / CONNECTION_DISTANCE
            const lineAlpha = Math.min(0.9, mouseGlow * mouseGlow * distGlow * 0.95)

            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(120, 185, 255, ${lineAlpha})`
            ctx.lineWidth = 0.6 + mouseGlow * 1.6
            ctx.stroke()
            linksDrawn += 1
          }
        }
      }

      // #region agent log
      if (!frameRef.current.sampleStart) frameRef.current.sampleStart = ts || performance.now()
      frameRef.current.frames += 1
      const now = ts || performance.now()
      const elapsed = now - frameRef.current.sampleStart
      if (elapsed >= 1000) {
        const fps = Math.round((frameRef.current.frames / elapsed) * 1000)
        const avgSpd = avgSpeed / Math.max(1, particles.length)
        fetch('http://127.0.0.1:7623/ingest/b30aa329-8241-45a8-8300-9877bd1e755a',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'d62d27'},body:JSON.stringify({sessionId:'d62d27',runId:'pre-fix',hypothesisId:'A',location:'ParticleBackground.jsx:draw',message:'frame sample',data:{fps,particles:particles.length,linksDrawn,nearMouseCount,hoverStrength:Number(hoverStrength.toFixed(2)),avgSpeed:Number(avgSpd.toFixed(3)),mouseX:Math.round(mouse.x),mouseY:Math.round(mouse.y)},timestamp:Date.now()})}).catch(()=>{});
        frameRef.current.sampleStart = now
        frameRef.current.frames = 0
      }
      // #endregion

      animationRef.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    draw(performance.now())

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
}
