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
    <section className="relative py-16 sm:py-20 lg:py-24 px-5 sm:px-6 border-b border-black/5 dark:border-white/10 bg-slate-100/50 dark:bg-black/70 overflow-hidden transition-colors duration-300">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Section 08 // Repositories</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-slate-900 dark:text-white">
              Open Source & Code
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base mt-2 font-normal">
              Public repositories, experiments, and production codebases on GitHub.
            </p>
          </div>

          <a
            href="https://github.com/MasQuantumCoder-34"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound("snap")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/15 text-slate-800 dark:text-white font-mono text-xs border border-black/10 dark:border-white/10 transition-all cursor-pointer"
          >
            <Github className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>github.com/MasQuantumCoder-34 ↗</span>
          </a>
        </div>

        {/* Repositories Cards Grid */}
        <div className="space-y-4">
          {repos.map((repo, i) => (
            <a
              key={i}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => playSound("tick")}
              onClick={() => playSound("snap")}
              className="p-5 sm:p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-zinc-950/70 backdrop-blur-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-emerald-500/30 transition-all duration-300 group cursor-pointer shadow-sm dark:shadow-none"
            >
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <h3 className="font-mono text-sm font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {repo.name}
                  </h3>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
                  {repo.description}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-zinc-400 flex-shrink-0">
                <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-full border border-black/5 dark:border-white/5 text-slate-700 dark:text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                  {repo.language}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                  {repo.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-400" />
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
