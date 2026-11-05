"use client"

import React, { useRef, useState } from "react"
import { playSound } from "@/components/sound/audio-engine"
import { ExternalLink, ArrowUpRight, Lock, CheckCircle2 } from "lucide-react"

interface TiltCardProps {
  id: string
  title: string
  category: string
  metric: string
  problem: string
  outcome: string
  tags: string[]
  link?: string
  image: string
  confidential?: boolean
}

export default function TiltCard({
  id,
  title,
  category,
  metric,
  problem,
  outcome,
  tags,
  link,
  image,
  confidential,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)")
  const [spotlightPos, setSpotlightPos] = useState({ x: -100, y: -100 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Smooth tilt angles (-10deg to +10deg)
    const rotateX = ((y / rect.height) - 0.5) * -12
    const rotateY = ((x / rect.width) - 0.5) * 12

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
    )
    setSpotlightPos({ x, y })
  }

  const handleMouseEnter = () => {
    playSound("tick")
  }

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)")
    setSpotlightPos({ x: -100, y: -100 })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => playSound("snap")}
      style={{
        transform,
        transition: "transform 0.15s ease-out",
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-3xl border border-white/10 bg-zinc-950/70 backdrop-blur-2xl p-6 sm:p-8 overflow-hidden shadow-2xl hover:border-emerald-500/40 transition-all duration-300"
    >
      {/* Cursor-Aware Specular Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(52, 211, 153, 0.15), transparent 70%)`,
        }}
      />

      <div className="relative z-20 flex flex-col justify-between h-full space-y-6">
        {/* Top Header: ID & Live Metric Badge */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">{id} // SPEC</span>
          {confidential ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-zinc-900 text-zinc-400 border border-white/10">
              <Lock className="w-3 h-3" />
              Confidential
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {metric}
            </span>
          )}
        </div>

        {/* Image Preview with Parallax Tilt */}
        {confidential ? (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-black/50 flex items-center justify-center">
            <img src={image} alt={title} className="w-full h-full object-cover grayscale opacity-30" />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Lock className="w-6 h-6 text-zinc-400" />
            </div>
          </div>
        ) : (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 block group/img cursor-pointer"
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-mono text-white backdrop-blur-[2px]">
              <span className="font-bold">Launch Live System</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </a>
        )}

        {/* Narrative & Engineering Impact */}
        <div className="space-y-3">
          <p className="text-xs font-mono uppercase tracking-wider text-emerald-400/90">{category}</p>
          <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
            {title}
          </h3>
          <div className="space-y-2 text-sm text-zinc-300 leading-relaxed">
            <p>
              <strong className="text-zinc-100 font-medium">Problem:</strong> {problem}
            </p>
            <p>
              <strong className="text-zinc-100 font-medium">Outcome:</strong> {outcome}
            </p>
          </div>
        </div>

        {/* Tech Stack Chips & Action Link */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/10 text-[11px] font-mono text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {confidential ? (
            <span className="inline-flex items-center gap-1 text-xs font-mono text-zinc-500 ml-4 whitespace-nowrap">
              <span>NDA Protected</span>
            </span>
          ) : (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-emerald-500 hover:text-black border border-white/10 text-xs font-mono font-semibold text-white transition-all ml-4 whitespace-nowrap group/link active:scale-95"
            >
              <span>Visit</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
