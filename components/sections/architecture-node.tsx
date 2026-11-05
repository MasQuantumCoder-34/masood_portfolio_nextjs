"use client"

import React, { useState, useEffect, useRef } from "react"
import { Play, Activity, Cpu, Server, Database, Send, CheckCircle2, RefreshCw, Terminal } from "lucide-react"
import { playSound } from "@/components/sound/audio-engine"

interface NodeStep {
  id: string
  title: string
  subhead: string
  tech: string
  icon: any
  latency: string
  status: "idle" | "active" | "completed"
  details: string
}

export default function ArchitectureNode() {
  const [activeStep, setActiveStep] = useState<number>(-1)
  const [isSimulating, setIsSimulating] = useState(false)
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM_INIT] Topology Ready. Standby for packet simulation.",
    "[CACHE_STATUS] RTK Query normalized store warm. 0 latency pending.",
  ])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const steps: NodeStep[] = [
    {
      id: "client",
      title: "Storefront UI Layer",
      subhead: "Next.js 16 + React 19 Client",
      tech: "VNB Diaper Storefront / 38+ SKUs",
      icon: Cpu,
      latency: "1.2s LCP",
      status: activeStep === 0 ? "active" : activeStep > 0 ? "completed" : "idle",
      details: "Client captures instantaneous size selection (NB to XXL) with optimistic zero-lag UI updates.",
    },
    {
      id: "edge",
      title: "Edge Gateway & Cache",
      subhead: "Edge Network + Invalidation",
      tech: "Vercel Edge / TLS 1.3",
      icon: Server,
      latency: "14ms",
      status: activeStep === 1 ? "active" : activeStep > 1 ? "completed" : "idle",
      details: "Geo-distributed route handler terminates TLS, validates JWT tokens, and checks edge memory cache.",
    },
    {
      id: "rtk",
      title: "RTK Query State Engine",
      subhead: "API Redundancy Eliminator",
      tech: "DataTerrain Architecture Pattern",
      icon: Activity,
      latency: "0ms (HIT)",
      status: activeStep === 2 ? "active" : activeStep > 2 ? "completed" : "idle",
      details: "Deduplicates concurrent queries and auto-invalidates tag cache, cutting client network redundancy by 30%.",
    },
    {
      id: "data",
      title: "Database Persistence",
      subhead: "MongoDB Atlas & Firebase RTDB",
      tech: "Multi-Region Replica Cluster",
      icon: Database,
      latency: "18ms",
      status: activeStep === 3 ? "active" : activeStep > 3 ? "completed" : "idle",
      details: "Atomic write operation with strict schema validation; updates real-time inventory count across sessions.",
    },
    {
      id: "dispatch",
      title: "WhatsApp Dispatch Webhook",
      subhead: "Automated Logistics Routing",
      tech: "WhatsApp Business Cloud API",
      icon: Send,
      latency: "32ms",
      status: activeStep === 4 ? "active" : activeStep > 4 ? "completed" : "idle",
      details: "Dispatches pre-formatted structured customer bill & delivery coordinates directly to warehouse staff.",
    },
  ]

  const triggerSimulation = () => {
    if (isSimulating) return
    setIsSimulating(true)
    setActiveStep(0)
    playSound("snap")

    setLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] 🚀 DISPATCH: New checkout payload initiated from Client Storefront.`,
      ...prev.slice(0, 8),
    ])

    let current = 0
    const runNext = () => {
      timerRef.current = setTimeout(() => {
        current += 1
        if (current < steps.length) {
          setActiveStep(current)
          playSound("tick")
          const stepObj = steps[current]
          setLogs((prev) => [
            `[${new Date().toLocaleTimeString()}] ✅ ${stepObj.title}: Packet arrived [${stepObj.latency}] -> ${stepObj.details.slice(0, 48)}...`,
            ...prev.slice(0, 8),
          ])
          runNext()
        } else {
          setActiveStep(steps.length)
          setIsSimulating(false)
          playSound("chord")
          setLogs((prev) => [
            `[${new Date().toLocaleTimeString()}] 🏁 TRANSACTION_COMPLETE: End-to-end data packet resolved in ~64ms total overhead.`,
            ...prev.slice(0, 8),
          ])
        }
      }, 750)
    }

    runNext()
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <section id="architecture" className="relative py-24 px-6 border-b border-white/10 bg-black/60 overflow-hidden">
      {/* Ambient background volumetric glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>Section 05 // Interactive Topology</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-foreground">
              Full-Stack Architecture Simulator
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-xl">
              Click below to fire a live data transaction packet across the real-time client-to-cloud pipeline. Watch state normalization, cache deduplication, and automated dispatch in action.
            </p>
          </div>

          <button
            onClick={triggerSimulation}
            disabled={isSimulating}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer shadow-xl ${
              isSimulating
                ? "bg-zinc-800 text-zinc-400 cursor-not-allowed border border-white/5"
                : "bg-cyan-500 hover:bg-cyan-400 text-black shadow-cyan-500/20 active:scale-95"
            }`}
          >
            {isSimulating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Simulating Packet Flow...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Simulate Order Flow ⚡</span>
              </>
            )}
          </button>
        </div>

        {/* Node Pipeline Visualizer */}
        <div className="relative p-6 sm:p-10 rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-2xl shadow-2xl mb-8 overflow-hidden">
          {/* Neon energy beam connecting nodes in desktop */}
          <div className="hidden lg:block absolute top-[86px] left-[10%] right-[10%] h-[2px] bg-white/10 z-0">
            {/* Animated Packet */}
            {isSimulating && (
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee] transition-all duration-700 ease-in-out -translate-x-1/2"
                style={{
                  left: `${(Math.min(activeStep, 4) / 4) * 100}%`,
                }}
              />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon
              const isCurrent = activeStep === idx
              const isDone = activeStep > idx

              return (
                <div
                  key={step.id}
                  onClick={() => {
                    setActiveStep(idx)
                    playSound("tick")
                  }}
                  className={`relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left ${
                    isCurrent
                      ? "bg-cyan-500/15 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.25)] scale-[1.03]"
                      : isDone
                      ? "bg-emerald-500/10 border-emerald-500/30"
                      : "bg-zinc-900/50 border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Step status icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                        isCurrent
                          ? "bg-cyan-400 text-black border-cyan-300 shadow-md shadow-cyan-400/30"
                          : isDone
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                          : "bg-white/5 text-zinc-400 border-white/10"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${
                        isCurrent
                          ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/30 animate-pulse"
                          : isDone
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                          : "bg-white/5 text-zinc-500 border-white/5"
                      }`}
                    >
                      {step.latency}
                    </span>
                  </div>

                  <div className="font-mono text-[10px] text-zinc-500 mb-1">
                    0{idx + 1} // LAYER
                  </div>
                  <h3 className="font-medium text-sm text-foreground mb-1 leading-snug">
                    {step.title}
                  </h3>
                  <div className="text-[11px] font-mono text-muted-foreground mb-3">
                    {step.tech}
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {step.details}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Telemetry Console Output */}
        <div className="rounded-2xl border border-white/10 bg-black/90 p-5 font-mono text-xs shadow-xl">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-zinc-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-semibold tracking-wider uppercase text-[11px]">
                Live Telemetry Feed
              </span>
            </div>
            <span className="text-[10px] text-zinc-500">REALTIME LOG STREAM</span>
          </div>

          <div className="space-y-1.5 max-h-36 overflow-y-auto font-mono">
            {logs.map((log, i) => (
              <div
                key={i}
                className={`transition-opacity duration-300 ${
                  i === 0 ? "text-cyan-300 font-medium" : "text-zinc-500"
                }`}
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
