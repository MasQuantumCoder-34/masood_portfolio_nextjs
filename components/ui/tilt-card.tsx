"use client"

import React, { useRef, useState } from "react"
import { soundFx } from "@/components/sound/audio-engine"
import { ExternalLink, ArrowUpRight, Lock } from "lucide-react"

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
    soundFx.playHoverTick()
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
      onClick={() => soundFx.playClickSnap()}
      style={{
        transform,
        transition: "transform 0.15s ease-out",
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-2xl border border-border bg-card/70 backdrop-blur-xl p-6 sm:p-8 overflow-hidden shadow-xl hover:border-border-strong transition-colors"
    >
      {/* Cursor-Aware Specular Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(52, 211, 153, 0.12), transparent 70%)`,
        }}
      />

      <div className="relative z-20 flex flex-col justify-between h-full space-y-6">
        {/* Top Header: ID & Live Metric Badge */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">{id}</span>
          {confidential ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-secondary text-muted-foreground border border-border">
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
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-border bg-background/50 flex items-center justify-center">
            <img src={image} alt={title} className="w-full h-full object-cover grayscale opacity-40" />
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <Lock className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
        ) : (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-[16/9] rounded-xl overflow-hidden border border-border block group/img cursor-pointer"
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-mono text-white backdrop-blur-[2px]">
              <span>Launch Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>
        )}

        {/* Narrative & Engineering Impact */}
        <div className="space-y-3">
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{category}</p>
          <h3 className="text-2xl font-bold text-foreground tracking-tight group-hover:text-emerald-400 transition-colors">
            {title}
          </h3>
          <div className="space-y-1.5 text-sm text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground font-medium">Problem:</strong> {problem}
            </p>
            <p>
              <strong className="text-foreground font-medium">Outcome:</strong> {outcome}
            </p>
          </div>
        </div>

        {/* Tech Stack Chips & Action Link */}
        <div className="pt-4 border-t border-border flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded bg-secondary/80 border border-border text-[11px] font-mono text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {confidential ? (
            <a
              href="#contact"
              className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors ml-4 whitespace-nowrap"
            >
              <span>Details ↗</span>
            </a>
          ) : (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-mono text-foreground hover:text-emerald-400 transition-colors ml-4 whitespace-nowrap group/link"
            >
              <span>Visit</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
