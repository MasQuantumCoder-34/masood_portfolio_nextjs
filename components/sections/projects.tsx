"use client"

import TiltCard from "@/components/ui/tilt-card"

export default function Projects() {
  const projects = [
    {
      id: "01",
      title: "VNB Diapers Storefront",
      category: "Babies & Adult Incontinence Care E-Commerce",
      metric: "Live Store • 38+ SKUs",
      problem:
        "Wholesale & retail distributor needed a zero-friction mobile-first web storefront with live inventory sync and structured order dispatch.",
      outcome:
        "Shipped responsive React/TypeScript storefront syncing 38+ SKUs via TanStack Query and Render backend, with instant variant sizing (NB to XXL) and direct WhatsApp enquiry routing.",
      tags: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "TanStack Query", "MongoDB"],
      image: "/vnb-diapers.jpg",
      link: "https://vnbdiaper.vercel.app/",
    },
    {
      id: "02",
      title: "MufarTech Website",
      category: "Commercial Brand & Service Showcase Platform",
      metric: "Lighthouse 98 • Mobile-First",
      problem:
        "Client required a modern agency website with high visual polish, brand presence, and responsive multi-device fidelity.",
      outcome:
        "Built and deployed a mobile-first Next.js web application achieving 95+ PageSpeed scores, optimized SEO metadata, and zero layout shift.",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
      image: "/mufar_tech_1.png",
      link: "https://mufartech-website.vercel.app",
    },
    {
      id: "03",
      title: "Mufar Tech Tasks",
      category: "Real-Time Project & Team Task Tracker",
      metric: "Sub-300ms State Updates",
      problem:
        "Internal team struggled with fragmented spreadsheet task tracking and slow status visibility.",
      outcome:
        "Engineered real-time collaborative task manager with instant status transitions, filtering, and responsive state handling.",
      tags: ["React", "TypeScript", "State Management", "Tailwind CSS"],
      image: "/task_1.png",
      link: "https://mufar-tech-tasks.vercel.app",
    },
    {
      id: "04",
      title: "Mufar Tech Forms",
      category: "Dynamic Form Builder & Data Collection Engine",
      metric: "Schema Validation • Zero Lag",
      problem:
        "Needed flexible online form generation with schema validation and automated submission tracking.",
      outcome:
        "Constructed client-side form builder featuring real-time input validation, accessible controls, and resilient data serialization.",
      tags: ["React", "TypeScript", "Form Validation", "Radix UI"],
      image: "/forms_1.png",
      link: "https://mufar-tech-forms.vercel.app",
    },
    {
      id: "05",
      title: "Mufar Tech CRM",
      category: "Customer Relationship & Sales Pipeline Dashboard",
      metric: "Real-Time Pipeline Analytics",
      problem:
        "Sales reps required clear pipeline visualization and customer lead history tracking.",
      outcome:
        "Developed analytics and CRM pipeline views with contact management, deal stages, and intuitive dashboard UI.",
      tags: ["React", "TypeScript", "CRM", "Dashboard UI"],
      image: "/crm_1.png",
      link: "https://mufar-tech-crm.vercel.app",
    },
    {
      id: "06",
      title: "Mufar Central Enterprises",
      category: "Confidential Enterprise Management System",
      metric: "Role-Based Access Control",
      problem:
        "Private commercial client needed unified ERP architecture for multi-department billing, inventory, and workforce management.",
      outcome:
        "Delivered full-stack ERP architecture with PostgreSQL schema and role-based permissions. Case details available under NDA.",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
      image: "/premium-ecommerce-interface.jpg",
      confidential: true,
    },
  ]

  return (
    <section id="projects" className="relative py-20 px-6 border-b border-border">
      <div className="max-w-4xl mx-auto w-full">
        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2 mb-12 pb-4 border-b border-border">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
            Selected work
          </h2>
          <span className="font-mono text-xs sm:text-sm text-muted-foreground">
            2024 — 2026 • 3D Parallax Perspective
          </span>
        </div>

        {/* 3D Perspective Tilt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <TiltCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}
