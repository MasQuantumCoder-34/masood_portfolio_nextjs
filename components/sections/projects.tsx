"use client"

import { ArrowUpRight, Lock, ExternalLink } from "lucide-react"

interface ProjectItem {
  id: string
  title: string
  subtitle: string
  problem: string
  outcome: string
  tags: string[]
  image: string
  link?: string
  confidential?: boolean
}

export default function Projects() {
  const projects: ProjectItem[] = [
    {
      id: "01",
      title: "VNB Diapers Storefront",
      subtitle: "Babies & Adult Incontinence Care E-Commerce Platform",
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
      subtitle: "Commercial Brand & Service Showcase Platform",
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
      subtitle: "Real-Time Project & Team Task Tracker",
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
      subtitle: "Dynamic Form Builder & Data Collection Engine",
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
      subtitle: "Customer Relationship & Sales Pipeline Dashboard",
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
      subtitle: "Confidential Enterprise Management System",
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
    <section id="projects" className="relative pt-14 pb-20 px-6 border-b border-border">
      <div className="max-w-4xl mx-auto w-full">
        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2 mb-12 pb-4 border-b border-border">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
            Selected work
          </h2>
          <span className="font-mono text-xs sm:text-sm text-muted-foreground">
            2024 — 2026
          </span>
        </div>

        {/* Case Study List */}
        <div className="divide-y divide-border">
          {projects.map((project) => (
            <article key={project.id} className="py-12 first:pt-0 last:pb-0 group">
              <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
                {/* Left Meta & Description */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground">
                      {project.id}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-medium text-foreground tracking-tight">
                      {project.title}
                    </h3>
                    {project.confidential && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-muted text-muted-foreground border border-border">
                        <Lock className="w-3 h-3" />
                        Confidential
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    {project.subtitle}
                  </p>

                  <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      <strong className="text-foreground/90 font-medium">Problem:</strong>{" "}
                      {project.problem}
                    </p>
                    <p>
                      <strong className="text-foreground/90 font-medium">Outcome:</strong>{" "}
                      {project.outcome}
                    </p>
                  </div>

                  {/* Stack line */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 font-mono text-xs text-muted-foreground/70">
                    {project.tags.map((tag, i) => (
                      <span key={tag}>
                        {tag}
                        {i < project.tags.length - 1 && " •"}
                      </span>
                    ))}
                  </div>

                  {/* Direct Link Action */}
                  <div className="pt-4">
                    {project.confidential ? (
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <span>Request case study details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors group/link cursor-pointer"
                      >
                        <span>Visit live website</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Interactive Screenshot Preview */}
                <div className="w-full md:w-72 flex-shrink-0">
                  {project.confidential ? (
                    <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-border bg-card">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale opacity-60"
                      />
                      <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                        <Lock className="w-6 h-6 text-muted-foreground" />
                      </div>
                    </div>
                  ) : (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative aspect-[16/10] rounded-lg overflow-hidden border border-border bg-card group/img cursor-pointer"
                      title={`Open ${project.title}`}
                    >
                      <img
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 text-white text-xs font-medium backdrop-blur-[2px]">
                        <span>Open website</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
