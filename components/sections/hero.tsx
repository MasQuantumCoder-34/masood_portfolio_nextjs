"use client"

import React from "react"
import dynamic from "next/dynamic"
import { ArrowDown, ArrowUpRight, Sparkles, Activity, FileText, Layers } from "lucide-react"
import MagneticButton from "@/components/ui/magnetic-button"
import { playSound } from "@/components/sound/audio-engine"

const HeroCanvas = dynamic(() => import("@/components/3d/hero-prism"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] sm:h-[380px] lg:h-[480px] rounded-3xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-zinc-950/40 flex items-center justify-center">
      <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
    </div>
  ),
})

export default function Hero() {
  const scrollTo = (id: string) => {
    playSound("snap")
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="relative min-h-0 lg:min-h-[88vh] flex items-center justify-center px-5 sm:px-6 pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-20 border-b border-black/5 dark:border-white/10 overflow-hidden bg-slate-50 dark:bg-gradient-to-b dark:from-black dark:via-zinc-950/80 dark:to-black transition-colors duration-300"
    >
      {/* Background Volumetric Radiance */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-emerald-500/10 blur-[120px] sm:blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-cyan-500/10 blur-[120px] sm:blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Column: Kinetic Typography & Engineering Credibility */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Eyebrow Status Beacon */}
          <div className="mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] sm:text-xs font-mono text-emerald-600 dark:text-emerald-400 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-emerald-500" />
              </span>
              <span className="tracking-widest uppercase font-semibold">Front-End & Mobile Engineer</span>
              <span className="text-slate-400 dark:text-zinc-600">•</span>
              <span className="text-slate-700 dark:text-zinc-300 font-medium">React, TypeScript & Flutter</span>
            </div>
          </div>

          {/* Monumental Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-4 sm:mb-6">
            Building fast,{" "}
            <span className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-400 dark:from-emerald-400 dark:via-cyan-400 dark:to-emerald-200 bg-clip-text text-transparent">
              accessible React & Flutter
            </span>{" "}
            interfaces.
          </h1>

          {/* Credibility Paragraph */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed max-w-2xl mb-6 sm:mb-8 font-normal">
            Front-End & Mobile Engineer with enterprise experience at{" "}
            <span className="text-slate-900 dark:text-white font-medium underline decoration-emerald-500/50 underline-offset-4">
              DataTerrain
            </span>{" "}
            (cutting client API redundancy by 30% with RTK Query) and freelance storefront delivery for{" "}
            <a
              href="https://vnbdiaper.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-900 dark:text-white font-medium underline decoration-cyan-500/50 underline-offset-4 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
            >
              VNB Diapers
            </a>
            . Specialized in React, Next.js, Flutter, Dart, REST API integration, and production bug fixing. Currently Operations Executive at{" "}
            <span className="text-slate-900 dark:text-white font-medium">Startek</span> (Zomato Process).
          </p>

          {/* Live Micro-Metrics HUD Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-6 sm:mb-8 max-w-xl">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-black/10 dark:border-white/10 backdrop-blur-md shadow-sm dark:shadow-none">
              <div className="font-mono text-lg sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                -30%
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">
                API Redundancy
              </div>
            </div>

            <div className="p-2.5 sm:p-3 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-black/10 dark:border-white/10 backdrop-blur-md shadow-sm dark:shadow-none">
              <div className="font-mono text-lg sm:text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                &lt; 1.2s
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">
                Storefront LCP
              </div>
            </div>

            <div className="p-2.5 sm:p-3 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-black/10 dark:border-white/10 backdrop-blur-md col-span-2 sm:col-span-1 shadow-sm dark:shadow-none">
              <div className="font-mono text-lg sm:text-2xl font-bold text-amber-600 dark:text-amber-400">
                60 FPS
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">
                WebGL & Physics
              </div>
            </div>
          </div>

          {/* Magnetic Interactive Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <MagneticButton
              onClick={() => scrollTo("projects")}
              className="inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black font-semibold text-xs sm:text-sm transition-all shadow-xl shadow-black/10 dark:shadow-white/10 group cursor-pointer active:scale-95"
            >
              <span>Explore Work Deck</span>
              <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-y-1" />
            </MagneticButton>

            <a
              href="https://www.fiverr.com/s/8xyp7XZ"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound("chord")}
              className="inline-flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-lg shadow-emerald-500/25 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hire on Fiverr ↗</span>
            </a>

            <button
              onClick={() => scrollTo("sandbox")}
              className="inline-flex items-center gap-1.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/15 text-slate-800 dark:text-white font-mono text-xs uppercase tracking-wider font-semibold border border-black/10 dark:border-white/10 transition-all backdrop-blur-xl cursor-pointer active:scale-95"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Sandbox ⚡</span>
            </button>

            <a
              href="/resume.pdf"
              download
              onClick={() => playSound("snap")}
              className="inline-flex items-center gap-1 px-3 py-3 sm:px-4 sm:py-3.5 rounded-2xl text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume ↗</span>
            </a>
          </div>
        </div>

        {/* Right Column: Interactive 3D Quantum Prism Stage */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <HeroCanvas />
        </div>
      </div>
    </section>
  )
}
