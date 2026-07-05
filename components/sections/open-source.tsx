"use client"

import { ExternalLink, Github, Star, GitFork } from "lucide-react"

const repos = [
  {
    name: "Mass Portfolio",
    description: "Personal portfolio built with Next.js, TypeScript, and Tailwind CSS showcasing projects and skills.",
    stars: "2",
    forks: "0",
    language: "TypeScript",
    url: "https://github.com/MasQuantumCoder-34",
  },
  {
    name: "MufarTech Website",
    description: "Company website with modern UI/UX, responsive layouts, and service showcase.",
    stars: "1",
    forks: "0",
    language: "TypeScript",
    url: "https://github.com/MasQuantumCoder-34",
  },
  {
    name: "Mufar Tech CRM",
    description: "Customer relationship management dashboard with tracking, pipeline, and reporting.",
    stars: "1",
    forks: "0",
    language: "TypeScript",
    url: "https://github.com/MasQuantumCoder-34",
  },
]

export default function OpenSource() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <Github className="w-8 h-8 text-accent" />
          <h2 className="text-5xl md:text-6xl font-bold gradient-text">Open Source</h2>
        </div>
        <p className="text-lg text-foreground/70 mb-16 max-w-2xl">
          Projects I&apos;ve built and published on GitHub. Contributions and collaborations welcome.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {repos.map((repo, i) => (
            <a
              key={i}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-bold text-foreground group-hover:text-accent transition-colors">
                  {repo.name}
                </h3>
                <ExternalLink className="w-4 h-4 text-foreground/40 group-hover:text-accent transition-colors" />
              </div>
              <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{repo.description}</p>
              <div className="flex items-center gap-4 text-xs text-foreground/50">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                  {repo.language}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" />
                  {repo.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5" />
                  {repo.forks}
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com/MasQuantumCoder-34"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-accent to-primary text-accent-foreground font-bold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 hover:scale-105"
          >
            <Github className="w-5 h-5" />
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
