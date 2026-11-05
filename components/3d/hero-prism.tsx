"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"

function RefractivePrism() {
  const meshRef = useRef<THREE.Mesh>(null)
  const targetRotation = useRef({ x: 0, y: 0 })
  const pointerPos = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      pointerPos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      }

      if (isDragging.current) {
        const deltaX = e.clientX - lastMousePos.current.x
        const deltaY = e.clientY - lastMousePos.current.y
        velocity.current = { x: deltaY * 0.01, y: deltaX * 0.01 }
        lastMousePos.current = { x: e.clientX, y: e.clientY }
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true
      lastMousePos.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseUp = () => {
      isDragging.current = false
    }

    window.addEventListener("mousemove", handlePointerMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handlePointerMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  useFrame((_, delta) => {
    if (!meshRef.current) return

    if (!isDragging.current) {
      // Damped spring track toward mouse coordinates
      targetRotation.current.x = THREE.MathUtils.lerp(
        targetRotation.current.x,
        pointerPos.current.y * 0.8,
        0.05
      )
      targetRotation.current.y = THREE.MathUtils.lerp(
        targetRotation.current.y,
        pointerPos.current.x * 1.2,
        0.05
      )

      // Apply residual velocity decay
      velocity.current.x *= 0.95
      velocity.current.y *= 0.95

      meshRef.current.rotation.x += velocity.current.x
      meshRef.current.rotation.y += delta * 0.4 + velocity.current.y
    } else {
      meshRef.current.rotation.x += velocity.current.x
      meshRef.current.rotation.y += velocity.current.y
    }

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotation.current.x,
      0.04
    )
  })

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <group scale={2.2}>
        {/* Core Geometric Octahedron */}
        <mesh ref={meshRef}>
          <octahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            roughness={0.06}
            transmission={0.94}
            thickness={1.6}
            ior={1.5}
            reflectivity={0.9}
            color="#ffffff"
            emissive="#10b981"
            emissiveIntensity={0.12}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Inner Glowing Holographic Core */}
        <mesh scale={0.4}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#34d399" wireframe />
        </mesh>
      </group>
    </Float>
  )
}

export default function HeroCanvas() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
        <div className="w-48 h-48 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 pointer-events-auto z-0 overflow-hidden cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#34d399" />
        <directionalLight position={[-10, -10, -5]} intensity={1.2} color="#06b6d4" />
        <pointLight position={[0, 0, 0]} intensity={2.5} color="#10b981" distance={3.5} />
        
        <RefractivePrism />
      </Canvas>
    </div>
  )
}
