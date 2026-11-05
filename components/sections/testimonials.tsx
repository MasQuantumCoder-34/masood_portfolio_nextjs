"use client"

import { useState, useEffect } from "react"
import { ref, push, query, orderByChild, limitToLast, onValue } from "firebase/database"
import { getFirebaseDatabase } from "@/lib/firebase"
import { CheckCircle, AlertCircle, MessageSquarePlus } from "lucide-react"

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

// Resilient Fallback Endorsements (Audit Item #4)
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
    author: "Client Operations Partner",
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
        const data = snapshot.val()
        if (data) {
          const remoteList: Testimonial[] = Object.entries(data)
            .map(([id, value]: any) => ({
              id,
              ...value,
            }))
            .reverse()

          if (remoteList.length > 0) {
            setTestimonials(remoteList)
          }
        }
      })

      return () => unsubscribe()
    } catch {
      // Gracefully maintain fallback endorsements
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.author || !formData.role || !formData.text) {
      addToast("error", "Please fill in all required fields.")
      return
    }

    const database = getFirebaseDatabase()
    if (!database) {
      addToast("error", "Database connection unavailable. Please try again later.")
      return
    }

    setSubmitting(true)
    try {
      const testimonialsRef = ref(database, "testimonials")
      await push(testimonialsRef, {
        author: formData.author,
        role: formData.role,
        rating: formData.rating,
        text: formData.text,
        createdAt: new Date().toISOString(),
      })

      setFormData({ author: "", role: "", rating: 5, text: "" })
      setShowForm(false)
      addToast("success", "Thank you! Your endorsement has been submitted.")
    } catch {
      addToast("error", "Error submitting endorsement. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="testimonials" className="relative py-28 px-6 border-b border-border">
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2 mb-16 pb-4 border-b border-border">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
            Endorsements
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span>{showForm ? "Close Form" : "Leave an Endorsement"}</span>
          </button>
        </div>

        {/* Endorsement Submission Form Modal/Panel */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-lg border border-border bg-card/60 mb-12 space-y-4"
          >
            <h3 className="text-lg font-medium text-foreground tracking-tight">
              Submit an Endorsement
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name *"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
              />
              <input
                type="text"
                placeholder="Role / Organization *"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
              />
            </div>
            <textarea
              placeholder="Your professional feedback or endorsement... *"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              required
              rows={3}
              className="w-full px-4 py-2.5 rounded bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground resize-none"
            />
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-xs font-mono text-muted-foreground hover:text-foreground"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 rounded bg-foreground text-background text-xs font-medium hover:bg-foreground/90 disabled:opacity-50 cursor-pointer"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        )}

        {/* Endorsements List */}
        <div className="divide-y divide-border">
          {testimonials.map((item) => (
            <div key={item.id} className="py-8 first:pt-0 last:pb-0 space-y-4">
              <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-normal">
                "{item.text}"
              </p>
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                <div>
                  <span className="text-foreground font-medium">{item.author}</span>
                  <span className="mx-2">•</span>
                  <span>{item.role}</span>
                </div>
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
            className={`flex items-center gap-2 px-4 py-3 rounded border text-xs font-mono backdrop-blur-md pointer-events-auto ${
              toast.type === "success"
                ? "bg-zinc-900 border-emerald-500/40 text-emerald-300"
                : "bg-zinc-900 border-red-500/40 text-red-300"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
