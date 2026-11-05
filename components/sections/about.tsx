"use client"

export default function About() {
  const timelineItems = [
    {
      period: "May 2026 — Present",
      title: "Operations Executive (Zomato Process)",
      organization: "Startek",
      description:
        "Joined on May 27, 2026. Managing operational execution, process compliance, performance metrics, and structured cross-functional issue resolution for the Zomato process to maintain consistent daily service delivery.",
    },
    {
      period: "Oct 2025 — May 2026",
      title: "Freelance Front-End Engineer",
      organization: "Independent Engineering & Client Delivery",
      description:
        "Delivered production web applications and commercial platforms for clients, including the VNB Diapers e-commerce storefront (live catalog sync, instant sizing, WhatsApp order routing) and responsive CRM dashboards built with React, Next.js, and TypeScript.",
    },
    {
      period: "Jul 2024 — Sep 2025",
      title: "Associate Software Developer (Front-End)",
      organization: "DataTerrain Private Limited • Chennai",
      description:
        "Completed tenure in September 2025. Engineered responsive healthcare front-end systems using React.js and TypeScript. Architected state management pipelines with Redux Toolkit and RTK Query, cutting client API redundancy by 30% across data-heavy clinical workflows.",
    },
    {
      period: "2024",
      title: "Front-End & Full-Stack Internship",
      organization: "IWAVY Technology Solutions",
      description:
        "Engineered core modules for an internal Employee Payroll Management system. Implemented responsive dynamic components and database queries with PHP and MySQL.",
    },
    {
      period: "2021 — 2024",
      title: "B.Sc. Computer Science",
      organization: "Islamiah College (Autonomous) • Vaniyambadi",
      description:
        "Graduated with First Class Distinction. Specialized in modern web application architecture, algorithmic problem solving, and software engineering principles.",
    },
  ]

  return (
    <section id="about" className="relative py-28 px-6 border-b border-border">
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2 mb-16 pb-4 border-b border-border">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
            Experience & Background
          </h2>
          <span className="font-mono text-xs sm:text-sm text-muted-foreground">
            Career Timeline
          </span>
        </div>

        {/* Narrative Intro */}
        <div className="max-w-3xl mb-16">
          <p className="text-lg sm:text-xl text-foreground/90 leading-relaxed font-normal">
            Front-End Engineer with experience spanning enterprise software engineering at DataTerrain,
            independent freelance application delivery, and operations execution at Startek. My engineering
            focus remains building fast, accessible, and resilient web interfaces that solve real-world operational challenges.
          </p>
        </div>

        {/* Timeline List */}
        <div className="divide-y divide-border">
          {timelineItems.map((item, idx) => (
            <div key={idx} className="py-10 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                {item.period}
              </div>
              <div className="md:col-span-3 space-y-2">
                <h3 className="text-lg font-medium text-foreground tracking-tight">
                  {item.title}
                </h3>
                <p className="font-mono text-xs text-muted-foreground">
                  {item.organization}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
