"use client"

import { useState } from "react"

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("frontend")

  const skillsData = {
    frontend: [
      { name: "React", level: 90 },
      { name: "TypeScript", level: 88 },
      { name: "HTML/CSS", level: 92 },
      { name: "JavaScript", level: 90 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Redux/RTK Query", level: 88 },
    ],
    backend: [
      { name: "Node.js (Learning)", level: 70 },
      { name: "Express.js (Learning)", level: 70 },
      { name: "PHP", level: 85 },
      { name: "MySQL", level: 82 },
      { name: "REST API", level: 88 },
      { name: "State Management", level: 85 },
    ],
    tools: [
      { name: "VS Code", level: 95 },
      { name: "Git", level: 88 },
      { name: "Agile/Scrum", level: 85 },
      { name: "Cursor IDE", level: 90 },
      { name: "IntelliJ IDEA", level: 80 },
      { name: "Sublime Text", level: 80 },
    ],
  }

  const categories = [
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "tools", label: "Tools & DevOps" },
  ]

  return (
    <section id="skills" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">Skills</h2>
        <p className="text-lg text-foreground/70 mb-16 max-w-2xl">
          A comprehensive toolkit built through years of experience and continuous learning.
        </p>

        {/* Category tabs */}
        <div className="flex gap-4 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-accent to-primary text-accent-foreground shadow-lg shadow-accent/40"
                  : "glass hover:bg-white/15"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData[activeCategory as keyof typeof skillsData].map((skill, index) => (
            <div key={index} className="group">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">{skill.name}</h3>
                <span className="text-sm font-bold text-accent">{skill.level}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent to-primary rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
