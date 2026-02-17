'use client'

/**
 * ThreeRingViewer — dynamically imported 3D ring viewer
 * Uses @react-three/fiber + @react-three/drei
 * Heavy bundle — always dynamic import this component
 *
 * TODO Phase 2 (WebAR):
 * - Replace static hand SVG with MediaPipe hand tracking
 * - Align ring mesh to detected ring finger position
 * - Add depth buffer for hand occlusion effect
 */

import { useRef, Suspense, Component, type ErrorInfo, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei'
import type { Mesh } from 'three'

// Error boundary for 3D rendering errors
interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ThreeErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('3D Viewer Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full h-full flex items-center justify-center bg-black/20 rounded-lg">
          <div className="text-center text-white-off/60">
            <p className="text-sm">3D Preview unavailable</p>
            <p className="text-xs opacity-60">Please try refreshing the page</p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

interface RingModelProps {
  url: string
}

function RingModel({ url }: RingModelProps) {
  const meshRef = useRef<Mesh>(null)
  const groupRef = useRef<import('three').Group>(null)
  
  // Load the GLTF model
  const { scene } = useGLTF(url)

  // Slow rotation for display
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4
    }
  })

  if (scene) {
    return (
      <group ref={groupRef}>
        <primitive object={scene.clone()} scale={15} position={[0, -0.5, 0]} />
      </group>
    )
  }

  // Placeholder ring using torus geometry
  return (
    <mesh ref={meshRef} position={[0, -0.2, 0]}>
      <torusGeometry args={[0.6, 0.12, 32, 64]} />
      <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.05} envMapIntensity={2} />
    </mesh>
  )
}

// Preload the default ring model
useGLTF.preload('/models/rings/SM_Solitaire.glb')

// Diamond accent on top of ring
function DiamondAccent() {
  const meshRef = useRef<Mesh>(null)

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

interface ThreeRingViewerProps {
  modelUrl: string
}

export default function ThreeRingViewer({ modelUrl }: ThreeRingViewerProps) {
  return (
    <ThreeErrorBoundary>
      <Canvas
        camera={{ position: [0, 0.5, 2.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#D4AF37" />

        <Suspense fallback={null}>
          <RingModel url={modelUrl} />
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
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate={false}
        />
      </Canvas>
    </ThreeErrorBoundary>
  )
}
