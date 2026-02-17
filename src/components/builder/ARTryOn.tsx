'use client'

import { Suspense, useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Webcam from 'react-webcam'
import { FilesetResolver, HandLandmarker, DrawingUtils } from '@mediapipe/tasks-vision'
import { cn } from '@/lib/utils'

// Lazy load the heavy 3D canvas — only on client, never SSR
const ThreeRingViewer = dynamic(() => import('./ThreeRingViewer'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
      <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

const handPresets = [
  { id: 'hand1', src: '/hands/hand-light.svg', name: 'Light', label: 'Fair' },
  { id: 'hand2', src: '/hands/hand-medium.svg', name: 'Medium', label: 'Medium' },
  { id: 'hand3', src: '/hands/hand-dark.svg', name: 'Dark', label: 'Deep' },
]

interface ARTryOnProps {
  ringModel?: string
  className?: string
}

export function ARTryOn({ ringModel = '/models/rings/SM_HexaRing.glb', className }: ARTryOnProps) {
  const [mode, setMode] = useState<'preset' | 'camera'>('preset')
  const [selectedHand, setSelectedHand] = useState(handPresets[0])
  const [isCameraReady, setIsCameraReady] = useState(false)
  const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(null)
  
  // AR State
  const [ringPosition, setRingPosition] = useState<[number, number, number]>([0, 0, 0])
  const [ringRotation, setRingRotation] = useState<[number, number, number]>([0, 0, 0])
  const [ringScale, setRingScale] = useState<number>(15)
  const [handDetected, setHandDetected] = useState(false)
  
  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number>()

  // Initialize MediaPipe HandLandmarker
  useEffect(() => {
    async function initHandLandmarker() {
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
      )
      const landmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
          delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        numHands: 1,
      })
      setHandLandmarker(landmarker)
    }
    initHandLandmarker()
  }, [])

  // Start detection loop when camera is active
  useEffect(() => {
    if (mode === 'camera' && isCameraReady && handLandmarker) {
      const predictWebcam = () => {
        if (webcamRef.current && webcamRef.current.video && canvasRef.current) {
          const video = webcamRef.current.video
          if (video.currentTime > 0) {
            const startTimeMs = performance.now()
            const result = handLandmarker.detectForVideo(video, startTimeMs)
            
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            
            if (ctx) {
              ctx.clearRect(0, 0, canvas.width, canvas.height)
              
              if (result.landmarks && result.landmarks.length > 0) {
                setHandDetected(true)
                const landmarks = result.landmarks[0]
                
                // Draw debug lines
                const drawingUtils = new DrawingUtils(ctx)
                drawingUtils.drawConnectors(landmarks, HandLandmarker.HAND_CONNECTIONS, {
                  color: 'rgba(212, 175, 55, 0.3)', // Gold, transparent
                  lineWidth: 2
                })

                // ─── RING POSITIONING LOGIC ───
                // Ring Finger MCP (13) and PIP (14)
                const mcp = landmarks[13]
                const pip = landmarks[14]
                
                // 1. Position: Midpoint between MCP and PIP
                // Canvas is mirrored, so x is inverted (1 - x)
                const x = (1 - (mcp.x + pip.x) / 2) * 2 - 1 // Convert 0..1 to -1..1
                const y = -((mcp.y + pip.y) / 2) * 2 + 1 // Invert Y
                
                // Z-depth estimation is tricky in 2D. 
                // We'll map X/Y to a fixed depth plane (Z=0 in Three.js world)
                // Adjust multipliers based on camera FOV
                setRingPosition([x * 2.5, y * 1.8, 0])

                // 2. Rotation: Align with finger vector
                // Calculate angle in 2D plane
                const deltaX = (1 - pip.x) - (1 - mcp.x)
                const deltaY = -pip.y - (-mcp.y)
                const angleZ = Math.atan2(deltaY, deltaX)
                // Add base rotation to align ring model (usually lies flat)
                setRingRotation([0, 0, angleZ - Math.PI / 2])

                // 3. Scale: Based on palm width (Index MCP 5 to Pinky MCP 17)
                const p1 = landmarks[5]
                const p2 = landmarks[17]
                const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
                // Base scale multiplier found by trial and error
                setRingScale(dist * 50)
                
              } else {
                setHandDetected(false)
              }
            }
          }
        }
        requestRef.current = requestAnimationFrame(predictWebcam)
      }
      requestRef.current = requestAnimationFrame(predictWebcam)
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [mode, isCameraReady, handLandmarker])

  const toggleMode = () => setMode(m => m === 'preset' ? 'camera' : 'preset')

  // Check if iOS for USDZ AR Quick Look
  const isIOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as typeof window & { MSStream?: unknown }).MSStream

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {/* Main try-on viewport */}
      <div className="relative w-full aspect-[4/3] bg-black-soft rounded-lg overflow-hidden border border-gold/10">
        
        {mode === 'preset' ? (
          /* PRESET MODE */
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <HandSVG tone={selectedHand.id} />
            </div>
            {/* 3D Overlay for Preset */}
            <div className="absolute inset-0 pointer-events-none">
              <Suspense fallback={null}>
                <ThreeRingViewer modelUrl={ringModel} />
              </Suspense>
            </div>
          </>
        ) : (
          /* CAMERA MODE */
          <div className="relative w-full h-full">
            <Webcam
              ref={webcamRef}
              audio={false}
              onUserMedia={() => setIsCameraReady(true)}
              className="absolute inset-0 w-full h-full object-cover mirror-x"
              videoConstraints={{ facingMode: 'user' }}
            />
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-cover mirror-x pointer-events-none"
              width={640}
              height={480}
            />
            
            {/* 3D Overlay for Camera */}
            {handDetected && (
              <div className="absolute inset-0 pointer-events-none z-10">
                <Suspense fallback={null}>
                  <ThreeRingViewer 
                    modelUrl={ringModel} 
                    arMode={true}
                    ringPosition={ringPosition}
                    ringRotation={ringRotation}
                    ringScale={ringScale}
                  />
                </Suspense>
              </div>
            )}

            {!isCameraReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                  <p className="text-white/60 text-sm">Starting Camera...</p>
                </div>
              </div>
            )}
            
            {!handDetected && isCameraReady && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 px-4 py-2 rounded-full pointer-events-none">
                <p className="text-white font-medium text-sm">Show your hand 👋</p>
              </div>
            )}
          </div>
        )}

        {/* Controls Overlay */}
        <div className="absolute top-3 right-3 flex gap-2 z-30">
           <button
            onClick={toggleMode}
            className="px-3 py-1.5 bg-black/60 border border-gold/30 text-gold text-xs tracking-wider uppercase font-sans rounded hover:bg-black/80 transition-colors shadow-lg"
          >
            {mode === 'preset' ? 'Enable Camera' : 'Use Preset'}
          </button>
        </div>

        {/* AR label badge */}
        <div className="absolute top-3 left-3 px-3 py-1.5 bg-gold/20 border border-gold/40 text-gold text-xs tracking-wider uppercase font-sans rounded z-30 backdrop-blur-sm">
          ◈ {mode === 'camera' ? 'Live AR' : 'AR Preview'}
        </div>

        {/* iOS AR Quick Look button */}
        {isIOS && mode === 'preset' && (
          <a
            href={ringModel.replace('.glb', '.usdz')}
            rel="ar"
            className="absolute bottom-3 left-3 flex items-center gap-2 px-4 py-2 bg-gold text-black font-sans font-semibold text-xs tracking-widest uppercase rounded hover:bg-gold-light transition-colors z-30"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.5l7.5 3.75L12 12 4.5 8.25 12 4.5zM4 9.5l7 3.5v7.5L4 17V9.5zm9 11V13l7-3.5V17l-7 3.5z" />
            </svg>
            View in AR
          </a>
        )}
      </div>

      {/* Hand tone selector (only visible in preset mode) */}
      {mode === 'preset' && (
        <div className="flex flex-col gap-2">
          <span className="text-white-off/50 text-xs tracking-[0.2em] uppercase font-sans">
            Skin Tone Preset
          </span>
          <div className="flex gap-2">
            {handPresets.map((hand) => (
              <button
                key={hand.id}
                onClick={() => setSelectedHand(hand)}
                className={cn(
                  'flex-1 py-2 px-3 rounded border text-xs font-sans tracking-wider uppercase transition-all duration-200',
                  selectedHand.id === hand.id
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-white/10 text-white-off/50 hover:border-gold/40 hover:text-white-off/80'
                )}
              >
                <HandSwatchDot tone={hand.id} />
                <span className="ml-1.5">{hand.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {mode === 'camera' && (
        <p className="text-center text-white-off/30 text-[10px] tracking-widest uppercase font-sans">
          Powered by MediaPipe Hand Tracking
        </p>
      )}
    </div>
  )
}

// ── Inline SVG hand placeholders ─

function HandSwatchDot({ tone }: { tone: string }) {
  const colors: Record<string, string> = {
    hand1: '#F2C9A0',
    hand2: '#C68642',
    hand3: '#6B3A2A',
  }
  return (
    <span
      className="inline-block w-3 h-3 rounded-full border border-white/20 align-middle"
      style={{ backgroundColor: colors[tone] ?? '#ccc' }}
    />
  )
}

function HandSVG({ tone }: { tone: string }) {
  const skinColors: Record<string, { fill: string; shadow: string }> = {
    hand1: { fill: '#F2C9A0', shadow: '#D4956A' },
    hand2: { fill: '#C68642', shadow: '#8B5A2B' },
    hand3: { fill: '#6B3A2A', shadow: '#3D1C0E' },
  }
  const { fill, shadow } = skinColors[tone] ?? skinColors.hand1

  return (
    <svg
      viewBox="0 0 300 400"
      className="w-3/4 max-w-xs opacity-80"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={fill} stroke={shadow} strokeWidth="1.5">
        <ellipse cx="150" cy="300" rx="70" ry="80" />
        <rect x="170" y="140" width="28" height="120" rx="14" />
        <rect x="142" y="110" width="28" height="145" rx="14" />
        <rect x="114" y="120" width="28" height="135" rx="14" />
        <rect x="88" y="150" width="24" height="110" rx="12" />
        <ellipse cx="210" cy="290" rx="20" ry="50" transform="rotate(-20,210,290)" />
      </g>
    </svg>
  )
}

export default ARTryOn
