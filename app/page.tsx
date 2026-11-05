"use client"

import Navigation from "@/components/navigation"
import Hero from "@/components/sections/hero"
import PhilosophySection from "@/components/sections/philosophy"
import Projects from "@/components/sections/projects"
import Skills from "@/components/sections/skills"
import About from "@/components/sections/about"
import Testimonials from "@/components/sections/testimonials"
import OpenSource from "@/components/sections/open-source"
import Contact from "@/components/sections/contact"
import CommandCenter from "@/components/sections/command-center"
import BackToTop from "@/components/back-to-top"

export default function Home() {
  return (
    <main className="relative min-h-screen selection:bg-emerald-500/20 selection:text-foreground">
      <Navigation />
      <Hero />
      <PhilosophySection />
      <Projects />
      <Skills />
      <About />
      <Testimonials />
      <OpenSource />
      <Contact />
      <CommandCenter />
      <BackToTop />
    </main>
  )
}
