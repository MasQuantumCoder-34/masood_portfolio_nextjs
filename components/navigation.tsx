"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("")
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const sections = ["projects", "skills", "about", "testimonials", "contact"]

    const observers = sections.map((id) => {
      const element = document.getElementById(id)
      if (!element) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.25 }
      )

      observer.observe(element)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer && observer.disconnect())
    }
  }, [])

  const navItems = [
    { name: "Work", href: "#projects", id: "projects" },
    { name: "Stack", href: "#skills", id: "skills" },
    { name: "About", href: "#about", id: "about" },
    { name: "Contact", href: "#contact", id: "contact" },
  ]

  const isDark = mounted && (resolvedTheme ? resolvedTheme === "dark" : theme === "dark")

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
        <Link
          href="#"
          className="group flex items-center gap-2.5 transition-all flex-shrink-0"
        >
          {/* Stylized Monogram Brand Mark */}
          <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-foreground text-background font-mono text-[11px] sm:text-xs font-bold flex items-center justify-center tracking-tight shadow-sm border border-border group-hover:scale-105 transition-transform duration-200 flex-shrink-0">
            MA
          </span>

          {/* Full Name & Identity */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-xs sm:text-sm font-semibold tracking-tight text-foreground group-hover:text-muted-foreground transition-colors whitespace-nowrap">
                <span className="hidden sm:inline">Mohammed </span>Masood Azhar
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono font-medium px-1 py-0.5 rounded bg-muted text-muted-foreground border border-border">
                V
              </span>
            </div>
            <span className="hidden sm:block text-[10px] font-mono text-muted-foreground tracking-wide mt-1">
              Front-End Engineer
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-xs font-mono transition-colors duration-150 ${
                  activeSection === item.id
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{item.name}</span>
                {activeSection === item.id && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-foreground transition-all duration-200" />
                )}
              </Link>
            ))}
          </div>

          {mounted && (
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded border border-transparent hover:border-border cursor-pointer"
              aria-label="Toggle theme"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5 text-foreground" />}
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
