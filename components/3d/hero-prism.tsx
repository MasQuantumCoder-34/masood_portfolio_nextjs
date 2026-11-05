"use client"

import React, { useRef, useEffect, useState, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

// Floating Neon Dust Particles
function ParticleField({ count = 120 }: { count?: number }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 12
      p[i * 3 + 1] = (Math.random() - 0.5) * 12
      p[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return p
  }, [count])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04
      pointsRef.current.rotation.x += delta * 0.02
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#34d399"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// 3D Quantum Refractive Crystal Core
function QuantumCrystal({ isWireframe = false }: { isWireframe?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const targetRotation = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      }

      if (isDragging.current) {
        const deltaX = e.clientX - lastMousePos.current.x
        const deltaY = e.clientY - lastMousePos.current.y
        velocity.current = { x: deltaY * 0.008, y: deltaX * 0.008 }
        lastMousePos.current = { x: e.clientX, y: e.clientY }
      }
    }

    const handleDown = (e: MouseEvent) => {
      isDragging.current = true
      lastMousePos.current = { x: e.clientX, y: e.clientY }
    }

    const handleUp = () => {
      isDragging.current = false
    }

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mousedown", handleDown)
    window.addEventListener("mouseup", handleUp)

    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mousedown", handleDown)
      window.removeEventListener("mouseup", handleUp)
    }
  }, [])

  useFrame((_, delta) => {
    if (!meshRef.current) return

    if (!isDragging.current) {
      targetRotation.current.x = THREE.MathUtils.lerp(
        targetRotation.current.x,
        mousePos.current.y * 0.6,
        0.05
      )
      targetRotation.current.y = THREE.MathUtils.lerp(
        targetRotation.current.y,
        mousePos.current.x * 0.8,
        0.05
      )

      velocity.current.x *= 0.95
      velocity.current.y *= 0.95

      meshRef.current.rotation.x += velocity.current.x
      meshRef.current.rotation.y += delta * 0.35 + velocity.current.y
    } else {
      meshRef.current.rotation.x += velocity.current.x
      meshRef.current.rotation.y += velocity.current.y
    }

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotation.current.x,
      0.04
    )

    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.5
      innerRef.current.rotation.z += delta * 0.4
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.25
      ringRef.current.rotation.x = Math.PI / 3 + Math.sin(Date.now() * 0.001) * 0.15
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group scale={1.8}>
        {/* Outer Faceted Geometric Octahedron */}
        <mesh ref={meshRef}>
          <octahedronGeometry args={[1.1, 0]} />
          {isWireframe ? (
            <meshBasicMaterial color="#34d399" wireframe />
          ) : (
            <meshPhysicalMaterial
              roughness={0.08}
              transmission={0.92}
              thickness={1.5}
              ior={1.65}
              reflectivity={0.9}
              color="#ffffff"
              emissive="#10b981"
              emissiveIntensity={0.16}
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
          <meshBasicMaterial color="#10b981" transparent opacity={0.7} />
        </mesh>
      </group>
    </Float>
  )
}

export default function HeroCanvas() {
  const [wireframe, setWireframe] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-56 h-56 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
      </div>
    )
  }

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[540px] rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-2xl shadow-2xl overflow-hidden group cursor-grab active:cursor-grabbing">
      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 10, 8]} intensity={1.8} color="#34d399" />
        <directionalLight position={[-10, -10, -8]} intensity={1.5} color="#06b6d4" />
        <pointLight position={[0, 0, 0]} intensity={3} color="#10b981" distance={4} />

        <QuantumCrystal isWireframe={wireframe} />
        <ParticleField count={90} />
      </Canvas>

      {/* Floating HUD Micro-Controls */}
      <div className="absolute top-4 left-5 pointer-events-none flex items-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="font-mono text-[11px] text-zinc-400 tracking-wider uppercase">
          Three.js WebGL // Quantum Core
        </span>
      </div>

      <div className="absolute top-4 right-5 flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation()
            setWireframe(!wireframe)
          }}
          className="px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white font-mono text-[10px] uppercase transition-all backdrop-blur-md cursor-pointer active:scale-95"
        >
          {wireframe ? "Solid Glass" : "Wireframe Mode"}
        </button>
      </div>

      <div className="absolute bottom-4 left-5 pointer-events-none">
        <span className="font-mono text-[11px] text-zinc-500">
          DRAG TO SPIN 360° // TRACKS CURSOR
        </span>
      </div>
    </div>
  )
}
