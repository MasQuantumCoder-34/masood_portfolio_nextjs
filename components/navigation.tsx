"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const navItems = [
      { id: "about" },
      { id: "skills" },
      { id: "projects" },
      { id: "testimonials" },
    ]

    const observers = navItems.map(item => {
      const element = document.getElementById(item.id)
      if (!element) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(item.id)
          }
        },
        { threshold: 0.3 }
      )

      observer.observe(element)
      return observer
    })

    return () => {
      observers.forEach(observer => observer && observer.disconnect())
    }
  }, [])

  const navItems = [
    { name: "About", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Testimonials", href: "#testimonials", id: "testimonials" },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "glass backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="#" className="text-2xl font-bold gradient-text">
          Portfolio
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors duration-300 ${
                activeSection === item.id
                  ? "text-accent font-semibold"
                  : "text-foreground/70 hover:text-accent"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <Link
          href="#contact"
          className="px-6 py-2 rounded-full bg-gradient-to-r from-accent to-primary text-accent-foreground font-semibold hover:shadow-lg hover:shadow-accent/40 transition-all duration-300"
        >
          Contact
        </Link>
      </div>
    </nav>
  )
}
