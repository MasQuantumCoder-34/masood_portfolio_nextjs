"use client"

import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Skills from "@/components/sections/skills"
import Projects from "@/components/sections/projects"
import Testimonials from "@/components/sections/testimonials"
import Contact from "@/components/sections/contact"
import OpenSource from "@/components/sections/open-source"
import Navigation from "@/components/navigation"
import BackToTop from "@/components/back-to-top"

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Testimonials />
      <OpenSource />
      <Contact />
      <BackToTop />
    </main>
  )
}
