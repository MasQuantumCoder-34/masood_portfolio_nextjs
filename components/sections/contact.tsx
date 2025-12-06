"use client"

import type React from "react"
import { Mail, Phone, Github, Linkedin } from "lucide-react"
import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

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
    const response = await fetch("https://formspree.io/f/mrbnldab", {
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
  } catch (error) {
    setSubmitStatus("error")
  } finally {
    setIsSubmitting(false)
  }
}


  const contactLinks = [
    { name: "GitHub", href: "#", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com/in/mohammedmasoodazhar-v", icon: Linkedin },
    { name: "Phone", href: "tel:+916381653050", icon: Phone },
    { name: "Email", href: "mailto:mohammed.masood6400@gmail.com", icon: Mail },
  ]

  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text text-center">Let's Connect</h2>
        <p className="text-lg text-foreground/70 mb-16 text-center max-w-2xl mx-auto">
          Have a project in mind? Let's collaborate and create something amazing together.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-sm font-semibold text-foreground mb-3">
                Full Name <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full px-6 py-3 rounded-lg bg-white/5 border border-white/20 text-foreground placeholder-foreground/40 focus:border-accent focus:bg-white/10 focus:outline-none transition-all duration-300 glow-pulse"
              />
            </div>
            <div className="group">
              <label className="block text-sm font-semibold text-foreground mb-3">
                Email <span className="text-accent">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="w-full px-6 py-3 rounded-lg bg-white/5 border border-white/20 text-foreground placeholder-foreground/40 focus:border-accent focus:bg-white/10 focus:outline-none transition-all duration-300 glow-pulse"
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-sm font-semibold text-foreground mb-3">
              Subject <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Project collaboration"
              required
              className="w-full px-6 py-3 rounded-lg bg-white/5 border border-white/20 text-foreground placeholder-foreground/40 focus:border-accent focus:bg-white/10 focus:outline-none transition-all duration-300 glow-pulse"
            />
          </div>

          <div className="group">
            <label className="block text-sm font-semibold text-foreground mb-3">
              Message <span className="text-accent">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              rows={6}
              required
              className="w-full px-6 py-3 rounded-lg bg-white/5 border border-white/20 text-foreground placeholder-foreground/40 focus:border-accent focus:bg-white/10 focus:outline-none transition-all duration-300 glow-pulse resize-none"
            />
          </div>

          {submitStatus === "success" && (
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/50 text-green-400 text-center">
              Message sent successfully! I'll get back to you soon.
            </div>
          )}
          {submitStatus === "error" && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-center">
              {!formData.name || !formData.email || !formData.subject || !formData.message
                ? "Please fill in all required fields."
                : "Something went wrong. Please try again."}
            </div>
          )}

          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-12 py-4 rounded-full bg-gradient-to-r from-accent to-primary text-accent-foreground font-bold text-lg hover:shadow-2xl hover:shadow-accent/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>

        <div className="flex justify-center gap-8 mt-16 pt-12 border-t border-white/10 flex-wrap">
          {contactLinks.map((link, i) => {
            const Icon = link.icon
            return (
              <a
                key={i}
                href={link.href}
                target={link.name !== "Phone" && link.name !== "Email" ? "_blank" : undefined}
                rel={link.name !== "Phone" && link.name !== "Email" ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2 text-foreground/70 hover:text-accent transition-all duration-300 font-semibold group"
              >
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                {link.name}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}


