"use client"

import React, { useRef, useEffect, useState } from "react"
import { playSound } from "@/components/sound/audio-engine"

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
      className="relative flex flex-col justify-center items-center px-4 sm:px-6 py-12 sm:py-16 lg:py-20 border-b border-white/10 overflow-hidden bg-black/90"
    >
      {/* Volumetric Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[220px] sm:h-[360px] bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-amber-500/5 rounded-full blur-[100px] sm:blur-[140px] opacity-70" />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10 text-center">
        {/* Monolith Header Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-6 sm:mb-8">
          <span>01 / Core Mindset</span>
          <span className="text-zinc-600">•</span>
          <span className="text-white">Engineering Philosophy</span>
        </div>

        {/* Scroll-Scrub Kinetic Typography */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.18] mb-6 sm:mb-8 flex flex-wrap justify-center gap-x-2.5 sm:gap-x-4 gap-y-1.5 sm:gap-y-2">
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
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-amber-300 drop-shadow-[0_0_24px_rgba(52,211,153,0.45)] font-bold scale-[1.02]"
                      : "text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                    : "text-zinc-700"
                }`}
              >
                {word}
              </span>
            )
          })}
        </h2>

        {/* Grounding Subtitle */}
        <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-zinc-400 leading-relaxed font-normal">
          Tools, frameworks, and clouds evolve constantly. What remains permanent is engineering
          discipline, clarity of logic, and problem-solving.
        </p>
      </div>
    </section>
  )
}
