"use client"

import { useRef, useEffect, useState } from "react"
import { soundFx } from "@/components/sound/audio-engine"

const PHILOSOPHY_TEXT = "A tool is only as powerful as the person who understands it."

export default function PhilosophySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Normalize scroll scrub through this section
      const progress = Math.min(
        Math.max((windowHeight - rect.top) / (windowHeight + rect.height * 0.4), 0),
        1
      )
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const words = PHILOSOPHY_TEXT.split(" ")
  const totalWords = words.length

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex flex-col justify-center items-center px-6 py-28 border-b border-border overflow-hidden bg-background"
    >
      {/* Volumetric Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[360px] bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-amber-500/5 rounded-full blur-[140px] opacity-70" />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10 text-center">
        {/* Monolith Header Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/40 border border-border text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-12">
          <span>01 / Core Mindset</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="text-foreground">Engineering Philosophy</span>
        </div>

        {/* Scroll-Scrub Kinetic Typography */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.12] mb-12 flex flex-wrap justify-center gap-x-4 gap-y-2">
          {words.map((word, index) => {
            const wordThreshold = (index + 0.3) / totalWords
            const isIlluminated = scrollProgress >= wordThreshold
            const isTarget =
              word.toLowerCase().includes("understands") || word.toLowerCase().includes("it.")

            return (
              <span
                key={index}
                className={`transition-all duration-300 select-none ${
                  isIlluminated
                    ? isTarget
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-amber-300 drop-shadow-[0_0_24px_rgba(52,211,153,0.45)] font-bold scale-[1.03]"
                      : "text-foreground drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                    : "text-muted-foreground/30"
                }`}
              >
                {word}
              </span>
            )
          })}
        </h2>

        {/* Grounding Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed font-normal">
          Tools, frameworks, and clouds evolve constantly. What remains permanent is engineering
          discipline, clarity of logic, and problem-solving.
        </p>
      </div>
    </section>
  )
}
