"use client"

import { useEffect, useState } from "react"

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10 opacity-30" />
        <div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-primary/30 to-accent/20 blur-3xl"
          style={{
            left: `${mousePosition.x - 192}px`,
            top: `${mousePosition.y - 192}px`,
            transition: "all 0.8s ease-out",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Floating 3D-style text */}
        <div className="space-y-6 mb-8">
          <h1 className="text-7xl md:text-8xl font-bold tracking-tighter mb-4 float">
            <span className="gradient-text">Mohammed</span>
            <br />
            Masood
            <br />
            <span className="text-accent">Azhar</span>
          </h1>

          <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Associate Software Developer (Front-End) | React & TypeScript Specialist | Building responsive UIs and optimizing state management for healthcare applications.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-accent to-primary text-accent-foreground font-bold text-lg hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 hover:scale-105">
            View My Work
          </button>
          <button 
           onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-full border-2 border-accent text-accent font-bold text-lg hover:bg-accent/10 transition-all duration-300"
          >
            Get In Touch
          </button>

        </div>

        {/* Floating cards with stats */}
        <div className="grid grid-cols-3 gap-4 mt-20 md:gap-8">
          {[
            { label: "Projects", value: "5+" },
            { label: "Experience", value: "1+ Years" },
            { label: "Technologies", value: "10+" },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-6 float-delayed" style={{ animationDelay: `${i * 0.5}s` }}>
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-foreground/60 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
