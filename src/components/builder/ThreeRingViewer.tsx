'use client'

/**
 * ThreeRingViewer — dynamically imported 3D ring viewer
 * Uses @react-three/fiber + @react-three/drei
 * Heavy bundle — always dynamic import this component
 */

import React, { useRef, Suspense, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

interface RingModelProps {
  url: string
  metalColor: string
}

function RingModel({ url, metalColor }: RingModelProps) {
  const { scene } = useGLTF(url)
  const ref = useRef<THREE.Group>(null)

  // Slow rotation for display
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.4
    }
  })

  // Clone and apply metal color to all meshes
  const clonedScene = useMemo(() => {
    const cloned = scene.clone(true)
    cloned.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        const mesh = node as THREE.Mesh
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(metalColor),
          metalness: 0.95,
          roughness: 0.05,
          envMapIntensity: 2,
        })
      }
    })
    return cloned
  }, [scene, metalColor])

  return <primitive ref={ref} object={clonedScene} scale={2} position={[0, -0.3, 0]} />
}

// Fallback ring using torus geometry when model fails to load
function FallbackRing({ metalColor }: { metalColor: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4
    }
  })

  return (
    <mesh ref={meshRef} position={[0, -0.2, 0]}>
      <torusGeometry args={[0.6, 0.12, 32, 64]} />
      <meshStandardMaterial
        color={metalColor}
        metalness={0.95}
        roughness={0.05}
        envMapIntensity={2}
      />
    </mesh>
  )
}

// Diamond accent on top of ring
function DiamondAccent() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0.35, 0]}>
      <octahedronGeometry args={[0.18, 0]} />
      <meshStandardMaterial
        color="#ffffff"
        metalness={0.1}
        roughness={0}
        transparent
        opacity={0.92}
        envMapIntensity={3}
      />
    </mesh>
  )
}

// Error boundary for model loading
function ModelWithFallback({ url, metalColor }: RingModelProps) {
  try {
    return <RingModel url={url} metalColor={metalColor} />
  } catch {
    return <FallbackRing metalColor={metalColor} />
  }
}

interface ThreeRingViewerProps {
  modelUrl?: string
  metalColor?: string
  className?: string
}

export default function ThreeRingViewer({
  modelUrl = '/models/ring-placeholder.glb',
  metalColor = '#D4AF37',
  className = '',
}: ThreeRingViewerProps) {
  return (
    <div className={`w-full h-full min-h-[300px] ${className}`}>
      <Canvas
        camera={{ position: [0, 0.5, 2.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#D4AF37" />

        <Suspense fallback={<FallbackRing metalColor={metalColor} />}>
          {modelUrl ? (
            <ModelWithFallback url={modelUrl} metalColor={metalColor} />
          ) : (
            <FallbackRing metalColor={metalColor} />
          )}
          <DiamondAccent />
          <Environment preset="studio" />
          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={0.4}
            scale={3}
            blur={2}
            far={1}
            color="#000"
          />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={1.5}
          maxDistance={5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate={false}
        />
      </Canvas>
    </div>
  )
}
