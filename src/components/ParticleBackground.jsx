import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 80
const CONNECTION_DISTANCE = 150
const MOUSE_RADIUS = 180

function createParticle(width, height) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    radius: Math.random() * 1.5 + 1,
  }
}

export default function ParticleBackground() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef([])
  const animationRef = useRef(null)

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
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      const particles = particlesRef.current
      const mouse = mouseRef.current

      particles.forEach((particle) => {
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
          particle.vx -= (dx / dist) * force * 0.15
          particle.vy -= (dy / dist) * force * 0.15
        }

        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > width) particle.vx *= -1
        if (particle.y < 0 || particle.y > height) particle.vy *= -1

        particle.vx *= 0.99
        particle.vy *= 0.99

        const mouseGlow = Math.max(0, 1 - dist / MOUSE_RADIUS)
        const alpha = 0.3 + mouseGlow * 0.7

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius + mouseGlow * 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(100, 160, 255, ${alpha})`
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
            const mouseGlow = Math.max(0, 1 - mouseDist / MOUSE_RADIUS)
            const lineAlpha = (1 - dist / CONNECTION_DISTANCE) * (0.15 + mouseGlow * 0.5)

            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(80, 140, 255, ${lineAlpha})`
            ctx.lineWidth = 0.8 + mouseGlow * 1.2
            ctx.stroke()
          }
        }
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
}
