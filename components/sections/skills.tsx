"use client"

export default function Skills() {
  const stackGroups = [
    {
      category: "01 / Core UI & Architecture",
      description: "Building accessible, high-performance web front-ends with strict type safety.",
      skills: ["React 19", "Next.js 16 (App Router)", "TypeScript", "HTML5", "CSS3 / Modern CSS"],
    },
    {
      category: "02 / State & Data Fetching",
      description: "Managing predictable asynchronous state, client cache invalidation, and server synchronization.",
      skills: ["Redux Toolkit", "RTK Query", "TanStack Query", "REST APIs", "Firebase Realtime DB"],
    },
    {
      category: "03 / Styling & Design Systems",
      description: "Composing maintainable utility styling, design tokens, and accessible interactive primitives.",
      skills: ["Tailwind CSS v4", "Radix UI", "shadcn/ui", "CSS Variables / OKLCH", "Responsive Layouts"],
    },
    {
      category: "04 / Tooling & Workflow",
      description: "Developer tooling, automated continuous integration, and version control discipline.",
      skills: ["Git & GitHub", "Vercel", "Vite", "VS Code", "Agile / Scrum"],
    },
  ]

  return (
    <section id="skills" className="relative py-20 px-6 border-b border-border">
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2 mb-12 pb-4 border-b border-border">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
            Technical Stack
          </h2>
          <span className="font-mono text-xs sm:text-sm text-muted-foreground">
            Capabilities & Systems
          </span>
        </div>

        {/* Stack Map Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stackGroups.map((group) => (
            <div
              key={group.category}
              className="p-6 rounded-lg border border-border bg-card/40 space-y-4 hover:border-border-strong transition-colors"
            >
              <h3 className="font-mono text-xs text-foreground uppercase tracking-wider font-semibold">
                {group.category}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {group.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded bg-secondary/60 text-secondary-foreground text-xs font-mono border border-border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
