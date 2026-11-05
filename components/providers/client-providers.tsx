"use client"

import React, { useEffect, useState, useRef } from "react"
import { playSound, toggleAudioMute, isAudioMuted } from "@/components/sound/audio-engine"
import TerminalDrawer from "@/components/ui/terminal-drawer"
import { Volume2, VolumeX, Terminal as TerminalIcon } from "lucide-react"

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true)
  const [mounted, setMounted] = useState(false)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)
    setIsMuted(isAudioMuted())

    // Lenis Smooth Scroll Engine
    let lenisInstance: any
    let rafId: number

    const startLenis = async () => {
      try {
        const Lenis = (await import("lenis")).default
        lenisInstance = new Lenis({
          duration: 1.1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          smoothWheel: true,
        })

        const raf = (time: number) => {
          lenisInstance.raf(time)
          rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)
      } catch {
        // Fallback to standard scroll
      }
    }

    startLenis()

    // Cursor Specular Spotlight Tracking (LERP)
    let currentX = 0
    let currentY = 0
    let cursorAnimId: number

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("mousemove", handleMouseMove)

    const updateSpotlight = () => {
      currentX += (cursorRef.current.x - currentX) * 0.12
      currentY += (cursorRef.current.y - currentY) * 0.12

      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty("--cursor-x", `${currentX}px`)
        spotlightRef.current.style.setProperty("--cursor-y", `${currentY}px`)
      }
      cursorAnimId = requestAnimationFrame(updateSpotlight)
    }
    cursorAnimId = requestAnimationFrame(updateSpotlight)

    return () => {
      cancelAnimationFrame(rafId)
      cancelAnimationFrame(cursorAnimId)
      window.removeEventListener("mousemove", handleMouseMove)
      lenisInstance?.destroy()
    }
  }, [])

  const handleToggleSound = () => {
    const muted = toggleAudioMute()
    setIsMuted(muted)
    if (!muted) playSound("chord")
  }

  const openTerminal = () => {
    playSound("snap")
    window.dispatchEvent(new CustomEvent("open-cli-drawer"))
  }

  return (
    <>
      {/* Specular Ambient Cursor Light */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-60"
        style={{
          background:
            "radial-gradient(600px circle at var(--cursor-x, 50vw) var(--cursor-y, 50vh), rgba(16, 185, 129, 0.04), rgba(6, 182, 212, 0.02) 40%, transparent 80%)",
        }}
      />

      {/* Floating Audio Micro-Haptic & CLI Control Pill */}
      {mounted && (
        <aside className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
          <button
            onClick={handleToggleSound}
            onMouseEnter={() => playSound("tick")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/80 border border-white/10 backdrop-blur-xl text-xs font-mono text-zinc-400 hover:text-white transition-all shadow-xl cursor-pointer"
            aria-label="Toggle sound feedback"
            title={isMuted ? "Audio muted (Click to enable)" : "Audio enabled"}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="hidden sm:inline text-emerald-400 font-semibold">Sound On</span>
              </>
            )}
          </button>

          <button
            onClick={openTerminal}
            onMouseEnter={() => playSound("tick")}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-950/80 border border-white/10 backdrop-blur-xl text-xs font-mono text-zinc-400 hover:text-white transition-all shadow-xl cursor-pointer"
            title="Open Developer Shell (~)"
          >
            <TerminalIcon className="w-3 h-3 text-emerald-400" />
            <span>Shell (~)</span>
          </button>
        </aside>
      )}

      {/* Terminal Drawer Shell */}
      <TerminalDrawer />

      {children}
    </>
  )
}
