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
    <main className="relative min-h-screen bg-[#050608] selection:bg-emerald-500/30 selection:text-white">
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
