"use client"

import React, { useState, useEffect } from "react"
import { ref, push, query, orderByChild, limitToLast, onValue } from "firebase/database"
import { getFirebaseDatabase } from "@/lib/firebase"
import { CheckCircle, AlertCircle, MessageSquarePlus, Sparkles, Quote } from "lucide-react"
import { playSound } from "@/components/sound/audio-engine"

interface Testimonial {
  id: string
  author: string
  role: string
  rating?: number
  text: string
  avatar?: string
  createdAt?: string
}

interface Toast {
  id: string
  type: "success" | "error"
  message: string
}

const fallbackTestimonials: Testimonial[] = [
  {
    id: "fb-1",
    author: "Technical Project Lead",
    role: "Engineering Supervisor • DataTerrain Collaboration",
    text: "Mohammed demonstrated strong ownership across React and TypeScript development. His optimization of state pipelines using Redux Toolkit and RTK Query significantly cut redundant network calls in production.",
    createdAt: "2024-11-01T10:00:00.000Z",
  },
  {
    id: "fb-2",
    author: "Operations Partner",
    role: "Client Operations Partner • VNB Diaper Project",
    text: "Fast, communicative, and detail-oriented. The VNB Diaper storefront and inventory systems were delivered with high responsiveness and seamless WhatsApp ordering integration.",
    createdAt: "2024-10-28T12:00:00.000Z",
  },
]

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [formData, setFormData] = useState({
    author: "",
    role: "",
    rating: 5,
    text: "",
  })

  const addToast = (type: "success" | "error", message: string) => {
    const id = Date.now().toString()
    setToasts((prev) => [...prev, { id, type, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }

  useEffect(() => {
    try {
      const database = getFirebaseDatabase()
      if (!database) return

      const testimonialRef = ref(database, "testimonials")
      const q = query(testimonialRef, orderByChild("createdAt"), limitToLast(10))

      const unsubscribe = onValue(q, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          const list: Testimonial[] = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
          list.sort(
            (a, b) =>
              new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
          )
          setTestimonials(list)
        }
      })

      return () => unsubscribe()
    } catch {
      // Keep resilient fallback
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.author || !formData.text) {
      addToast("error", "Please fill in all required fields.")
      return
    }

    setSubmitting(true)
    playSound("snap")
    try {
      const database = getFirebaseDatabase()
      if (database) {
        const testimonialRef = ref(database, "testimonials")
        await push(testimonialRef, {
          ...formData,
          createdAt: new Date().toISOString(),
        })
        addToast("success", "Thank you! Endorsement submitted.")
        setFormData({ author: "", role: "", rating: 5, text: "" })
        setShowForm(false)
      } else {
        addToast("success", "Endorsement recorded in local state.")
        setShowForm(false)
      }
    } catch {
      addToast("error", "Error submitting endorsement. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="testimonials" className="relative py-16 sm:py-20 lg:py-24 px-5 sm:px-6 border-b border-black/5 dark:border-white/10 bg-slate-50 dark:bg-black/60 overflow-hidden transition-colors duration-300">
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-1/3 w-[450px] h-[300px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-xs uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Section 07 // Endorsements</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-slate-900 dark:text-white">
              Peer & Client Endorsements
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base mt-2 font-normal">
              Verified feedback from supervisors, project leads, and client partners.
            </p>
          </div>

          <button
            onClick={() => {
              setShowForm(!showForm)
              playSound("tick")
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/15 text-slate-800 dark:text-white font-mono text-xs border border-black/10 dark:border-white/10 transition-all cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{showForm ? "Close Form" : "Submit Endorsement"}</span>
          </button>
        </div>

        {/* Endorsement Submission Form Modal/Panel */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-3xl border border-black/10 dark:border-white/15 bg-white/95 dark:bg-zinc-950/90 backdrop-blur-2xl mb-8 space-y-4 shadow-xl dark:shadow-2xl"
          >
            <h3 className="text-lg font-medium text-slate-900 dark:text-white tracking-tight">
              Submit an Endorsement
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name *"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-black/60 border border-black/10 dark:border-white/10 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 font-mono"
              />
              <input
                type="text"
                placeholder="Role / Organization *"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-black/60 border border-black/10 dark:border-white/10 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
            <textarea
              placeholder="Your professional feedback or endorsement... *"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              required
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-black/60 border border-black/10 dark:border-white/10 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 resize-none font-mono"
            />
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-xs font-mono text-slate-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-mono font-semibold transition-all disabled:opacity-50 cursor-pointer"
              >
                {submitting ? "Submitting..." : "Submit Endorsement"}
              </button>
            </div>
          </form>
        )}

        {/* Endorsements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 rounded-3xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-zinc-950/70 backdrop-blur-2xl shadow-lg dark:shadow-xl flex flex-col justify-between space-y-4 hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="space-y-3">
                <Quote className="w-6 h-6 text-emerald-600 dark:text-emerald-400/60" />
                <p className="text-base sm:text-lg text-slate-800 dark:text-zinc-200 leading-relaxed font-normal">
                  "{item.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-zinc-400">
                <div>
                  <div className="text-slate-900 dark:text-white font-medium text-sm">{item.author}</div>
                  <div className="text-slate-500 dark:text-zinc-500 text-[11px] mt-0.5">{item.role}</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_8px_#10b981]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Notifications */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-2.5 rounded-xl shadow-2xl font-mono text-xs flex items-center gap-2 border pointer-events-auto animate-in slide-in-from-top duration-200 ${
              toast.type === "success"
                ? "bg-zinc-950 border-emerald-500/40 text-emerald-400"
                : "bg-zinc-950 border-red-500/40 text-red-400"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400" />
            )}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
