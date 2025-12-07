"use client"

import { useState, useEffect } from "react"
import { ref, push, query, orderByChild, limitToLast, onValue } from "firebase/database"
import { getFirebaseDatabase } from "@/lib/firebase"
import { X, CheckCircle, AlertCircle } from "lucide-react"

interface Testimonial {
  id: string
  author: string
  role: string
  rating: number
  text: string
  avatar: string
  createdAt: string
}

interface Toast {
  id: string
  type: "success" | "error"
  message: string
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const testDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())

  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })

  if (testDate.getTime() === today.getTime()) {
    return `Today at ${timeStr}`
  } else if (testDate.getTime() === yesterday.getTime()) {
    return `Yesterday at ${timeStr}`
  } else {
    const dateStr = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    return `${dateStr} at ${timeStr}`
  }
}
export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
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
    const database = getFirebaseDatabase()
    const testimonialRef = ref(database, "testimonials")

    const q = query(testimonialRef, orderByChild("createdAt"), limitToLast(10))

    const unsubscribe = onValue(q, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const testimonialsArray: Testimonial[] = Object.entries(data)
          .map(([id, value]: any) => ({
            id,
            ...value,
          }))
          .reverse()
        setTestimonials(testimonialsArray)
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (!autoplay || testimonials.length === 0) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.author || !formData.role || !formData.text) {
      addToast("error", "Please fill in all fields")
      return
    }

    setSubmitting(true)
    try {
      const database = getFirebaseDatabase()
      const testimonialsRef = ref(database, "testimonials")

      await push(testimonialsRef, {
        author: formData.author,
        role: formData.role,
        rating: formData.rating,
        text: formData.text,
        avatar: "/placeholder-user.jpg",
        createdAt: new Date().toISOString(),
      })

      setFormData({ author: "", role: "", rating: 5, text: "" })
      setShowForm(false)
      addToast("success", "Thank you! Your review will be displayed shortly.")
    } catch (error) {
      console.error("Error submitting testimonial:", error)
      addToast("error", "Error submitting review. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">Testimonials</h2>
          <p className="text-lg text-foreground/70 mb-8">Be the first to leave a review!</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-accent to-primary text-accent-foreground font-bold hover:shadow-lg transition-all"
          >
            Leave a Review
          </button>
        </div>
        {showForm && (
          <TestimonialForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            submitting={submitting}
            onClose={() => setShowForm(false)}
          />
        )}
        <ToastContainer toasts={toasts} />
      </section>
    )
  }

  return (
    <section id="testimonials" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h2 className="text-4xl md:text-6xl font-bold gradient-text">Testimonials</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-accent to-primary text-accent-foreground font-semibold text-sm hover:shadow-lg transition-all whitespace-nowrap"
          >
            Leave a Review
          </button>
        </div>

        {showForm && (
          <TestimonialForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            submitting={submitting}
            onClose={() => setShowForm(false)}
          />
        )}

        <div className="relative min-h-[500px] md:min-h-[400px]">
          <div className="grid grid-cols-1 gap-6 relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`glass rounded-2xl p-6 md:p-8 transition-all duration-500 transform ${
                  activeIndex === index
                    ? "opacity-100 scale-100 relative"
                    : "opacity-0 absolute inset-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < testimonial.rating ? "text-accent text-xl" : "text-white/20 text-xl"}>
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-lg md:text-xl text-foreground mb-6 md:mb-8 leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-accent/30 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-foreground truncate">{testimonial.author}</h4>
                    <p className="text-sm text-foreground/60 truncate">{testimonial.role}</p>
                    <p className="text-xs text-foreground/40 mt-1">{formatDate(testimonial.createdAt)}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index)
                  setAutoplay(false)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-gradient-to-r from-accent to-primary w-8"
                    : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <ToastContainer toasts={toasts} />
    </section>
  )
}

function TestimonialForm({
  formData,
  setFormData,
  onSubmit,
  submitting,
  onClose,
}: {
  formData: any
  setFormData: any
  onSubmit: (e: React.FormEvent) => void
  submitting: boolean
  onClose: () => void
}) {
  return (
    <form onSubmit={onSubmit} className="glass rounded-2xl p-6 md:p-8 mb-12">
      <h3 className="text-2xl font-bold mb-6">Share Your Experience</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Your name *"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          required
          className="px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-foreground placeholder-foreground/40 focus:border-accent focus:outline-none"
        />
        <input
          type="text"
          placeholder="Your role/company *"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
          className="px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-foreground placeholder-foreground/40 focus:border-accent focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Rating *</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFormData({ ...formData, rating: star })}
              className={`text-3xl transition-all cursor-pointer ${
                star <= formData.rating ? "text-accent scale-110" : "text-white/30"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <textarea
        placeholder="Share your experience... *"
        value={formData.text}
        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
        required
        rows={4}
        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-foreground placeholder-foreground/40 focus:border-accent focus:outline-none resize-none mb-6"
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 px-6 py-3 rounded-full bg-gradient-to-r from-accent to-primary text-accent-foreground font-semibold hover:shadow-lg transition-all disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-6 py-3 rounded-full border-2 border-accent text-accent font-semibold hover:bg-accent/10 transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

function ToastContainer({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-6 py-4 rounded-lg backdrop-blur-md border pointer-events-auto animate-in fade-in slide-in-from-right-4 duration-300 ${
            toast.type === "success"
              ? "bg-green-500/10 border-green-500/50 text-green-400"
              : "bg-red-500/10 border-red-500/50 text-red-400"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      ))}
    </div>
  )
}
