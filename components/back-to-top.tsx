"use client"

import React, { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { playSound } from "@/components/sound/audio-engine"

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    playSound("snap")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => playSound("tick")}
      className={`fixed bottom-8 right-8 z-40 p-3 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-black/10 dark:border-white/10 text-slate-800 dark:text-white shadow-xl dark:shadow-2xl backdrop-blur-xl transition-all duration-300 cursor-pointer hover:border-emerald-500/50 hover:scale-110 active:scale-95 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Back to top"
      title="Back to top"
    >
      <ArrowUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
    </button>
  )
}
