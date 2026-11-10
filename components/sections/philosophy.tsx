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
      className="relative flex flex-col justify-center items-center px-5 sm:px-6 py-16 sm:py-20 lg:py-24 border-b border-black/5 dark:border-white/10 overflow-hidden bg-slate-100/60 dark:bg-black/90 transition-colors duration-300"
    >
      {/* Volumetric Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[220px] sm:h-[360px] bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-amber-500/5 rounded-full blur-[100px] sm:blur-[140px] opacity-70" />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10 text-center">
        {/* Monolith Header Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-slate-700 dark:text-zinc-400 mb-8 sm:mb-10 shadow-sm dark:shadow-none">
          <span>01 / Core Mindset</span>
          <span className="text-slate-400 dark:text-zinc-600">•</span>
          <span className="text-slate-900 dark:text-white font-medium">Engineering Philosophy</span>
        </div>

        {/* Scroll-Scrub Kinetic Typography */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.22] mb-8 sm:mb-10 flex flex-wrap justify-center gap-x-2.5 sm:gap-x-4 gap-y-2 sm:gap-y-3">
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
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-cyan-600 to-amber-600 dark:from-emerald-400 dark:via-cyan-300 dark:to-amber-300 drop-shadow-[0_0_24px_rgba(52,211,153,0.35)] font-bold scale-[1.02]"
                      : "text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                    : "text-slate-300 dark:text-zinc-700"
                }`}
              >
                {word}
              </span>
            )
          })}
        </h2>

        {/* Grounding Subtitle */}
        <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
          Tools, frameworks, and clouds evolve constantly. What remains permanent is engineering
          discipline, clarity of logic, and problem-solving.
        </p>
      </div>
    </section>
  )
}
