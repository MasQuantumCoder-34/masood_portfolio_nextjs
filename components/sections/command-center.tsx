"use client"

import { useState, useEffect } from "react"
import { soundFx } from "@/components/sound/audio-engine"
import MagneticButton from "@/components/ui/magnetic-button"
import { Check, Copy, Globe, Terminal } from "lucide-react"

export default function CommandCenter() {
  const [copied, setCopied] = useState(false)
  const [time, setTime] = useState("")
  const email = "masazhar321@gmail.com"

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    soundFx.playSuccessTone()
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const openTerminal = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "~" }))
  }

  return (
    <footer className="relative py-24 px-6 border-t border-border overflow-hidden bg-background">
      <div className="max-w-4xl mx-auto w-full text-center space-y-12">
        {/* Availability & Timezone Telemetry */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-full bg-card border border-border text-xs font-mono text-muted-foreground shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-foreground font-medium">Available for Front-End Roles</span>
          <span className="text-border-strong">•</span>
          <span className="inline-flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Chennai, IN (UTC+5:30)</span>
            <span className="text-foreground font-semibold ml-1">{time || "12:00:00 PM"}</span>
          </span>
        </div>

        {/* Global Connection Callout */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-foreground">
            Let's build something exceptional.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Open to full-time front-end opportunities, contract architectures, and high-impact design systems.
          </p>
        </div>

        {/* Magnetic Copy Email CTA */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            onClick={copyEmail}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-foreground text-background font-mono text-sm font-semibold shadow-lg hover:bg-foreground/90 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Email Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy {email}</span>
              </>
            )}
          </MagneticButton>

          <MagneticButton
            onClick={openTerminal}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-secondary/80 hover:bg-secondary text-foreground border border-border font-mono text-xs transition-colors cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Launch Shell (~)</span>
          </MagneticButton>
        </div>

        {/* Sub-footer Brand Note */}
        <div className="pt-12 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-muted-foreground gap-4">
          <div>© {new Date().getFullYear()} Mohammed Masood Azhar V. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/MasQuantumCoder-34"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com/in/mohammedmasoodazhar-v"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://vnbdiaper.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              VNB Diapers ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
