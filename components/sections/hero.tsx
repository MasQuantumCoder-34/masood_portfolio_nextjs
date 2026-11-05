"use client"

import dynamic from "next/dynamic"
import { ArrowUpRight, ArrowDown } from "lucide-react"
import MagneticButton from "@/components/ui/magnetic-button"

// Dynamically import 3D Canvas with ssr: false to prevent WebGL server-side crashes
const HeroCanvas = dynamic(() => import("@/components/3d/hero-prism"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
      <div className="w-48 h-48 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
    </div>
  ),
})

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center px-6 pt-32 sm:pt-36 pb-14 border-b border-border overflow-hidden">
      {/* 3D Kinetic Glass Prism Stage */}
      <HeroCanvas />

      <div className="max-w-4xl mx-auto w-full relative z-10 pointer-events-none">
        {/* Editorial Eyebrow with Active Signal */}
        <div className="mb-6 pointer-events-auto">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-secondary/60 border border-border text-xs font-mono text-muted-foreground backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Front-End Engineer</span>
            <span className="text-muted-foreground/40">•</span>
            <span className="text-foreground font-medium">React & TypeScript</span>
          </div>
        </div>

        {/* Display Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-foreground leading-[1.05] mb-8 select-none">
          Building fast, <br />
          accessible React <br />
          interfaces.
        </h1>

        {/* Outcome Subhead */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-10 pointer-events-auto">
          Front-End Engineer with enterprise experience at{" "}
          <span className="text-foreground font-medium">DataTerrain</span> (cutting client API redundancy by 30% with RTK Query) and 
          freelance storefront delivery for <span className="text-foreground font-medium">VNB Diapers</span>. Currently working at{" "}
          <span className="text-foreground font-medium">Startek</span>.
        </p>

        {/* Magnetic Action Controls */}
        <div className="flex items-center gap-6 mb-12 pointer-events-auto">
          <MagneticButton
            onClick={scrollToProjects}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-background font-medium text-sm sm:text-base hover:bg-foreground/90 transition-all shadow-md group cursor-pointer"
          >
            <span>See selected work</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </MagneticButton>

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
        <div className="pt-6 border-t border-border/80 pointer-events-auto">
          <p className="font-mono text-xs sm:text-sm text-muted-foreground/80 tracking-wide">
            React · Next.js · TypeScript · Redux Toolkit · RTK Query · Tailwind CSS · Firebase
          </p>
        </div>
      </div>
    </section>
  )
}
