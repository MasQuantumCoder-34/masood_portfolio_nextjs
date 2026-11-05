"use client"

import React, { useRef, useEffect, useState, useCallback } from "react"
import { Play, Sparkles, RefreshCw, Move, ShieldCheck } from "lucide-react"
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
  color: string
  borderColor: string
  textColor: string
}

const TECH_ITEMS = [
  { label: "React 19", category: "core", color: "rgba(16, 185, 129, 0.15)", border: "#10b981", text: "#34d399" },
  { label: "Next.js 16", category: "core", color: "rgba(255, 255, 255, 0.12)", border: "#ffffff", text: "#ffffff" },
  { label: "TypeScript", category: "core", color: "rgba(59, 130, 246, 0.15)", border: "#3b82f6", text: "#60a5fa" },
  { label: "RTK Query", category: "state", color: "rgba(168, 85, 247, 0.15)", border: "#a855f7", text: "#c084fc" },
  { label: "Redux Toolkit", category: "state", color: "rgba(139, 92, 246, 0.15)", border: "#8b5cf6", text: "#a78bfa" },
  { label: "Tailwind v4", category: "styling", color: "rgba(6, 182, 212, 0.15)", border: "#06b6d4", text: "#22d3ee" },
  { label: "Three.js", category: "styling", color: "rgba(245, 158, 11, 0.15)", border: "#f59e0b", text: "#fbbf24" },
  { label: "TanStack Query", category: "state", color: "rgba(239, 68, 68, 0.15)", border: "#ef4444", text: "#f87171" },
  { label: "MongoDB", category: "infra", color: "rgba(34, 197, 94, 0.15)", border: "#22c55e", text: "#4ade80" },
  { label: "Firebase RTDB", category: "infra", color: "rgba(245, 158, 11, 0.15)", border: "#f59e0b", text: "#fcd34d" },
  { label: "Vite", category: "core", color: "rgba(192, 132, 252, 0.15)", border: "#c084fc", text: "#e879f9" },
  { label: "REST APIs", category: "state", color: "rgba(14, 165, 233, 0.15)", border: "#0ea5e9", text: "#38bdf8" },
  { label: "Docker", category: "infra", color: "rgba(59, 130, 246, 0.15)", border: "#3b82f6", text: "#93c5fd" },
  { label: "Git & CI/CD", category: "infra", color: "rgba(249, 115, 22, 0.15)", border: "#f97316", text: "#fb923c" },
  { label: "HTML5 / CSS3", category: "styling", color: "rgba(234, 88, 12, 0.15)", border: "#ea580c", text: "#fdba74" },
  { label: "Radix UI Primitives", category: "styling", color: "rgba(236, 72, 153, 0.15)", border: "#ec4899", text: "#f472b6" },
]

export default function TechSandbox() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [gravityMode, setGravityMode] = useState<"zero" | "orbit" | "earth">("zero")
  const [activeItemCount, setActiveItemCount] = useState(TECH_ITEMS.length)
  const [lastInteracted, setLastInteracted] = useState<string>("Click & toss badges")

  // State refs for animation loop
  const badgesRef = useRef<TechBadge[]>([])
  const draggedBadge = useRef<TechBadge | null>(null)
  const mousePos = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 })
  const isMouseDown = useRef(false)
  const gravityRef = useRef<"zero" | "orbit" | "earth">("zero")
  const animationFrameId = useRef<number | null>(null)

  // Keep gravity ref in sync
  useEffect(() => {
    gravityRef.current = gravityMode
  }, [gravityMode])

  // Initialize badges
  const initBadges = useCallback((width: number, height: number) => {
    const badges: TechBadge[] = TECH_ITEMS.map((item, idx) => {
      // Calculate radius roughly from label length
      const radius = Math.max(38, item.label.length * 4.6 + 18)
      // Scatter evenly
      const cols = 4
      const row = Math.floor(idx / cols)
      const col = idx % cols
      const cellW = width / cols
      const cellH = height / 4

      const x = cellW * col + cellW * 0.5 + (Math.random() - 0.5) * 40
      const y = cellH * row + cellH * 0.5 + (Math.random() - 0.5) * 40

      return {
        id: `badge-${idx}`,
        label: item.label,
        category: item.category as any,
        x: Math.max(radius, Math.min(width - radius, x)),
        y: Math.max(radius, Math.min(height - radius, y)),
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius,
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
    setLastInteracted("Turbulence Blast Applied")
    const canvas = canvasRef.current
    if (!canvas) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    badgesRef.current.forEach((badge) => {
      const dx = badge.x - centerX
      const dy = badge.y - centerY
      const dist = Math.sqrt(dx * dx + dy * dy) || 1
      const force = 8 + Math.random() * 8
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

    let width = (canvas.width = container.clientWidth)
    let height = (canvas.height = Math.max(460, container.clientHeight))

    initBadges(width, height)

    const handleResize = () => {
      if (!canvas || !container) return
      width = canvas.width = container.clientWidth
      height = canvas.height = Math.max(460, container.clientHeight)
      // Clamp badges inside new bounds
      badgesRef.current.forEach((b) => {
        b.x = Math.max(b.radius, Math.min(width - b.radius, b.x))
        b.y = Math.max(b.radius, Math.min(height - b.radius, b.y))
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

      // Physics variables
      const currentGravity = gravityRef.current
      let gravityY = 0
      if (currentGravity === "earth") gravityY = 0.35
      else if (currentGravity === "orbit") gravityY = 0.06
      else gravityY = 0.002 * Math.sin(Date.now() * 0.001)

      const friction = 0.985
      const bounce = 0.75

      const badges = badgesRef.current

      // Update positions & collisions
      for (let i = 0; i < badges.length; i++) {
        const b = badges[i]

        if (b !== draggedBadge.current) {
          // Apply gravity
          b.vy += gravityY

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

          if (b.y - b.radius < 0) {
            b.y = b.radius
            b.vy = -b.vy * bounce
          } else if (b.y + b.radius > height) {
            b.y = height - b.radius
            b.vy = -b.vy * bounce
            // Floor friction
            b.vx *= 0.95
          }
        } else {
          // Being dragged: compute drag velocity
          b.vx = (mousePos.current.x - mousePos.current.prevX) * 0.7
          b.vy = (mousePos.current.y - mousePos.current.prevY) * 0.7
          b.x = mousePos.current.x
          b.y = mousePos.current.y
        }

        // Inter-badge collisions (Elastic rigid-body)
        for (let j = i + 1; j < badges.length; j++) {
          const b2 = badges[j]
          const dx = b2.x - b.x
          const dy = b2.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const minDist = b.radius + b2.radius + 6

          if (dist < minDist && dist > 0) {
            // Overlap resolution
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

            // Normal impulse
            const kx = b.vx - b2.vx
            const ky = b.vy - b2.vy
            const p = 2 * (nx * kx + ny * ky) / 2

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

        // Pill shape dimensions
        const pillWidth = b.radius * 2
        const pillHeight = 36
        const cornerRadius = 18

        ctx.save()
        ctx.translate(b.x, b.y)

        // Glow when dragged or high velocity
        const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy)
        if (isDragged || speed > 3) {
          ctx.shadowColor = b.borderColor
          ctx.shadowBlur = isDragged ? 25 : 12
        }

        // Pill Background
        ctx.beginPath()
        ctx.roundRect(-pillWidth / 2, -pillHeight / 2, pillWidth, pillHeight, cornerRadius)
        ctx.fillStyle = isDragged ? "rgba(255, 255, 255, 0.18)" : b.color
        ctx.fill()

        // Border
        ctx.lineWidth = isDragged ? 2 : 1
        ctx.strokeStyle = isDragged ? "#ffffff" : b.borderColor
        ctx.stroke()

        // Tiny LED indicator dot
        ctx.beginPath()
        ctx.arc(-pillWidth / 2 + 14, 0, 3, 0, Math.PI * 2)
        ctx.fillStyle = b.borderColor
        ctx.shadowColor = b.borderColor
        ctx.shadowBlur = 6
        ctx.fill()

        // Badge Text
        ctx.shadowBlur = 0
        ctx.fillStyle = b.textColor
        ctx.font = "600 12px var(--font-mono, monospace)"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(b.label, 6, 1)

        ctx.restore()
      })

      // Update previous mouse pos
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

  // Mouse & Touch interaction handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    mousePos.current.x = x
    mousePos.current.y = y
    mousePos.current.prevX = x
    mousePos.current.prevY = y
    isMouseDown.current = true

    // Check hit badge
    for (let i = badgesRef.current.length - 1; i >= 0; i--) {
      const b = badgesRef.current[i]
      const dx = x - b.x
      const dy = y - b.y
      if (Math.abs(dx) <= b.radius && Math.abs(dy) <= 20) {
        draggedBadge.current = b
        setLastInteracted(`Grabbed: ${b.label}`)
        playSound("tick")
        break
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    mousePos.current.x = e.clientX - rect.left
    mousePos.current.y = e.clientY - rect.top
  }

  const handleMouseUp = () => {
    if (draggedBadge.current) {
      playSound("snap")
      setLastInteracted(`Flinged: ${draggedBadge.current.label}`)
    }
    draggedBadge.current = null
    isMouseDown.current = false
  }

  return (
    <section id="sandbox" className="relative py-24 px-6 border-b border-white/10 overflow-hidden bg-black/40">
      {/* Ambient background volumetric glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Section 03 // Physics Engine</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-foreground">
              Zero-Gravity Tech Sandbox
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-xl">
              Skill badges behave as interactive physical rigid bodies with elastic collisions. Grab, fling, or alter the gravitational field in real-time.
            </p>
          </div>

          {/* Interactive Physics Control Bar */}
          <div className="flex flex-wrap items-center gap-2.5 p-1.5 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl">
            <button
              onClick={() => {
                setGravityMode("zero")
                playSound("tick")
              }}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
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
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                gravityMode === "orbit"
                  ? "bg-cyan-500 text-black font-semibold shadow-lg shadow-cyan-500/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Lunar Orbit
            </button>
            <button
              onClick={() => {
                setGravityMode("earth")
                playSound("tick")
              }}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                gravityMode === "earth"
                  ? "bg-amber-500 text-black font-semibold shadow-lg shadow-amber-500/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Earth (9.8m/s²)
            </button>
            <div className="w-[1px] h-5 bg-white/10 mx-1" />
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
          className="relative w-full h-[520px] rounded-3xl border border-white/10 bg-zinc-950/70 backdrop-blur-2xl shadow-2xl overflow-hidden group"
        >
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="w-full h-full cursor-grab active:cursor-grabbing block"
          />

          {/* Interactive overlay telemetry indicators */}
          <div className="absolute top-4 left-5 pointer-events-none flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-[11px] text-zinc-400 tracking-wider uppercase">
              Rigid-Bodies: {activeItemCount} Active // 60 FPS Engine
            </span>
          </div>

          <div className="absolute bottom-4 left-5 pointer-events-none">
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              {lastInteracted}
            </span>
          </div>

          <div className="absolute bottom-4 right-5 pointer-events-none hidden sm:flex items-center gap-2 text-zinc-500 font-mono text-xs">
            <Move className="w-3.5 h-3.5 text-zinc-400" />
            <span>Click & Drag to impart velocity</span>
          </div>
        </div>
      </div>
    </section>
  )
}
