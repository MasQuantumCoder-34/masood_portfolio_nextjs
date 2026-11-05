"use client"

import React, { useState } from "react"
import { Github, Linkedin, Phone, Mail, ArrowUpRight, Send, CheckCircle2, AlertCircle } from "lucide-react"
import { playSound } from "@/components/sound/audio-engine"

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
    playSound("snap")
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
        playSound("chord")
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
    <section id="contact-form" className="relative py-24 px-6 border-b border-white/10 bg-black/80 overflow-hidden">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left Column: Direct Inquiries */}
          <div className="md:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">
              <span>Direct Comms</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Let's build something exceptional.
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Available for front-end engineering roles, design system consulting, and enterprise web applications. Submit a transmission or connect directly.
            </p>

            <div className="space-y-3 pt-6 border-t border-white/10">
              {directChannels.map((item) => (
                <div key={item.label} className="flex justify-between items-center text-xs font-mono p-3 rounded-xl bg-zinc-900/60 border border-white/5">
                  <span className="text-zinc-500 uppercase">{item.label}</span>
                  <a
                    href={item.href}
                    target={item.label === "Email" || item.label === "Phone" ? undefined : "_blank"}
                    rel={item.label === "Email" || item.label === "Phone" ? undefined : "noopener noreferrer"}
                    onClick={() => playSound("tick")}
                    className="text-white hover:text-emerald-400 transition-colors inline-flex items-center gap-1 font-semibold"
                  >
                    <span>{item.value}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Transmission Form */}
          <div className="md:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-2xl shadow-2xl space-y-4"
            >
              <h3 className="text-lg font-semibold text-white tracking-tight mb-2">
                Send Direct Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Alex Morgan"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400 font-mono transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@company.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400 font-mono transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Front-End Role / Project Discussion"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400 font-mono transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your transmission..."
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400 resize-none font-mono transition-colors"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  {submitStatus === "success" && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Message Dispatched Successfully!</span>
                    </span>
                  )}
                  {submitStatus === "error" && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-red-400">
                      <AlertCircle className="w-4 h-4" />
                      <span>Transmission failed. Try direct email.</span>
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-semibold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Sending..." : "Dispatch Message"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
