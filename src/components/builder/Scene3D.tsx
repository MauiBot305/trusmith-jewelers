'use client'

import { Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import {
  Preload,
  AdaptiveDpr,
  AdaptiveEvents,
  Environment,
  ContactShadows,
  OrbitControls,
  Lightformer,
} from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { ProceduralRing, RingPlaceholder, type RingConfig } from './ProceduralRing'

function RendererConfig() {
  const { gl } = useThree()
  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 1.2
    gl.outputColorSpace = THREE.SRGBColorSpace
  }, [gl])
  return null
}

function StudioLighting() {
  return (
    <>
      <directionalLight position={[5, 8, 5]} intensity={2} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} />
      <directionalLight position={[-5, 5, -5]} intensity={0.8} color="#e0e5ff" />
      <directionalLight position={[0, 5, -8]} intensity={1.2} color="#fff5e0" />
      <spotLight position={[0, 12, 0]} angle={0.4} penumbra={0.8} intensity={2} castShadow />
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 3, 3]} intensity={0.5} />
      <pointLight position={[-3, 3, -3]} intensity={0.3} color="#f0f0ff" />
    </>
  )
}

function JewelryEnvironment() {
  return (
    <Environment files="/hdri/jewelry-studio-v2.hdr" background={false}>
      <Lightformer position={[0, 5, -5]} scale={[10, 5, 1]} intensity={2} color="#ffffff" />
      <Lightformer position={[-5, 2, 0]} scale={[5, 3, 1]} intensity={1} color="#e8f0ff" rotation-y={Math.PI / 2} />
      <Lightformer position={[5, 2, 0]} scale={[5, 3, 1]} intensity={1} color="#fff8e0" rotation-y={-Math.PI / 2} />
    </Environment>
  )
}

function SceneContent({ ringConfig }: { ringConfig: RingConfig }) {
  return (
    <>
      <RendererConfig />
      <OrbitControls
        enablePan={false}
        enableZoom
        enableRotate
        autoRotate={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.5}
        minDistance={2}
        maxDistance={8}
        dampingFactor={0.05}
        enableDamping
      />
      <JewelryEnvironment />
      <StudioLighting />
      <Suspense fallback={<RingPlaceholder />}>
        <ProceduralRing config={ringConfig} />
      </Suspense>
      <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={8} blur={2.5} far={4} resolution={512} />
      <EffectComposer multisampling={4}>
        <Bloom luminanceThreshold={0.8} luminanceSmoothing={0.9} intensity={0.4} />
        <Vignette offset={0.3} darkness={0.4} eskil={false} />
      </EffectComposer>
      <Preload all />
    </>
  )
}

interface Scene3DProps {
  ringConfig: RingConfig
  className?: string
}

export default function Scene3D({ ringConfig, className = '' }: Scene3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        shadows="soft"
        dpr={[1, 2]}
        camera={{ position: [0, 1, 4], fov: 45, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: true,
        }}
        style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)' }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Suspense fallback={null}>
          <SceneContent ringConfig={ringConfig} />
        </Suspense>
      </Canvas>
    </div>
  )
}
