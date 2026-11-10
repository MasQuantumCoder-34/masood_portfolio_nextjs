"use client"

import React, { useState } from "react"
import TiltCard from "@/components/ui/tilt-card"
import { Sparkles, Layers, Bug, Wrench, ArrowUpRight, Zap, CheckCircle2 } from "lucide-react"
import { playSound } from "@/components/sound/audio-engine"

export default function Projects() {
  const [filter, setFilter] = useState<"all" | "enterprise" | "storefront">("all")

  const projects = [
    {
      id: "01",
      title: "VNB Diapers E-Commerce Storefront",
      category: "Babies & Adult Incontinence Care E-Commerce",
      metric: "Live Storefront • 38+ SKUs",
      filterType: "storefront",
      problem:
        "Wholesale & retail diaper manufacturer needed a fast, mobile-first web storefront with instantaneous size selection, live inventory synchronization, and direct order fulfillment.",
      outcome:
        "Engineered responsive React 18 & TypeScript storefront syncing 38+ SKUs via TanStack Query and Render backend. Features instant multi-tier variant sizing (NB to XXL) without layout shift and direct WhatsApp 3-step checkout routing.",
      tags: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "TanStack Query", "MongoDB"],
      image: "/vnb-diapers.jpg",
      link: "https://vnbdiaper.vercel.app/",
      fiverrNote: true,
    },
    {
      id: "02",
      title: "MufarTech Parent Commercial Platform",
      category: "Main Parent Website & Digital Agency Hub",
      metric: "Lighthouse 98 • Modern React Architecture",
      filterType: "enterprise",
      problem:
        "Commercial digital agency required a high-performance, polished digital gateway to present enterprise services, client portfolio deliverables, and streamlined project enquiry flows.",
      outcome:
        "Architected and deployed the main parent website for MufarTech with responsive Next.js and TypeScript, modern micro-interactions, zero layout shift, and SEO-optimized web architecture.",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "Web Performance"],
      image: "/mufar_tech_1.png",
      link: "https://mufartech-website.vercel.app",
      fiverrNote: true,
    },
    {
      id: "03",
      title: "Mufar Tech Real-Time Task Tracker",
      category: "Team Workflow & Task Management Engine",
      metric: "Sub-300ms State Sync • Real-Time",
      filterType: "storefront",
      problem:
        "Internal distributed team needed high-velocity task tracking without the lag and confusion of spreadsheet handoffs.",
      outcome:
        "Engineered real-time collaborative task manager with instant status transitions, custom filtering, and resilient optimistic UI updates.",
      tags: ["React", "TypeScript", "State Architecture", "Tailwind CSS"],
      image: "/task_1.png",
      link: "https://mufar-tech-tasks.vercel.app",
      fiverrNote: true,
    },
    {
      id: "04",
      title: "Mufar Tech Dynamic Form Builder",
      category: "Data Collection & Schema Validation Engine",
      metric: "Zero Lag • Zod Schema Validation",
      filterType: "enterprise",
      problem:
        "Client needed flexible online form generation with strict schema validation and automated submission tracking.",
      outcome:
        "Constructed client-side form builder featuring real-time input validation, accessible controls, and resilient data serialization.",
      tags: ["React", "TypeScript", "Form Validation", "Radix UI"],
      image: "/forms_1.png",
      link: "https://mufar-tech-forms.vercel.app",
      fiverrNote: true,
    },
    {
      id: "05",
      title: "Mufar Tech Sales Pipeline CRM",
      category: "Customer Relationship & Revenue Analytics",
      metric: "Real-Time Pipeline Analytics",
      filterType: "enterprise",
      problem:
        "Sales reps required clear pipeline visualization and customer lead history tracking across deals.",
      outcome:
        "Developed analytics and CRM pipeline views with contact management, deal stages, and intuitive dashboard UI.",
      tags: ["React", "TypeScript", "CRM", "Dashboard UI"],
      image: "/crm_1.png",
      link: "https://mufar-tech-crm.vercel.app",
      fiverrNote: true,
    },
    {
      id: "06",
      title: "Enterprise Multi-Department ERP",
      category: "Commercial Enterprise Management System",
      metric: "Role-Based Access Control",
      filterType: "enterprise",
      problem:
        "Private commercial client needed unified ERP architecture for multi-department billing, inventory, and workforce management.",
      outcome:
        "Delivered full-stack ERP architecture with PostgreSQL schema and role-based permissions. Case details available under NDA.",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
      image: "/premium-ecommerce-interface.jpg",
      confidential: true,
    },
  ]

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.filterType === filter)

  return (
    <section id="projects" className="relative py-16 sm:py-20 lg:py-24 px-5 sm:px-6 border-b border-black/5 dark:border-white/10 bg-slate-100/50 dark:bg-black/70 overflow-hidden transition-colors duration-300">
      {/* Ambient background volumetric glow */}
      <div className="absolute top-1/2 left-1/3 w-[550px] h-[350px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-xs uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Section 04 // 3D Parallax Deck</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-slate-900 dark:text-foreground">
              Signature Production Works
            </h2>
            <p className="text-slate-600 dark:text-muted-foreground text-sm sm:text-base mt-2 max-w-xl font-normal">
              Production web applications, parent agency showcases, and commercial platforms engineered with React, Next.js, Flutter, and TypeScript. Hover to engage 3D perspective tilt.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/90 dark:bg-zinc-900/80 border border-black/10 dark:border-white/10 backdrop-blur-xl shadow-md dark:shadow-none">
            <button
              onClick={() => {
                setFilter("all")
                playSound("tick")
              }}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-black font-semibold shadow-md"
                  : "text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              }`}
            >
              All Works
            </button>
            <button
              onClick={() => {
                setFilter("storefront")
                playSound("tick")
              }}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                filter === "storefront"
                  ? "bg-cyan-500 text-black font-semibold shadow-lg shadow-cyan-500/20"
                  : "text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Storefronts & Apps
            </button>
            <button
              onClick={() => {
                setFilter("enterprise")
                playSound("tick")
              }}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                filter === "enterprise"
                  ? "bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-500/20"
                  : "text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Enterprise Systems
            </button>
          </div>
        </div>

        {/* High-Impact Fiverr Bug-Fixing & API Integration Callout Banner */}
        <div className="mb-8 sm:mb-10 p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-50/90 via-white/90 to-cyan-50/90 dark:from-emerald-950/40 dark:via-zinc-950/80 dark:to-cyan-950/40 backdrop-blur-2xl shadow-xl dark:shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-mono text-xs font-semibold">
                <Wrench className="w-3.5 h-3.5" />
                <span>Freelance Service Available</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Need a bug fixed in a similar app? Order my bug-fixing service here.
              </h3>
              <p className="text-sm text-slate-700 dark:text-zinc-300 leading-relaxed font-normal">
                Specialized in <strong className="text-slate-900 dark:text-white">Flutter & Dart</strong> mobile UI fixes, <strong className="text-slate-900 dark:text-white">React & Next.js</strong> state debugging, <strong className="text-slate-900 dark:text-white">REST API integration</strong>, cache invalidation, and production frontend patching. Fast turnaround guaranteed.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px] text-slate-600 dark:text-zinc-400">
                <span className="flex items-center gap-1 bg-white/80 dark:bg-black/50 px-2.5 py-1 rounded-lg border border-black/5 dark:border-white/5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Flutter & Dart Fixes
                </span>
                <span className="flex items-center gap-1 bg-white/80 dark:bg-black/50 px-2.5 py-1 rounded-lg border border-black/5 dark:border-white/5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> API Integration
                </span>
                <span className="flex items-center gap-1 bg-white/80 dark:bg-black/50 px-2.5 py-1 rounded-lg border border-black/5 dark:border-white/5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> React State & UI Bugs
                </span>
              </div>
            </div>

            <a
              href="https://www.fiverr.com/s/8xyp7XZ"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound("chord")}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-xl shadow-emerald-500/25 active:scale-95 group/btn whitespace-nowrap cursor-pointer"
            >
              <span>Order Bug-Fixing on Fiverr</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* 3D Perspective Tilt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <TiltCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}
