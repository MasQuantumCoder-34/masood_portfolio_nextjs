"use client"

import { useState, useEffect, useCallback } from "react"

function ImageSlideshow({ images, alt }: { images: string[]; alt: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <div className="relative h-full w-full">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${alt} - ${i + 1}`}
          className="w-full h-full object-cover absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === currentIndex ? 1 : 0 }}
        />
      ))}
    </div>
  )
}

export default function Projects() {
  const projects = [
    {
      title: "MufarTech Website",
      description: "Company website showcasing services, portfolio, and brand presence with modern UI/UX design and responsive layouts.",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      images: ["/mufar_tech_1.png", "/mufar_tech_2.png"],
      link: "https://mufartech-website.vercel.app",
      featured: true,
    },
    {
      title: "Mufar Tech Tasks",
      description: "Task management application for organizing, tracking, and collaborating on projects with real-time updates.",
      tags: ["React", "TypeScript", "Task Management", "UI/UX"],
      images: ["/task_1.png", "/task_2.png", "/task_3.png"],
      link: "https://mufar-tech-tasks.vercel.app",
    },
    {
      title: "Mufar Tech Forms",
      description: "Dynamic form builder and submission platform with validation, data collection, and analytics capabilities.",
      tags: ["React", "TypeScript", "Forms", "Validation"],
      images: ["/forms_1.png", "/forms_2.png"],
      link: "https://mufar-tech-forms.vercel.app",
      featured: true,
    },
    {
      title: "Mufar Tech CRM",
      description: "Customer relationship management system with contact tracking, sales pipeline, and reporting features.",
      tags: ["React", "TypeScript", "CRM", "Dashboard"],
      images: ["/crm_1.png", "/crm_2.png", "/crm_3.png"],
      link: "https://mufar-tech-crm.vercel.app",
    },
    {
      title: "Mufar Central Enterprises",
      description: "A full-stack enterprise management solution built for a private client. Includes inventory tracking, billing, employee management, and reporting modules. Project details are confidential per client agreement.",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
      images: ["/premium-ecommerce-interface.jpg", "/cloud-storage-interface.jpg"],
      confidential: true,
      featured: true,
    },
  ]

  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">Featured Projects</h2>
        <p className="text-lg text-foreground/70 mb-16 max-w-2xl">
          Innovative projects showcasing modern design patterns and cutting-edge technologies.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group glass rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2 ${
                project.featured ? "md:col-span-2 lg:col-span-1" : ""
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {project.confidential ? (
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                  <ImageSlideshow images={project.images} alt={project.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
              ) : (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="block relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                  <ImageSlideshow images={project.images} alt={project.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              )}

              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                  {project.confidential && (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/50">
                      Confidential
                    </span>
                  )}
                </div>
                <p className="text-sm text-foreground/70 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-accent/30 to-primary/30 text-accent border border-accent/50 hover:border-accent transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {!project.confidential && (
                  <div className="flex items-center gap-3 mt-6">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-green-500/15 text-green-400 border border-green-500/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Live
                    </span>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-accent hover:text-primary transition-colors duration-300"
                    >
                      View Project →
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
