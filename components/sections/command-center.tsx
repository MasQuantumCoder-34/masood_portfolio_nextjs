"use client"

import React, { useState, useEffect, useRef } from "react"
import { playSound } from "@/components/sound/audio-engine"
import MagneticButton from "@/components/ui/magnetic-button"
import { Check, Copy, Globe, Terminal, Sparkles, Send, Mail, MapPin } from "lucide-react"

// Confetti particle system on canvas
function triggerConfetti(x: number, y: number) {
  const canvas = document.createElement("canvas")
  canvas.style.position = "fixed"
  canvas.style.inset = "0"
  canvas.style.width = "100%"
  canvas.style.height = "100%"
  canvas.style.pointerEvents = "none"
  canvas.style.zIndex = "99999"
  document.body.appendChild(canvas)

  const ctx = canvas.getContext("2d")
  if (!ctx) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const colors = ["#10b981", "#06b6d4", "#f59e0b", "#a855f7", "#ffffff"]
  const particles: Array<{
    x: number
    y: number
    vx: number
    vy: number
    size: number
    color: string
    alpha: number
    rotation: number
    rotSpeed: number
  }> = []

  for (let i = 0; i < 70; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = 4 + Math.random() * 8
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      size: 4 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
    })
  }

  let frameId: number
  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let alive = false

    particles.forEach((p) => {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.2 // gravity
      p.vx *= 0.98
      p.alpha -= 0.015
      p.rotation += p.rotSpeed

      if (p.alpha > 0) {
        alive = true
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = Math.max(0, p.alpha)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7)
        ctx.restore()
      }
    })

    if (alive) {
      frameId = requestAnimationFrame(render)
    } else {
      canvas.remove()
    }
  }

  render()
}

// 3D Wireframe Telemetry Globe
function WireframeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = 240)
    let height = (canvas.height = 240)
    let angle = 0
    let animationFrameId: number

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      const cx = width / 2
      const cy = height / 2
      const radius = 90

      angle += 0.01

      // Outer atmosphere rim glow
      const grad = ctx.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius * 1.1)
      grad.addColorStop(0, "rgba(16, 185, 129, 0.05)")
      grad.addColorStop(1, "rgba(6, 182, 212, 0)")
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 1.1, 0, Math.PI * 2)
      ctx.fill()

      const isDark = document.documentElement.classList.contains("dark")

      // Latitude lines
      for (let lat = -60; lat <= 60; lat += 20) {
        const rLat = (lat * Math.PI) / 180
        const y = cy + Math.sin(rLat) * radius
        const rAtY = Math.cos(rLat) * radius

        ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.1)"
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.ellipse(cx, y, rAtY, rAtY * 0.25, 0, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Longitude lines (rotating)
      for (let lon = 0; lon < 180; lon += 30) {
        const rLon = (lon * Math.PI) / 180 + angle
        const rx = Math.sin(rLon) * radius

        ctx.strokeStyle = isDark ? "rgba(52, 211, 153, 0.2)" : "rgba(5, 150, 105, 0.25)"
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.ellipse(cx, cy, Math.abs(rx), radius, 0, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Outer sphere boundary
      ctx.strokeStyle = isDark ? "rgba(52, 211, 153, 0.4)" : "rgba(5, 150, 105, 0.5)"
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.stroke()

      // Lucknow, India Locator Pulse (approx coords)
      const pulseX = cx + Math.cos(angle + 1.2) * (radius * 0.5)
      const pulseY = cy + 5
      const pingSize = (Date.now() % 1500) / 1500

      ctx.beginPath()
      ctx.arc(pulseX, pulseY, 3 + pingSize * 10, 0, Math.PI * 2)
      ctx.strokeStyle = isDark
        ? `rgba(16, 185, 129, ${1 - pingSize})`
        : `rgba(5, 150, 105, ${1 - pingSize})`
      ctx.lineWidth = 1.5
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2)
      ctx.fillStyle = isDark ? "#34d399" : "#059669"
      ctx.shadowColor = isDark ? "#10b981" : "#059669"
      ctx.shadowBlur = 8
      ctx.fill()
      ctx.shadowBlur = 0

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="relative w-[240px] h-[240px] flex items-center justify-center">
      <canvas ref={canvasRef} className="block" />
      <div className="absolute bottom-2 text-center pointer-events-none">
        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
          Coordinates // 12.97° N, 77.59° E
        </span>
      </div>
    </div>
  )
}

export default function CommandCenter() {
  const [copied, setCopied] = useState(false)
  const [time, setTime] = useState("")
  const email = "masazhar321@gmail.com"

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const copyEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(email)
    playSound("chord")
    setCopied(true)

    // Trigger confetti at click coordinates
    triggerConfetti(e.clientX, e.clientY)

    setTimeout(() => setCopied(false), 3000)
  }

  const openTerminal = () => {
    playSound("snap")
    window.dispatchEvent(new CustomEvent("open-cli-drawer"))
  }

  return (
    <footer id="connect" className="relative py-16 sm:py-20 lg:py-24 px-5 sm:px-6 border-t border-black/5 dark:border-white/10 bg-slate-100/70 dark:bg-black overflow-hidden transition-colors duration-300">
      {/* Ambient background volumetric glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
        {/* Availability Badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-full bg-white/90 dark:bg-zinc-900/80 border border-black/10 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-zinc-400 shadow-md dark:shadow-2xl mb-6 backdrop-blur-xl">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600 dark:bg-emerald-500" />
          </span>
          <span className="text-slate-900 dark:text-white font-medium">Available for Opportunities</span>
          <span className="text-slate-400 dark:text-zinc-600">•</span>
          <span className="inline-flex items-center gap-1.5 text-slate-700 dark:text-zinc-300">
            <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Lucknow, IN (IST)</span>
            <span className="text-slate-900 dark:text-white font-semibold font-mono ml-1">{time || "12:00:00 PM"}</span>
          </span>
        </div>

        {/* 3D Wireframe Telemetry Globe */}
        <div className="mb-6">
          <WireframeGlobe />
        </div>

        {/* Global Connection Callout */}
        <div className="space-y-3 sm:space-y-4 max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Ready to engineer something extraordinary?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
            Open to front-end & mobile engineering roles, Flutter & React bug fixing, API integrations, and contract architectures. Click below to copy email or order on Fiverr.
          </p>
        </div>

        {/* Magnetic Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14">
          <a
            href="https://www.fiverr.com/s/8xyp7XZ"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound("chord")}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs sm:text-sm uppercase tracking-wider font-bold transition-all shadow-xl shadow-emerald-500/25 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Order on Fiverr ↗</span>
          </a>

          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:hover:bg-zinc-200 dark:text-black font-mono text-xs sm:text-sm font-semibold shadow-xl shadow-black/10 dark:shadow-white/10 transition-all cursor-pointer active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Email Copied! Check Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy {email}</span>
              </>
            )}
          </button>

          <a
            href={`mailto:${email}`}
            onClick={() => playSound("snap")}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/15 text-slate-900 dark:text-white font-mono text-xs uppercase tracking-wider font-semibold border border-black/10 dark:border-white/10 transition-all backdrop-blur-xl cursor-pointer active:scale-95"
          >
            <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Send Email Direct ↗</span>
          </a>

          <button
            onClick={openTerminal}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/15 text-slate-700 dark:text-zinc-400 hover:text-black dark:hover:text-white font-mono text-xs border border-black/10 dark:border-white/10 transition-colors cursor-pointer"
            title="Press ~ key to toggle terminal"
          >
            <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Launch Shell [~]</span>
          </button>
        </div>

        {/* Sub-footer Brand Note */}
        <div className="w-full pt-6 sm:pt-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 dark:text-zinc-500 gap-4">
          <div>
            © {new Date().getFullYear()} Mohammed Masood Azhar V. High-Performance Portfolio.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://vnbdiaper.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              VNB Diapers Storefront ↗
            </a>
            <span>•</span>
            <span className="text-slate-400 dark:text-zinc-600">60 FPS WebGL Engine</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
