"use client"

export default function Projects() {
  const projects = [
    {
      title: "E-Commerce Website (Final Year Project)",
      description: "A responsive mini e-commerce website with product catalog and shopping cart functionality built during final year.",
      tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      image: "/premium-ecommerce-interface.jpg",
      featured: true,
    },
    {
      title: "Live Currency Tracker",
      description: "Real-time currency tracker application that fetches and displays live exchange rates using JavaScript Fetch API.",
      tags: ["JavaScript", "Fetch API", "REST API"],
      image: "/modern-analytics-dashboard-with-neon-effects.jpg",
    },
    {
      title: "Employee Payroll Management System",
      description: "Complete payroll management system with dynamic web pages and database optimization. Built during internship at IWAVY Technology Solutions.",
      tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      image: "/design-system-component-showcase.jpg",
      featured: true,
    },
    {
      title: "Responsive UI Components",
      description: "Built and maintained responsive UI components using React.js and TypeScript at DataTerrain. Improved performance through Redux and RTK Query optimization.",
      tags: ["React", "TypeScript", "Redux", "RTK Query"],
      image: "/modern-chat-interface-with-smooth-design.jpg",
    },
    {
      title: "Healthcare Projects",
      description: "Collaborated in Agile teams on multiple healthcare projects including HSDC, Grid Social, Cape Girardeau, Pillar Harmony, and Workflow Applications.",
      tags: ["React", "TypeScript", "Agile"],
      image: "/cloud-storage-interface.jpg",
    },
    {
      title: "Fitness Tracker Application",
      description: "Modern fitness tracking application with responsive design and interactive features.",
      tags: ["React", "JavaScript", "UI/UX"],
      image: "/fitness-app-interface-design.jpg",
    },
  ]

  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">Featured Projects</h2>
        <p className="text-lg text-foreground/70 mb-16 max-w-2xl">
          Innovative projects showcasing modern design patterns and cutting-edge technologies.
        </p>

        {/* Staggered grid layout */}
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
              {/* Project image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Project info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-sm text-foreground/70 mb-4">{project.description}</p>

                {/* Tags */}
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

                {/* Learn more link */}
                <a
                  href="#"
                  className="inline-block mt-6 text-sm font-semibold text-accent hover:text-primary transition-colors duration-300"
                >
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
