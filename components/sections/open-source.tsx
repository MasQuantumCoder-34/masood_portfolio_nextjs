"use client"

import { ArrowUpRight, Github, Star, GitFork } from "lucide-react"

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
    description: "Personal developer portfolio built with Next.js 16, React 19, TypeScript, and editorial minimalism.",
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
    <section className="relative py-20 px-6 border-b border-border">
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2 mb-12 pb-4 border-b border-border">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
            Open Source
          </h2>
          <a
            href="https://github.com/MasQuantumCoder-34"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>github.com/MasQuantumCoder-34 ↗</span>
          </a>
        </div>

        {/* Repositories List */}
        <div className="divide-y divide-border">
          {repos.map((repo, i) => (
            <a
              key={i}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group cursor-pointer"
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <h3 className="font-mono text-sm font-medium text-foreground group-hover:text-muted-foreground transition-colors">
                    {repo.name}
                  </h3>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {repo.description}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground flex-shrink-0">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  {repo.language}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-muted-foreground" />
                  {repo.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5 text-muted-foreground" />
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
