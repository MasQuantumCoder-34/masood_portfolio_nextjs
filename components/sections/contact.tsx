"use client"

import type React from "react"
import { useState } from "react"
import { Github, Linkedin, Phone, Mail, ArrowUpRight } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const endpoint =
    process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/mrbnldab"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setSubmitStatus("idle")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus("error")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const directChannels = [
    { label: "Email", value: "masazhar321@gmail.com", href: "mailto:masazhar321@gmail.com" },
    { label: "Phone", value: "+91 6381653050", href: "tel:+916381653050" },
    { label: "LinkedIn", value: "mohammedmasoodazhar-v", href: "https://linkedin.com/in/mohammedmasoodazhar-v" },
    { label: "GitHub", value: "MasQuantumCoder-34", href: "https://github.com/MasQuantumCoder-34" },
  ]

  return (
    <section id="contact" className="relative py-20 px-6">
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2 mb-12 pb-4 border-b border-border">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
            Contact
          </h2>
          <span className="font-mono text-xs sm:text-sm text-muted-foreground">
            Get In Touch
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Column: Direct Inquiries */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-medium text-foreground tracking-tight mb-3">
                Let's discuss opportunities.
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I am currently open to front-end developer roles, contract engineering, and enterprise collaborations.
                Reach out directly or use the contact form.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-border">
              {directChannels.map((item) => (
                <div key={item.label} className="flex justify-between items-center text-xs font-mono">
                  <span className="text-muted-foreground uppercase">{item.label}</span>
                  <a
                    href={item.href}
                    target={item.label === "Email" || item.label === "Phone" ? undefined : "_blank"}
                    rel={item.label === "Email" || item.label === "Phone" ? undefined : "noopener noreferrer"}
                    className="text-foreground hover:text-muted-foreground transition-colors inline-flex items-center gap-1"
                  >
                    <span>{item.value}</span>
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-muted-foreground uppercase mb-1.5">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full px-3.5 py-2.5 rounded bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-muted-foreground uppercase mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="w-full px-3.5 py-2.5 rounded bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-muted-foreground uppercase mb-1.5">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Role inquiry or project scope"
                required
                className="w-full px-3.5 py-2.5 rounded bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-muted-foreground uppercase mb-1.5">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Details about the role or requirements..."
                rows={4}
                required
                className="w-full px-3.5 py-2.5 rounded bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors resize-none"
              />
            </div>

            {submitStatus === "success" && (
              <div className="p-3 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-mono">
                Message sent successfully. I will get back to you shortly.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="p-3 rounded border border-red-500/30 bg-red-500/10 text-red-300 text-xs font-mono">
                Failed to send message. Please reach out via email directly.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded bg-foreground text-background font-medium text-xs font-mono uppercase tracking-wider hover:bg-foreground/90 disabled:opacity-50 transition-colors cursor-pointer"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
