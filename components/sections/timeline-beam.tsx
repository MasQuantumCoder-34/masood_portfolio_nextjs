"use client"

import React, { useRef, useEffect, useState } from "react"
import { Briefcase, GraduationCap, Calendar, MapPin, Sparkles, ChevronRight, CheckCircle2 } from "lucide-react"

interface Milestone {
  period: string
  role: string
  company: string
  location: string
  badge: string
  badgeColor: string
  type: "work" | "education"
  highlights: string[]
  metrics?: string
}

export default function TimelineBeam() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  const milestones: Milestone[] = [
    {
      period: "May 2026 — Present",
      role: "Operations Executive (Zomato Process)",
      company: "Startek",
      location: "Lucknow, India",
      badge: "Current Role // Non-Tech Operations",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      type: "work",
      metrics: "99.4% SLA Adherence • Process Compliance",
      highlights: [
        "Managing day-to-day operational execution and stringent service level agreements (SLAs) for the high-volume Zomato process.",
        "Executing structured cross-functional issue resolution and escalation tracking across operational workflows.",
        "Analyzing real-time process bottlenecks to ensure consistent customer delivery and service metrics.",
      ],
    },
    {
      period: "Oct 2025 — May 2026",
      role: "Freelance Front-End Engineer",
      company: "Independent Client Delivery",
      location: "Remote / Hybrid",
      badge: "Production Delivery",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      type: "work",
      metrics: "Live Storefront • 38+ SKUs • Sub-1.2s LCP",
      highlights: [
        "Architected and deployed the VNB Diapers commercial storefront (https://vnbdiaper.vercel.app/) using React 18, TypeScript, and Vite.",
        "Built dynamic variant matrix enabling instant sizing selection (NB to XXL) without layout shift or UI delay.",
        "Integrated direct zero-friction 3-step WhatsApp order routing, directly connecting customer shopping carts to warehouse dispatch.",
      ],
    },
    {
      period: "Dec 2024 — Sep 2025",
      role: "Associate Software Developer (Front-End)",
      company: "DataTerrain Private Limited",
      location: "Chennai, India",
      badge: "Enterprise Front-End",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      type: "work",
      metrics: "30% Redundant API Load Eliminated • Enterprise Scale",
      highlights: [
        "Engineered community, healthcare, and workflow platform front-ends using React.js and TypeScript, handling data-intensive user dashboards.",
        "Architected state management layer using Redux Toolkit and RTK Query with tag-based cache invalidation, cutting redundant client API calls by 30%.",
        "Refactored legacy UI components into reusable, accessible design systems with sub-100ms client-side filtering.",
      ],
    },
    {
      period: "Jan 2024 — Jun 2024",
      role: "Front-End Developer Intern",
      company: "IWAVY Technology Solutions",
      location: "Chennai, India",
      badge: "Internship",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      type: "work",
      metrics: "Component Design System • UI Performance",
      highlights: [
        "Developed modular, responsive UI components for internal Employee Payroll Management systems using React and modern CSS.",
        "Collaborated with senior engineers to implement data table pagination, role-based view controls, and cross-browser testing.",
      ],
    },
    {
      period: "2021 — 2024",
      role: "Bachelor of Science in Computer Science",
      company: "Islamiah College (Autonomous)",
      location: "Vaniyambadi, India",
      badge: "First Class Distinction (8.5 CGPA)",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      type: "education",
      metrics: "8.5 CGPA • Academic Distinction",
      highlights: [
        "Graduated with First Class Distinction, focusing on Data Structures, Algorithms, Software Engineering, and Web Development.",
        "Led academic front-end capstone projects and represented the department in technical symposiums.",
      ],
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      // Calculate how far container has scrolled into view
      const top = rect.top
      const height = rect.height
      const progress = Math.min(Math.max((windowHeight * 0.7 - top) / height, 0), 1)
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="timeline" ref={containerRef} className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 border-b border-white/10 bg-black/80 overflow-hidden">
      {/* Ambient background volumetric glow */}
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Section 06 // The Lightbeam Path</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-foreground">
            Career Timeline & Milestones
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-2">
            A vertical laser lightbeam draws itself in lockstep with scroll progress, illuminating career milestones from enterprise engineering to operations executive.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 lg:pl-12">
          {/* Vertical Track Background Line */}
          <div className="absolute left-[18px] sm:left-[22px] lg:left-[26px] top-4 bottom-4 w-[2px] bg-white/10" />

          {/* Glowing Animated Laser Lightbeam */}
          <div
            className="absolute left-[18px] sm:left-[22px] lg:left-[26px] top-4 w-[2px] bg-gradient-to-b from-emerald-400 via-cyan-400 to-emerald-300 shadow-[0_0_12px_#34d399] transition-all duration-300 ease-out origin-top"
            style={{
              height: `${scrollProgress * 96}%`,
            }}
          >
            {/* Pulsing Laser Head */}
            <div className="absolute bottom-0 -left-[5px] w-3 h-3 rounded-full bg-emerald-300 shadow-[0_0_20px_#10b981] animate-ping" />
            <div className="absolute bottom-0 -left-[3px] w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff]" />
          </div>

          {/* Milestone Cards */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            {milestones.map((item, idx) => {
              const cardThreshold = (idx + 0.5) / milestones.length
              const isPassed = scrollProgress >= cardThreshold

              return (
                <div key={idx} className="relative group">
                  {/* Glowing Node Beacon */}
                  <div
                    className={`absolute -left-[27px] sm:-left-[31px] lg:-left-[35px] top-6 w-5 h-5 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
                      isPassed
                        ? "bg-black border-emerald-400 shadow-[0_0_16px_#10b981] scale-110"
                        : "bg-zinc-900 border-white/20"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isPassed ? "bg-emerald-400 animate-pulse" : "bg-zinc-600"
                      }`}
                    />
                  </div>

                  {/* Card Body */}
                  <div
                    className={`p-5 sm:p-7 rounded-3xl border transition-all duration-500 backdrop-blur-2xl shadow-xl ${
                      isPassed
                        ? "bg-zinc-950/80 border-white/15 hover:border-emerald-500/40 shadow-emerald-500/5 translate-x-1"
                        : "bg-zinc-950/40 border-white/5 opacity-80"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                        {item.metrics && (
                          <span className="font-mono text-xs text-zinc-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                            {item.metrics}
                          </span>
                        )}
                      </div>

                      <div className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{item.period}</span>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
                      {item.role}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium mb-4">
                      <span>{item.company}</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-zinc-400 font-mono text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-zinc-500" />
                        {item.location}
                      </span>
                    </div>

                    <ul className="space-y-2 text-sm text-zinc-300 leading-relaxed font-normal">
                      {item.highlights.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400/80 mt-1 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
