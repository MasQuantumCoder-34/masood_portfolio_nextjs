"use client"

import React, { useRef, useState } from "react"
import { soundFx } from "@/components/sound/audio-engine"

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  strength?: number
}

export default function MagneticButton({
  children,
  strength = 0.3,
  className = "",
  onClick,
  ...props
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength

    setPosition({ x: deltaX, y: deltaY })
  }

  const handleMouseEnter = () => {
    soundFx.playHoverTick()
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundFx.playClickSnap()
    onClick?.(e)
  }

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: "transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
      className={`relative inline-flex items-center justify-center transition-colors cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
