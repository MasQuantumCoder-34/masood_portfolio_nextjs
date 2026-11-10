"use client"

import React, { useRef, useEffect, useState, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"
import { playSound } from "@/components/sound/audio-engine"

// Floating Neon Dust Particles
function ParticleField({ count = 80 }: { count?: number }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10
      p[i * 3 + 1] = (Math.random() - 0.5) * 10
      p[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return p
  }, [count])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05
      pointsRef.current.rotation.x += delta * 0.02
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#34d399"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// 3D Quantum Refractive Crystal Core
function QuantumCrystal({
  isWireframe = false,
  isMobile = false,
  pointerPos,
  isInteracting,
  velocityRef,
}: {
  isWireframe?: boolean
  isMobile?: boolean
  pointerPos: React.MutableRefObject<{ x: number; y: number }>
  isInteracting: React.MutableRefObject<boolean>
  velocityRef: React.MutableRefObject<{ x: number; y: number }>
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const targetRotation = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()

    if (!isInteracting.current) {
      // Continuous organic floating oscillation (Lissajous curves)
      // Guarantees it is NEVER static or frozen on any screen
      const ambientX = Math.sin(time * 0.7) * 0.35
      const ambientY = Math.cos(time * 0.5) * 0.45

      targetRotation.current.x = THREE.MathUtils.lerp(
        targetRotation.current.x,
        ambientX + pointerPos.current.y * 0.6,
        0.05
      )
      targetRotation.current.y = THREE.MathUtils.lerp(
        targetRotation.current.y,
        ambientY + pointerPos.current.x * 0.8,
        0.05
      )

      // Decay touch/drag fling velocity
      velocityRef.current.x *= 0.95
      velocityRef.current.y *= 0.95

      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotation.current.x + velocityRef.current.x,
        0.06
      )
      meshRef.current.rotation.y += delta * 0.55 + velocityRef.current.y
      meshRef.current.rotation.z = Math.sin(time * 0.4) * 0.2
    } else {
      // Direct touch / drag rotation
      meshRef.current.rotation.x += velocityRef.current.x
      meshRef.current.rotation.y += velocityRef.current.y
    }

    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.65
      innerRef.current.rotation.z += delta * 0.55
      const pulse = 0.45 + Math.sin(time * 2) * 0.05
      innerRef.current.scale.set(pulse, pulse, pulse)
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.35
      ringRef.current.rotation.x = Math.PI / 3 + Math.sin(time * 1.2) * 0.2
    }
  })

  // Adaptive scale: slightly more compact on mobile to guarantee zero clipping
  const scale = isMobile ? 1.45 : 1.85

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <group scale={scale}>
        {/* Outer Faceted Geometric Octahedron */}
        <mesh ref={meshRef}>
          <octahedronGeometry args={[1.1, 0]} />
          {isWireframe ? (
            <meshBasicMaterial color="#34d399" wireframe />
          ) : isMobile ? (
            // Mobile-optimized high-performance physical shader
            // Zero GPU lockup or black screen risk on iOS/Android
            <meshStandardMaterial
              color="#10b981"
              roughness={0.15}
              metalness={0.85}
              emissive="#064e3b"
              emissiveIntensity={0.4}
              wireframe={false}
            />
          ) : (
            // Desktop high-spec physical glass shader
            <meshPhysicalMaterial
              roughness={0.08}
              transmission={0.92}
              thickness={1.5}
              ior={1.65}
              reflectivity={0.9}
              color="#ffffff"
              emissive="#10b981"
              emissiveIntensity={0.18}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          )}
        </mesh>

        {/* Inner Glowing Holographic Wireframe Core */}
        <mesh ref={innerRef} scale={0.45}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#06b6d4" wireframe />
        </mesh>

        {/* Orbiting Quantum Data Ring */}
        <mesh ref={ringRef} scale={1.75}>
          <torusGeometry args={[1.2, 0.015, 16, 64]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.75} />
        </mesh>
      </group>
    </Float>
  )
}

export default function HeroCanvas() {
  const [wireframe, setWireframe] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Interaction refs shared with Three.js canvas
  const pointerPos = useRef({ x: 0, y: 0 })
  const isInteracting = useRef(false)
  const lastCoord = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Universal Pointer Event Handlers (Works on Mouse, Touch, Stylus)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isInteracting.current = true
    lastCoord.current = { x: e.clientX, y: e.clientY }
    velocityRef.current = { x: 0, y: 0 }
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId)
    }
    playSound("tick")
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const width = window.innerWidth
    const height = window.innerHeight
    pointerPos.current = {
      x: (e.clientX / width) * 2 - 1,
      y: -(e.clientY / height) * 2 + 1,
    }

    if (isInteracting.current) {
      const deltaX = e.clientX - lastCoord.current.x
      const deltaY = e.clientY - lastCoord.current.y
      velocityRef.current = {
        x: deltaY * 0.009,
        y: deltaX * 0.009,
      }
      lastCoord.current = { x: e.clientX, y: e.clientY }
    }
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isInteracting.current && containerRef.current) {
      try {
        containerRef.current.releasePointerCapture(e.pointerId)
      } catch {
        // Safe fallback
      }
    }
    isInteracting.current = false
  }

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative w-full h-[260px] sm:h-[360px] lg:h-[480px] rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-2xl shadow-2xl overflow-hidden group cursor-grab active:cursor-grabbing select-none touch-none"
    >
      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, isMobile ? 5.8 : 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[10, 10, 8]} intensity={2} color="#34d399" />
        <directionalLight position={[-10, -10, -8]} intensity={1.8} color="#06b6d4" />
        <pointLight position={[0, 0, 0]} intensity={3.5} color="#10b981" distance={5} />

        <QuantumCrystal
          isWireframe={wireframe}
          isMobile={isMobile}
          pointerPos={pointerPos}
          isInteracting={isInteracting}
          velocityRef={velocityRef}
        />
        <ParticleField count={isMobile ? 50 : 90} />
      </Canvas>

      {/* Floating HUD Micro-Controls */}
      <div className="absolute top-4 left-5 pointer-events-none flex items-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="font-mono text-[11px] text-zinc-400 tracking-wider uppercase">
          Three.js // Quantum Core
        </span>
      </div>

      <div className="absolute top-4 right-5 flex items-center gap-2 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation()
            setWireframe(!wireframe)
            playSound("snap")
          }}
          className="px-2.5 py-1 rounded-full bg-black/70 hover:bg-black/90 border border-white/15 text-white font-mono text-[10px] uppercase transition-all backdrop-blur-md cursor-pointer active:scale-95"
        >
          {wireframe ? "Solid Core" : "Wireframe"}
        </button>
      </div>

      <div className="absolute bottom-4 left-5 pointer-events-none flex items-center gap-2">
        <span className="font-mono text-[11px] text-zinc-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {isMobile ? "TOUCH & DRAG TO SPIN 360°" : "DRAG TO SPIN 360° // AUTO-ORBITING"}
        </span>
      </div>
    </div>
  )
}
