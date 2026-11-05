"use client"

import { useState, useEffect, useRef } from "react"
import { soundFx } from "@/components/sound/audio-engine"
import { Terminal, X, CornerDownLeft } from "lucide-react"

interface HistoryEntry {
  command: string
  output: string | React.ReactNode
}

export default function TerminalDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: "welcome",
      output:
        "Welcome to Masood's Developer Shell. Type 'help' for available commands or 'skills' to view architecture stack.",
    },
  ])
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Listen for `~` or Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "~" || e.key === "`") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
        soundFx.playClickSnap()
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [history])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = input.trim().toLowerCase()
    if (!cmd) return

    soundFx.playClickSnap()
    let output: string | React.ReactNode = ""

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1 text-xs font-mono text-muted-foreground">
            <p><span className="text-emerald-400">help</span> - List available commands</p>
            <p><span className="text-emerald-400">skills</span> - Display categorized engineering stack</p>
            <p><span className="text-emerald-400">projects</span> - View production web platforms</p>
            <p><span className="text-emerald-400">contact</span> - Show direct contact information</p>
            <p><span className="text-emerald-400">resume</span> - Download official curriculum vitae</p>
            <p><span className="text-emerald-400">clear</span> - Clear terminal output</p>
            <p><span className="text-emerald-400">exit</span> - Close terminal drawer</p>
          </div>
        )
        break

      case "skills":
        output = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-foreground font-semibold">Core UI & Architecture:</p>
            <p className="text-muted-foreground">React 19, Next.js 16 (App Router), TypeScript, Tailwind CSS v4</p>
            <p className="text-foreground font-semibold pt-1">State & Systems:</p>
            <p className="text-muted-foreground">Redux Toolkit, RTK Query, TanStack Query, Firebase RTDB, MongoDB</p>
          </div>
        )
        break

      case "projects":
        output = (
          <div className="space-y-1 text-xs font-mono">
            <p><span className="text-emerald-400">1. VNB Diaper Storefront:</span> https://vnbdiaper.vercel.app</p>
            <p><span className="text-emerald-400">2. MufarTech Website:</span> https://mufartech-website.vercel.app</p>
            <p><span className="text-emerald-400">3. Mufar Tech Tasks:</span> https://mufar-tech-tasks.vercel.app</p>
            <p><span className="text-emerald-400">4. Mufar Tech Forms:</span> https://mufar-tech-forms.vercel.app</p>
          </div>
        )
        break

      case "contact":
        output = (
          <div className="space-y-1 text-xs font-mono text-zinc-300">
            <p>Email: masazhar321@gmail.com</p>
            <p>Phone: +91 6381653050</p>
            <p>LinkedIn: linkedin.com/in/mohammedmasoodazhar-v</p>
            <p>GitHub: github.com/MasQuantumCoder-34</p>
          </div>
        )
        break

      case "resume":
        soundFx.playSuccessTone()
        window.open("/resume.pdf", "_blank")
        output = "Opening resume download..."
        break

      case "clear":
        setHistory([])
        setInput("")
        return

      case "exit":
        setIsOpen(false)
        setInput("")
        return

      default:
        output = `Command not recognized: "${cmd}". Type 'help' for available commands.`
    }

    setHistory((prev) => [...prev, { command: cmd, output }])
    setInput("")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 max-w-4xl mx-auto animate-in slide-in-from-bottom duration-300">
      <div className="rounded-xl border border-border bg-card/95 backdrop-blur-2xl shadow-2xl overflow-hidden font-mono text-xs">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-secondary/40 border-b border-border">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-foreground">masood@developer-shell:~</span>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label="Close terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Console Body */}
        <div className="p-4 max-h-72 overflow-y-auto space-y-3">
          {history.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-400">
                <span>➜</span>
                <span className="text-foreground font-medium">{item.command}</span>
              </div>
              <div className="pl-4 text-muted-foreground leading-relaxed">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 px-4 py-2.5 border-t border-border bg-background/50">
          <span className="text-emerald-400 font-bold">➜</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help'..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/40 focus:outline-none text-xs font-mono"
          />
          <button type="submit" className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  )
}
