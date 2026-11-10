"use client"

import React, { useRef, useEffect, useState, useCallback } from "react"
import { Sparkles, RefreshCw, Move, Zap } from "lucide-react"
import { playSound } from "@/components/sound/audio-engine"

interface TechBadge {
  id: string
  label: string
  category: "core" | "state" | "styling" | "infra"
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  pillHeight: number
  color: string
  borderColor: string
  textColor: string
}

const ALL_TECH_ITEMS = [
  { label: "React 19", category: "core", color: "rgba(16, 185, 129, 0.15)", border: "#10b981", text: "#34d399" },
  { label: "Flutter", category: "core", color: "rgba(2, 86, 155, 0.22)", border: "#02569B", text: "#54c5f8" },
  { label: "Dart", category: "core", color: "rgba(1, 117, 194, 0.22)", border: "#0175C2", text: "#40c4ff" },
  { label: "Next.js 16", category: "core", color: "rgba(255, 255, 255, 0.12)", border: "#ffffff", text: "#ffffff" },
  { label: "TypeScript", category: "core", color: "rgba(59, 130, 246, 0.18)", border: "#3b82f6", text: "#60a5fa" },
  { label: "Bug Fixing", category: "core", color: "rgba(239, 68, 68, 0.22)", border: "#ef4444", text: "#f87171" },
  { label: "API Integration", category: "state", color: "rgba(16, 185, 129, 0.2)", border: "#10b981", text: "#34d399" },
  { label: "RTK Query", category: "state", color: "rgba(168, 85, 247, 0.18)", border: "#a855f7", text: "#c084fc" },
  { label: "Redux Toolkit", category: "state", color: "rgba(139, 92, 246, 0.18)", border: "#8b5cf6", text: "#a78bfa" },
  { label: "Tailwind v4", category: "styling", color: "rgba(6, 182, 212, 0.18)", border: "#06b6d4", text: "#22d3ee" },
  { label: "Cross-Platform UI", category: "styling", color: "rgba(168, 85, 247, 0.2)", border: "#a855f7", text: "#d8b4fe" },
  { label: "Three.js", category: "styling", color: "rgba(245, 158, 11, 0.18)", border: "#f59e0b", text: "#fbbf24" },
  { label: "TanStack Query", category: "state", color: "rgba(239, 68, 68, 0.18)", border: "#ef4444", text: "#f87171" },
  { label: "MongoDB", category: "infra", color: "rgba(34, 197, 94, 0.18)", border: "#22c55e", text: "#4ade80" },
  { label: "Firebase RTDB", category: "infra", color: "rgba(245, 158, 11, 0.18)", border: "#f59e0b", text: "#fcd34d" },
  { label: "Vite", category: "core", color: "rgba(192, 132, 252, 0.18)", border: "#c084fc", text: "#e879f9" },
  { label: "REST APIs", category: "state", color: "rgba(14, 165, 233, 0.18)", border: "#0ea5e9", text: "#38bdf8" },
  { label: "Docker", category: "infra", color: "rgba(59, 130, 246, 0.18)", border: "#3b82f6", text: "#93c5fd" },
  { label: "Git & CI/CD", category: "infra", color: "rgba(249, 115, 22, 0.18)", border: "#f97316", text: "#fb923c" },
  { label: "HTML5 / CSS3", category: "styling", color: "rgba(234, 88, 12, 0.18)", border: "#ea580c", text: "#fdba74" },
  { label: "Radix UI Primitives", category: "styling", color: "rgba(236, 72, 153, 0.18)", border: "#ec4899", text: "#f472b6" },
]

export default function TechSandbox() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [gravityMode, setGravityMode] = useState<"zero" | "orbit" | "earth">("zero")
  const [activeItemCount, setActiveItemCount] = useState(ALL_TECH_ITEMS.length)
  const [lastInteracted, setLastInteracted] = useState<string>("Touch or drag badges")
  const [isMobile, setIsMobile] = useState(false)

  // State refs for animation loop
  const badgesRef = useRef<TechBadge[]>([])
  const draggedBadge = useRef<TechBadge | null>(null)
  const mousePos = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 })
  const gravityRef = useRef<"zero" | "orbit" | "earth">("zero")
  const animationFrameId = useRef<number | null>(null)
  const dprRef = useRef<number>(1)

  useEffect(() => {
    gravityRef.current = gravityMode
  }, [gravityMode])

  // Initialize badges with screen-adaptive counts and compact radii
  const initBadges = useCallback((width: number, height: number) => {
    const mobile = width < 768
    setIsMobile(mobile)

    // On mobile, pick 14 high-impact badges so the 2D surface has ample breathing room
    const items = mobile
      ? ALL_TECH_ITEMS.slice(0, 14)
      : ALL_TECH_ITEMS

    const cols = mobile ? 2 : 4
    const rows = Math.ceil(items.length / cols)
    const cellW = width / cols
    const cellH = height / rows

    const badges: TechBadge[] = items.map((item, idx) => {
      // Adaptive radius & pill height for mobile vs desktop
      const radius = mobile
        ? Math.max(26, item.label.length * 3.3 + 12)
        : Math.max(36, item.label.length * 4.4 + 16)
      const pillHeight = mobile ? 28 : 34

      const col = idx % cols
      const row = Math.floor(idx / cols)

      const x = cellW * col + cellW * 0.5 + (Math.random() - 0.5) * 30
      const y = cellH * row + cellH * 0.5 + (Math.random() - 0.5) * 30

      return {
        id: `badge-${idx}`,
        label: item.label,
        category: item.category as any,
        x: Math.max(radius + 4, Math.min(width - radius - 4, x)),
        y: Math.max(pillHeight, Math.min(height - pillHeight, y)),
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius,
        pillHeight,
        color: item.color,
        borderColor: item.border,
        textColor: item.text,
      }
    })

    badgesRef.current = badges
    setActiveItemCount(badges.length)
  }, [])

  // Agitate / Explosion Impulse
  const handleAgitate = () => {
    playSound("snap")
    setLastInteracted("Turbulence Blast Applied ⚡")
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    badgesRef.current.forEach((badge) => {
      const dx = badge.x - centerX
      const dy = badge.y - centerY
      const dist = Math.sqrt(dx * dx + dy * dy) || 1
      const force = isMobile ? 6 + Math.random() * 6 : 9 + Math.random() * 9
      badge.vx += (dx / dist) * force
      badge.vy += (dy / dist) * force
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    dprRef.current = dpr

    let width = container.clientWidth
    let height = Math.max(500, container.clientHeight)

    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    initBadges(width, height)

    const handleResize = () => {
      if (!canvas || !container) return
      width = container.clientWidth
      height = Math.max(500, container.clientHeight)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)

      badgesRef.current.forEach((b) => {
        b.x = Math.max(b.radius + 2, Math.min(width - b.radius - 2, b.x))
        b.y = Math.max(b.pillHeight + 2, Math.min(height - b.pillHeight - 2, b.y))
      })
    }

    window.addEventListener("resize", handleResize)

    // Physics Engine Loop
    const loop = () => {
      ctx.clearRect(0, 0, width, height)

      // Background subtle cyber grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.025)"
      ctx.lineWidth = 1
      const step = 40
      for (let x = 0; x < width; x += step) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Physics constants
      const currentGravity = gravityRef.current
      let gravityY = 0
      if (currentGravity === "earth") gravityY = 0.35
      else if (currentGravity === "orbit") gravityY = 0.07

      const friction = 0.985
      const bounce = 0.78
      const badges = badgesRef.current
      const time = Date.now() * 0.001

      // Update positions & collisions
      for (let i = 0; i < badges.length; i++) {
        const b = badges[i]

        if (b !== draggedBadge.current) {
          // Zero-G continuous cosmic ambient drift:
          // Guarantees badges are ALWAYS gracefully floating & never look frozen
          if (currentGravity === "zero") {
            const ambientAngle = time * 0.7 + i * 1.3
            b.vx += Math.cos(ambientAngle) * 0.04
            b.vy += Math.sin(ambientAngle) * 0.04
          } else {
            b.vy += gravityY
          }

          // Apply velocity
          b.x += b.vx
          b.y += b.vy

          // Drag / friction
          b.vx *= friction
          b.vy *= friction

          // Wall Collisions
          if (b.x - b.radius < 0) {
            b.x = b.radius
            b.vx = -b.vx * bounce
          } else if (b.x + b.radius > width) {
            b.x = width - b.radius
            b.vx = -b.vx * bounce
          }

          if (b.y - b.pillHeight / 2 < 0) {
            b.y = b.pillHeight / 2
            b.vy = -b.vy * bounce
          } else if (b.y + b.pillHeight / 2 > height) {
            b.y = height - b.pillHeight / 2
            b.vy = -b.vy * bounce
            b.vx *= 0.94
          }
        } else {
          // Being dragged: compute drag velocity
          b.vx = (mousePos.current.x - mousePos.current.prevX) * 0.75
          b.vy = (mousePos.current.y - mousePos.current.prevY) * 0.75
          b.x = mousePos.current.x
          b.y = mousePos.current.y
        }

        // Inter-badge collisions (Elastic rigid-body)
        for (let j = i + 1; j < badges.length; j++) {
          const b2 = badges[j]
          const dx = b2.x - b.x
          const dy = b2.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const minDist = b.radius + b2.radius + 4

          if (dist < minDist && dist > 0) {
            const overlap = (minDist - dist) * 0.5
            const nx = dx / dist
            const ny = dy / dist

            if (b !== draggedBadge.current) {
              b.x -= nx * overlap
              b.y -= ny * overlap
            }
            if (b2 !== draggedBadge.current) {
              b2.x += nx * overlap
              b2.y += ny * overlap
            }

            const kx = b.vx - b2.vx
            const ky = b.vy - b2.vy
            const p = (2 * (nx * kx + ny * ky)) / 2

            if (b !== draggedBadge.current) {
              b.vx -= p * nx * bounce
              b.vy -= p * ny * bounce
            }
            if (b2 !== draggedBadge.current) {
              b2.vx += p * nx * bounce
              b2.vy += p * ny * bounce
            }
          }
        }
      }

      // Render badges
      badges.forEach((b) => {
        const isDragged = b === draggedBadge.current
        const pillWidth = b.radius * 2
        const pillHeight = b.pillHeight
        const cornerRadius = pillHeight / 2

        ctx.save()
        ctx.translate(b.x, b.y)

        // Glow when dragged or high velocity
        const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy)
        if (isDragged || speed > 3) {
          ctx.shadowColor = b.borderColor
          ctx.shadowBlur = isDragged ? 22 : 12
        }

        // Pill Background
        ctx.beginPath()
        ctx.roundRect(-pillWidth / 2, -pillHeight / 2, pillWidth, pillHeight, cornerRadius)
        ctx.fillStyle = isDragged ? "rgba(255, 255, 255, 0.22)" : b.color
        ctx.fill()

        // Border
        ctx.lineWidth = isDragged ? 2 : 1.2
        ctx.strokeStyle = isDragged ? "#ffffff" : b.borderColor
        ctx.stroke()

        // Tiny LED indicator dot
        ctx.beginPath()
        ctx.arc(-pillWidth / 2 + (b.pillHeight > 30 ? 14 : 10), 0, b.pillHeight > 30 ? 3 : 2.5, 0, Math.PI * 2)
        ctx.fillStyle = b.borderColor
        ctx.shadowColor = b.borderColor
        ctx.shadowBlur = 6
        ctx.fill()

        // Badge Text
        ctx.shadowBlur = 0
        ctx.fillStyle = b.textColor
        ctx.font = b.pillHeight > 30
          ? "600 12px var(--font-mono, monospace)"
          : "600 10.5px var(--font-mono, monospace)"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(b.label, 5, 0.5)

        ctx.restore()
      })

      mousePos.current.prevX = mousePos.current.x
      mousePos.current.prevY = mousePos.current.y

      animationFrameId.current = requestAnimationFrame(loop)
    }

    animationFrameId.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current)
    }
  }, [initBadges])

  // Universal Pointer Event Handlers (Works on Mouse, Touch, Stylus)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    mousePos.current.x = x
    mousePos.current.y = y
    mousePos.current.prevX = x
    mousePos.current.prevY = y

    // Check hit on badge
    let hitBadge: TechBadge | null = null
    for (let i = badgesRef.current.length - 1; i >= 0; i--) {
      const b = badgesRef.current[i]
      const dx = x - b.x
      const dy = y - b.y
      if (Math.abs(dx) <= b.radius + 6 && Math.abs(dy) <= b.pillHeight / 2 + 6) {
        hitBadge = b
        break
      }
    }

    if (hitBadge) {
      draggedBadge.current = hitBadge
      setLastInteracted(`Grabbed: ${hitBadge.label}`)
      playSound("tick")
      try {
        canvas.setPointerCapture(e.pointerId)
      } catch {}
    }
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    mousePos.current.x = e.clientX - rect.left
    mousePos.current.y = e.clientY - rect.top
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (draggedBadge.current) {
      playSound("snap")
      setLastInteracted(`Flinged: ${draggedBadge.current.label}`)
    }
    const canvas = canvasRef.current
    if (canvas) {
      try {
        canvas.releasePointerCapture(e.pointerId)
      } catch {}
    }
    draggedBadge.current = null
  }

  return (
    <section id="sandbox" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 border-b border-white/10 overflow-hidden bg-black/40">
      {/* Ambient background volumetric glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Section 03 // Physics Engine</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-foreground">
              Zero-Gravity Tech Sandbox
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-xl">
              Skill badges behave as interactive physical rigid bodies with elastic collisions. Touch, drag, fling, or switch gravitational fields.
            </p>
          </div>

          {/* Interactive Physics Control Bar */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl">
            <button
              onClick={() => {
                setGravityMode("zero")
                playSound("tick")
              }}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                gravityMode === "zero"
                  ? "bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-500/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Zero-G
            </button>
            <button
              onClick={() => {
                setGravityMode("orbit")
                playSound("tick")
              }}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                gravityMode === "orbit"
                  ? "bg-cyan-500 text-black font-semibold shadow-lg shadow-cyan-500/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Lunar
            </button>
            <button
              onClick={() => {
                setGravityMode("earth")
                playSound("tick")
              }}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                gravityMode === "earth"
                  ? "bg-amber-500 text-black font-semibold shadow-lg shadow-amber-500/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Earth (9.8)
            </button>
            <div className="w-[1px] h-5 bg-white/10 mx-0.5" />
            <button
              onClick={handleAgitate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-white font-mono text-xs border border-white/10 transition-colors cursor-pointer active:scale-95"
              title="Apply impulse blast"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin-reverse" />
              <span>Agitate ⚡</span>
            </button>
          </div>
        </div>

        {/* Sandbox Canvas Container */}
        <div
          ref={containerRef}
          className="relative w-full h-[380px] sm:h-[460px] lg:h-[520px] rounded-3xl border border-white/10 bg-zinc-950/70 backdrop-blur-2xl shadow-2xl overflow-hidden group touch-pan-y"
        >
          {/* Canvas with Universal Pointer Events */}
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="w-full h-full cursor-grab active:cursor-grabbing block touch-none"
          />

          {/* Interactive overlay telemetry indicators */}
          <div className="absolute top-4 left-5 pointer-events-none flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-[11px] text-zinc-400 tracking-wider uppercase">
              Rigid-Bodies: {activeItemCount} Active // 60 FPS
            </span>
          </div>

          <div className="absolute bottom-4 left-5 pointer-events-none">
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              {lastInteracted}
            </span>
          </div>

          <div className="absolute bottom-4 right-5 pointer-events-none flex items-center gap-2 text-zinc-400 font-mono text-xs">
            <Move className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>{isMobile ? "Touch & toss badges" : "Click & Drag to impart velocity"}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
