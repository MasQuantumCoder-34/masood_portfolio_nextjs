"use client"

import { ArrowUpRight } from "lucide-react"

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative px-6 pt-32 sm:pt-36 pb-12 border-b border-border">
      <div className="max-w-4xl mx-auto w-full">
        {/* Editorial Eyebrow */}
        <div className="mb-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Front-End Engineer • React & TypeScript Specialist
          </span>
        </div>

        {/* Display Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-foreground leading-[1.05] mb-8">
          Building fast, <br />
          accessible React <br />
          interfaces.
        </h1>

        {/* Outcome Subhead */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-10">
          Front-End Engineer with enterprise experience at{" "}
          <span className="text-foreground font-medium">DataTerrain</span> (cutting client API redundancy by 30% with RTK Query) and 
          freelance storefront delivery for <span className="text-foreground font-medium">VNB Diapers</span>. Currently working at{" "}
          <span className="text-foreground font-medium">Startek</span>.
        </p>

        {/* Action Row */}
        <div className="flex items-center gap-8 mb-12">
          <button
            onClick={scrollToProjects}
            className="inline-flex items-center gap-2 text-foreground font-medium text-sm sm:text-base hover:text-muted-foreground transition-colors group cursor-pointer"
          >
            <span>See selected work</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-y-0.5">
              ↓
            </span>
          </button>

          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm sm:text-base transition-colors"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground/70" />
          </a>
        </div>

        {/* Hairline Divider & Stack Line */}
        <div className="pt-6 border-t border-border">
          <p className="font-mono text-xs sm:text-sm text-muted-foreground/80 tracking-wide">
            React · Next.js · TypeScript · Redux Toolkit · RTK Query · Tailwind CSS · Firebase
          </p>
        </div>
      </div>
    </section>
  )
}
