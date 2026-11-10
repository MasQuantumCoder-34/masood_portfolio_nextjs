"use client"

import Navigation from "@/components/navigation"
import Hero from "@/components/sections/hero"
import PhilosophySection from "@/components/sections/philosophy"
import TechSandbox from "@/components/sections/tech-sandbox"
import Projects from "@/components/sections/projects"
import ArchitectureNode from "@/components/sections/architecture-node"
import TimelineBeam from "@/components/sections/timeline-beam"
import Testimonials from "@/components/sections/testimonials"
import OpenSource from "@/components/sections/open-source"
import Contact from "@/components/sections/contact"
import CommandCenter from "@/components/sections/command-center"
import BackToTop from "@/components/back-to-top"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-50 dark:bg-[#050608] text-slate-900 dark:text-foreground selection:bg-emerald-500/30 selection:text-emerald-950 dark:selection:text-white transition-colors duration-300">
      <Navigation />
      <Hero />
      <PhilosophySection />
      <TechSandbox />
      <Projects />
      <ArchitectureNode />
      <TimelineBeam />
      <Testimonials />
      <OpenSource />
      <Contact />
      <CommandCenter />
      <BackToTop />
    </main>
  )
}
