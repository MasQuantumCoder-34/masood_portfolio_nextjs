"use client"

import { useEffect, useState, useRef } from "react"
import { soundFx } from "@/components/sound/audio-engine"
import TerminalDrawer from "@/components/ui/terminal-drawer"
import { Volume2, VolumeX, Terminal as TerminalIcon } from "lucide-react"

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true)
  const [mounted, setMounted] = useState(false)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)

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

  const toggleSound = () => {
    const muted = soundFx.toggleMute()
    setIsMuted(muted)
    if (!muted) soundFx.playClickSnap()
  }

  const openTerminal = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "~" }))
  }

  return (
    <>
      {/* Specular Ambient Cursor Light */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-70"
        style={{
          background:
            "radial-gradient(600px circle at var(--cursor-x, 50vw) var(--cursor-y, 50vh), rgba(16, 185, 129, 0.035), rgba(6, 182, 212, 0.02) 40%, transparent 80%)",
        }}
      />

      {/* Floating Audio Micro-Haptic & CLI Control Pill */}
      {mounted && (
        <aside className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
          <button
            onClick={toggleSound}
            onMouseEnter={() => soundFx.playHoverTick()}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/90 border border-border backdrop-blur-md text-xs font-mono text-muted-foreground hover:text-foreground transition-all shadow-md cursor-pointer"
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
            onMouseEnter={() => soundFx.playHoverTick()}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/90 border border-border backdrop-blur-md text-xs font-mono text-muted-foreground hover:text-foreground transition-all shadow-md cursor-pointer"
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
