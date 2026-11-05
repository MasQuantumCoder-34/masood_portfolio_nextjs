"use client"

import Navigation from "@/components/navigation"
import Hero from "@/components/sections/hero"
import Projects from "@/components/sections/projects"
import Skills from "@/components/sections/skills"
import About from "@/components/sections/about"
import Testimonials from "@/components/sections/testimonials"
import OpenSource from "@/components/sections/open-source"
import Contact from "@/components/sections/contact"
import BackToTop from "@/components/back-to-top"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      <Hero />
      <Projects />
      <Skills />
      <About />
      <Testimonials />
      <OpenSource />
      <Contact />
      <BackToTop />
    </main>
  )
}
