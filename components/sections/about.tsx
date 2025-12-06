"use client"

export default function About() {
  const timelineItems = [
    {
      year: "2024",
      title: "Associate Software Developer (Front-End)",
      company: "DataTerrain Private Limited, Chennai",
      description: "Built and maintained responsive UI components using React.js and TypeScript. Optimized state management using Redux and RTK Query, reducing API redundancy by 30%. Collaborated in Agile teams on multiple healthcare projects.",
    },
    {
      year: "2024",
      title: "On-site Internship",
      company: "IWAVY Technology Solutions",
      description: "Worked on Employee Payroll Management System using HTML, CSS, JavaScript, PHP, and MySQL. Designed and maintained dynamic web pages and improved database efficiency.",
    },
    {
      year: "2024",
      title: "E-commerce Website (Final Year Project)",
      company: "Islamiah College (Autonomous)",
      description: "Built a responsive mini e-commerce site with product and cart modules using HTML, CSS, JavaScript, and PHP.",
    },
    {
      year: "2024",
      title: "B.Sc. Computer Science Graduate",
      company: "Islamiah College (Autonomous), Vaniyambadi",
      description: "Graduated with First Class Distinction (July 2021 - May 2024). Specialized in web development and software engineering.",
    },
  ]

  return (
    <section id="about" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">About Me</h2>
        <p className="text-lg text-foreground/70 mb-16 max-w-2xl">
          I combine creative thinking with technical expertise to build digital solutions that not only look beautiful
          but perform exceptionally.
        </p>

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {timelineItems.map((item, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-accent-foreground font-bold">
                  {index + 1}
                </div>
                <div className="flex-grow">
                  <div className="text-sm font-semibold text-accent">{item.year}</div>
                  <h3 className="text-xl font-bold text-foreground mt-2">{item.title}</h3>
                  <p className="text-sm font-medium text-foreground/60 mt-1">{item.company}</p>
                  <p className="text-foreground/70 mt-4">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
