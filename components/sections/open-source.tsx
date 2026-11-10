"use client"

import React from "react"
import { ArrowUpRight, Github, Star, GitFork, Sparkles } from "lucide-react"
import { playSound } from "@/components/sound/audio-engine"

const repos = [
  {
    name: "central-enterprises-diaper-ecommerce-",
    description: "Storefront web application for VNB Diapers, featuring real-time Render API sync and WhatsApp order dispatch.",
    stars: "1",
    forks: "0",
    language: "TypeScript",
    url: "https://github.com/MasQuantumCoder-34/central-enterprises-diaper-ecommerce-",
  },
  {
    name: "masood_portfolio_nextjs",
    description: "Personal developer portfolio built with Next.js 16, React 19, Three.js WebGL, and Lenis smooth scrolling.",
    stars: "2",
    forks: "0",
    language: "TypeScript",
    url: "https://github.com/MasQuantumCoder-34/masood_portfolio_nextjs",
  },
  {
    name: "MufarTech Website",
    description: "Commercial agency website built with responsive Next.js and Tailwind CSS.",
    stars: "1",
    forks: "0",
    language: "TypeScript",
    url: "https://github.com/MasQuantumCoder-34",
  },
]

export default function OpenSource() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 border-b border-white/10 bg-black/70 overflow-hidden">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Section 08 // Repositories</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white">
              Open Source & Code
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2">
              Public repositories, experiments, and production codebases on GitHub.
            </p>
          </div>

          <a
            href="https://github.com/MasQuantumCoder-34"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound("snap")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-white font-mono text-xs border border-white/10 transition-all cursor-pointer"
          >
            <Github className="w-4 h-4 text-emerald-400" />
            <span>github.com/MasQuantumCoder-34 ↗</span>
          </a>
        </div>

        {/* Repositories Cards Grid */}
        <div className="space-y-3 sm:space-y-4">
          {repos.map((repo, i) => (
            <a
              key={i}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => playSound("tick")}
              onClick={() => playSound("snap")}
              className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-zinc-950/70 backdrop-blur-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-emerald-500/30 transition-all duration-300 group cursor-pointer"
            >
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <h3 className="font-mono text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {repo.name}
                  </h3>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                  {repo.description}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 flex-shrink-0">
                <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  {repo.language}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400" />
                  {repo.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5 text-zinc-400" />
                  {repo.forks}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
