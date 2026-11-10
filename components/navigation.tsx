"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Volume2, VolumeX, Terminal, Sparkles, Compass, ExternalLink } from "lucide-react"
import { playSound, toggleAudioMute, isAudioMuted } from "@/components/sound/audio-engine"

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("hero")
  const [muted, setMuted] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setMuted(isAudioMuted())

    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const sections = ["hero", "philosophy", "projects", "sandbox", "architecture", "timeline", "connect"]

    const observers = sections.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.2 }
      )
      observer.observe(el)
      return observer
    })

    return () => {
      observers.forEach((o) => o?.disconnect())
    }
  }, [])

  const handleMuteToggle = () => {
    const nowMuted = toggleAudioMute()
    setMuted(nowMuted)
    if (!nowMuted) {
      playSound("chord")
    }
  }

  const openTerminal = () => {
    playSound("snap")
    window.dispatchEvent(new CustomEvent("open-cli-drawer"))
  }

  const navLinks = [
    { label: "WORK", href: "#projects", id: "projects" },
    { label: "SANDBOX", href: "#sandbox", id: "sandbox" },
    { label: "ARCHITECTURE", href: "#architecture", id: "architecture" },
    { label: "TIMELINE", href: "#timeline", id: "timeline" },
    { label: "CONNECT", href: "#connect", id: "connect" },
  ]

  return (
    <header className="fixed top-4 left-0 w-full z-50 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand Holographic Capsule */}
        <Link
          href="#hero"
          onClick={() => playSound("tick")}
          className="group flex items-center gap-3 px-3.5 py-2 rounded-full bg-black/60 backdrop-blur-2xl border border-white/10 shadow-2xl hover:border-emerald-500/40 transition-all duration-300"
        >
          {/* Monogram Badge */}
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center font-mono font-bold text-xs text-emerald-400 group-hover:scale-105 transition-transform">
            MA
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-semibold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                Mohammed Masood Azhar
              </span>
              <span className="font-mono text-[9px] px-1 py-0.2 rounded bg-white/10 text-zinc-300 border border-white/10 font-bold">
                V
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Hire</span>
            </div>
          </div>
        </Link>

        {/* Center Floating Nav Links */}
        <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-2xl border border-white/10 shadow-2xl">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id
            return (
              <a
                key={link.id}
                href={link.href}
                onMouseEnter={() => playSound("tick")}
                className={`px-3 py-1.5 rounded-full font-mono text-xs transition-all duration-200 ${
                  isActive
                    ? "bg-white/15 text-white font-semibold shadow-inner"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* Right Controls HUD */}
        <div className="flex items-center gap-2">
          {/* Direct Fiverr "Hire Me" CTA */}
          <a
            href="https://www.fiverr.com/s/8xyp7XZ"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound("chord")}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold transition-all shadow-lg shadow-emerald-500/25 active:scale-95 cursor-pointer group whitespace-nowrap"
            title="Order Bug-Fixing & Engineering on Fiverr"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-black" />
            </span>
            <span>Hire Me</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Audio Visualizer / Mute Toggle */}
          <button
            onClick={handleMuteToggle}
            className={`flex items-center gap-2 px-3 py-2 rounded-full border backdrop-blur-2xl font-mono text-xs transition-all cursor-pointer ${
              muted
                ? "bg-black/60 border-white/10 text-zinc-400 hover:text-white"
                : "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            }`}
            title={muted ? "Enable Audio Micro-Haptics" : "Mute Sound"}
          >
            {muted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <div className="flex items-end gap-[2px] h-3.5">
                <span className="w-[2px] h-2 bg-emerald-400 animate-pulse" />
                <span className="w-[2px] h-3.5 bg-emerald-400 animate-pulse delay-75" />
                <span className="w-[2px] h-2.5 bg-emerald-400 animate-pulse delay-150" />
              </div>
            )}
            <span className="hidden sm:inline text-[11px] font-bold">
              {muted ? "SFX OFF" : "SFX ON"}
            </span>
          </button>

          {/* Interactive Developer CLI Drawer Trigger */}
          <button
            onClick={openTerminal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/60 border border-white/10 hover:border-emerald-500/40 text-white font-mono text-xs backdrop-blur-2xl transition-all cursor-pointer group shadow-xl active:scale-95"
            title="Press ~ key to open interactive CLI drawer"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-12 transition-transform" />
            <span className="font-bold hidden sm:inline">[~] CLI</span>
          </button>
        </div>
      </div>
    </header>
  )
}
