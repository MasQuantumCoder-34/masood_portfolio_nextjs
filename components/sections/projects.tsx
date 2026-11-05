"use client"

import React, { useState } from "react"
import TiltCard from "@/components/ui/tilt-card"
import { Sparkles, Layers } from "lucide-react"
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
    },
    {
      id: "02",
      title: "DataTerrain Healthcare Analytics Portal",
      category: "Enterprise Clinical Intelligence & Reporting",
      metric: "-30% Redundant API Load • Enterprise Scale",
      filterType: "enterprise",
      problem:
        "Enterprise healthcare client suffered from redundant network requests and slow rendering when clinicians filtered multi-thousand record diagnostic tables.",
      outcome:
        "Architected normalized caching layer with Redux Toolkit and RTK Query with tag-based cache invalidation, cutting client API redundancy by 30% and enabling sub-100ms multi-column clinical filtering.",
      tags: ["React.js", "TypeScript", "RTK Query", "Redux Toolkit", "Tailwind CSS", "REST APIs"],
      image: "/mufar_tech_1.png",
      link: "https://mufartech-website.vercel.app",
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
    <section id="projects" className="relative py-28 px-6 border-b border-white/10 bg-black/70 overflow-hidden">
      {/* Ambient background volumetric glow */}
      <div className="absolute top-1/2 left-1/3 w-[550px] h-[350px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Section 04 // 3D Parallax Deck</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-foreground">
              Signature Production Works
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-xl">
              Production web applications and enterprise portals engineered with React, Next.js, and TypeScript. Hover to engage 3D perspective tilt and specular spotlight.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl">
            <button
              onClick={() => {
                setFilter("all")
                playSound("tick")
              }}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-white text-black font-semibold shadow-lg shadow-white/10"
                  : "text-zinc-400 hover:text-white"
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
                  : "text-zinc-400 hover:text-white"
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
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Enterprise Systems
            </button>
          </div>
        </div>

        {/* 3D Perspective Tilt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <TiltCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}
