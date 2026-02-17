'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

export interface RingConfig {
  metalColor: string
  metalRoughness: number
  stoneColor: string
  stoneTransmission: boolean
  caratSize: number
  sideStones: 'none' | 'pave' | 'channel'
  bandScale: number
  autoRotate: boolean
  rotationSpeed: number
}

const DEFAULT_CONFIG: RingConfig = {
  metalColor: '#E8E8E8',
  metalRoughness: 0.15,
  stoneColor: '#E8E8E8',
  stoneTransmission: true,
  caratSize: 1.0,
  sideStones: 'none',
  bandScale: 1.0,
  autoRotate: true,
  rotationSpeed: 0.4,
}

export function ProceduralRing({ config = DEFAULT_CONFIG }: { config?: RingConfig }) {
  const groupRef = useRef<THREE.Group>(null)

  const metalMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(config.metalColor),
        metalness: 1,
        roughness: config.metalRoughness,
        envMapIntensity: 2.5,
        clearcoat: 0.4,
        clearcoatRoughness: 0.1,
      }),
    [config.metalColor, config.metalRoughness]
  )

  const gemMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(config.stoneColor),
        metalness: 0,
        roughness: 0,
        transmission: config.stoneTransmission ? 0.95 : 0,
        thickness: 2.0,
        ior: 2.42,
        envMapIntensity: 3.0,
        clearcoat: 1.0,
        clearcoatRoughness: 0,
        // @ts-ignore - iridescence available in Three.js r150+
        iridescence: 1.0,
        // @ts-ignore
        iridescenceIOR: 2.0,
        // @ts-ignore
        iridescenceThicknessRange: [100, 400],
        transparent: true,
        side: THREE.DoubleSide,
      } as any),
    [config.stoneColor, config.stoneTransmission]
  )

  useFrame((_, delta) => {
    if (groupRef.current && config.autoRotate) {
      groupRef.current.rotation.y += delta * config.rotationSpeed
    }
  })

  const gemSize = 0.15 + config.caratSize * 0.1

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.15} floatingRange={[-0.03, 0.03]}>
      <group ref={groupRef}>
        <mesh castShadow receiveShadow material={metalMaterial}>
          <torusGeometry args={[0.8, 0.08 * config.bandScale, 64, 128]} />
        </mesh>

        <group position={[0, 0.08 * config.bandScale + gemSize * 0.3, 0]}>
          {[0, 1, 2, 3].map((i) => {
            const angle = (i / 4) * Math.PI * 2
            const px = Math.cos(angle) * gemSize * 0.4
            const pz = Math.sin(angle) * gemSize * 0.4
            return (
              <mesh key={i} position={[px, 0, pz]} castShadow material={metalMaterial}>
                <cylinderGeometry args={[0.012, 0.008, gemSize * 1.2, 8]} />
              </mesh>
            )
          })}
          <mesh position={[0, gemSize * 0.5, 0]} castShadow material={gemMaterial}>
            <octahedronGeometry args={[gemSize, 2]} />
          </mesh>
        </group>

        {config.sideStones === 'pave' &&
          Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * Math.PI * 2
            return (
              <mesh
                key={i}
                position={[Math.cos(angle) * 0.8, 0.08 * config.bandScale + 0.02, Math.sin(angle) * 0.8]}
                material={gemMaterial}
              >
                <sphereGeometry args={[0.015, 8, 8]} />
              </mesh>
            )
          })}

        {config.sideStones === 'channel' &&
          Array.from({ length: 16 }).map((_, i) => {
            const angle = ((i - 8) / 32) * Math.PI * 2 + Math.PI
            return (
              <mesh
                key={i}
                position={[Math.cos(angle) * 0.8, 0.08 * config.bandScale + 0.02, Math.sin(angle) * 0.8]}
                material={gemMaterial}
              >
                <boxGeometry args={[0.025, 0.025, 0.025]} />
              </mesh>
            )
          })}
      </group>
    </Float>
  )
}

export function RingPlaceholder() {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (meshRef.current) meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
  })
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <torusGeometry args={[0.8, 0.12, 32, 64]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} wireframe transparent opacity={0.6} />
      </mesh>
    </Float>
  )
}
