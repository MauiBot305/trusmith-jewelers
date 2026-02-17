'use client'

import { useRef, Suspense, Component, type ErrorInfo, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei'
import type { Mesh, Group } from 'three'
import { Vector3, Euler } from 'three'

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
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  autoRotate?: boolean
}

function RingModel({ url, position = [0, -0.5, 0], rotation = [0, 0, 0], scale = 15, autoRotate = true }: RingModelProps) {
  const meshRef = useRef<Mesh>(null)
  const groupRef = useRef<Group>(null)
  
  // Load the GLTF model
  const { scene } = useGLTF(url)

  // Auto-rotation logic (only if autoRotate is true)
  useFrame((_, delta) => {
    if (autoRotate) {
      if (meshRef.current) meshRef.current.rotation.y += delta * 0.4
      if (groupRef.current) groupRef.current.rotation.y += delta * 0.4
    }
  })

  if (scene) {
    return (
      <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
        <primitive object={scene.clone()} />
      </group>
    )
  }

  // Placeholder ring using torus geometry
  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale ? scale / 15 : 1}>
      <torusGeometry args={[0.6, 0.12, 32, 64]} />
      <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.05} envMapIntensity={2} />
    </mesh>
  )
}

// Preload the default ring model
useGLTF.preload('/models/rings/SM_Solitaire.glb')

interface ThreeRingViewerProps {
  modelUrl: string
  arMode?: boolean
  ringPosition?: [number, number, number]
  ringRotation?: [number, number, number]
  ringScale?: number
}

export default function ThreeRingViewer({ 
  modelUrl, 
  arMode = false, 
  ringPosition = [0, -0.5, 0],
  ringRotation = [0, 0, 0],
  ringScale = 15
}: ThreeRingViewerProps) {
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
          <RingModel 
            url={modelUrl} 
            position={ringPosition}
            rotation={ringRotation}
            scale={ringScale}
            autoRotate={!arMode}
          />
          <Environment preset="studio" />
          {!arMode && (
            <ContactShadows
              position={[0, -0.8, 0]}
              opacity={0.4}
              scale={3}
              blur={2}
              far={1}
              color="#000"
            />
          )}
        </Suspense>

        {!arMode && (
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
            autoRotate={false}
          />
        )}
      </Canvas>
    </ThreeErrorBoundary>
  )
}
