"use client"

import React from "react"
import dynamic from "next/dynamic"
import { ArrowDown, ArrowUpRight, Sparkles, Activity, FileText, Layers } from "lucide-react"
import MagneticButton from "@/components/ui/magnetic-button"
import { playSound } from "@/components/sound/audio-engine"

const HeroCanvas = dynamic(() => import("@/components/3d/hero-prism"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] sm:h-[480px] lg:h-[540px] rounded-3xl border border-white/10 bg-zinc-950/40 flex items-center justify-center">
      <div className="w-48 h-48 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
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
      className="relative min-h-[92vh] flex items-center justify-center px-6 pt-32 pb-20 border-b border-white/10 overflow-hidden bg-gradient-to-b from-black via-zinc-950/80 to-black"
    >
      {/* Background Volumetric Radiance */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Kinetic Typography & Engineering Credibility */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Eyebrow Status Beacon */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="tracking-widest uppercase font-semibold">Front-End & Mobile Engineer</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-300">React, TypeScript & Flutter</span>
            </div>
          </div>

          {/* Monumental Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.04] mb-6">
            Building fast,{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-200 bg-clip-text text-transparent">
              accessible React & Flutter
            </span>{" "}
            interfaces.
          </h1>

          {/* Credibility Paragraph */}
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mb-8">
            Front-End & Mobile Engineer with enterprise experience at{" "}
            <span className="text-white font-medium underline decoration-emerald-500/50 underline-offset-4">
              DataTerrain
            </span>{" "}
            (cutting client API redundancy by 30% with RTK Query) and freelance storefront delivery for{" "}
            <a
              href="https://vnbdiaper.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-medium underline decoration-cyan-500/50 underline-offset-4 hover:text-cyan-300 transition-colors"
            >
              VNB Diapers
            </a>
            . Specialized in React, Next.js, Flutter, Dart, REST API integration, and production bug fixing. Currently Operations Executive at{" "}
            <span className="text-white font-medium">Startek</span> (Zomato Process).
          </p>

          {/* Live Micro-Metrics HUD Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10 max-w-xl">
            <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-md">
              <div className="font-mono text-xl sm:text-2xl font-bold text-emerald-400">
                -30%
              </div>
              <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
                API Redundancy
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-md">
              <div className="font-mono text-xl sm:text-2xl font-bold text-cyan-400">
                &lt; 1.2s
              </div>
              <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
                Storefront LCP
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-md col-span-2 sm:col-span-1">
              <div className="font-mono text-xl sm:text-2xl font-bold text-amber-400">
                60 FPS
              </div>
              <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
                WebGL & Physics
              </div>
            </div>
          </div>

          {/* Magnetic Interactive Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton
              onClick={() => scrollTo("projects")}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white hover:bg-zinc-200 text-black font-semibold text-sm transition-all shadow-xl shadow-white/10 group cursor-pointer active:scale-95"
            >
              <span>Explore Work Deck</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </MagneticButton>

            <a
              href="https://www.fiverr.com/s/8xyp7XZ"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound("chord")}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-lg shadow-emerald-500/25 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Hire on Fiverr ↗</span>
            </a>

            <button
              onClick={() => scrollTo("sandbox")}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/15 text-white font-mono text-xs uppercase tracking-wider font-semibold border border-white/10 transition-all backdrop-blur-xl cursor-pointer active:scale-95"
            >
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Physics Sandbox ⚡</span>
            </button>

            <a
              href="/resume.pdf"
              download
              onClick={() => playSound("snap")}
              className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-2xl text-zinc-400 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
            >
              <FileText className="w-4 h-4" />
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
