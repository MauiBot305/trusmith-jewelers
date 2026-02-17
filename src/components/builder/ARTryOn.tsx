'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { Camera, CameraOff } from 'lucide-react'
import { cn } from '@/lib/utils'

const METAL_COLORS: Record<string, string> = {
  '#D4AF37': '#FFD700',
  '#FFD700': '#FFCC00',
  '#E8E8E8': '#E8E8E8',
  '#B76E79': '#E8A090',
  '#D0D0D8': '#D0D0D8',
  '#C0C0C0': '#C0C0C0',
}

const RING_FINGER_PIP = 14
const RING_FINGER_MCP = 13

interface ARTryOnProps {
  ringModel?: string
  metalColor?: string
  caratSize?: number
  className?: string
}

export function ARTryOn({
  metalColor = '#D4AF37',
  caratSize = 1.0,
  className,
}: ARTryOnProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animFrameRef = useRef<number>(0)
  const handsRef = useRef<any>(null)

  const [isStreaming, setIsStreaming] = useState(false)
  const [handDetected, setHandDetected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cameraActive, setCameraActive] = useState(false)

  const resolvedMetalColor = METAL_COLORS[metalColor] ?? metalColor

  const drawRing = useCallback(
    (ctx: CanvasRenderingContext2D, landmarks: any[], width: number, height: number) => {
      const pip = landmarks[RING_FINGER_PIP]
      const mcp = landmarks[RING_FINGER_MCP]

      const x = ((pip.x + mcp.x) / 2) * width
      const y = ((pip.y + mcp.y) / 2) * height
      const angle = Math.atan2((pip.y - mcp.y) * height, (pip.x - mcp.x) * width)
      const jointDist = Math.hypot((pip.x - mcp.x) * width, (pip.y - mcp.y) * height)
      const ringRadius = jointDist * 0.4
      const bandWidth = ringRadius * 0.25

      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle + Math.PI / 2)

      ctx.beginPath()
      ctx.ellipse(0, 0, ringRadius + 2, ringRadius * 0.5 + 2, 0, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(0,0,0,0.4)'
      ctx.lineWidth = bandWidth + 4
      ctx.stroke()

      ctx.beginPath()
      ctx.ellipse(0, 0, ringRadius, ringRadius * 0.5, 0, 0, Math.PI * 2)
      ctx.strokeStyle = resolvedMetalColor
      ctx.lineWidth = bandWidth
      ctx.lineCap = 'round'
      ctx.stroke()

      const grad = ctx.createLinearGradient(-ringRadius, -ringRadius * 0.5, ringRadius, ringRadius * 0.5)
      grad.addColorStop(0, 'rgba(255,255,255,0.3)')
      grad.addColorStop(0.5, 'rgba(255,255,255,0.05)')
      grad.addColorStop(1, 'rgba(255,255,255,0.2)')
      ctx.beginPath()
      ctx.ellipse(0, 0, ringRadius, ringRadius * 0.5, 0, 0, Math.PI * 2)
      ctx.strokeStyle = grad
      ctx.lineWidth = bandWidth - 2
      ctx.stroke()

      const gemSize = ringRadius * (0.3 + caratSize * 0.15)
      const gemY = -ringRadius * 0.5 - gemSize * 0.3

      ctx.beginPath()
      ctx.arc(0, gemY, gemSize * 1.5, 0, Math.PI * 2)
      const glowGrad = ctx.createRadialGradient(0, gemY, 0, 0, gemY, gemSize * 1.5)
      glowGrad.addColorStop(0, 'rgba(255,255,255,0.4)')
      glowGrad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = glowGrad
      ctx.fill()

      ctx.beginPath()
      ctx.arc(0, gemY, gemSize, 0, Math.PI * 2)
      const gemGrad = ctx.createRadialGradient(-gemSize * 0.3, gemY - gemSize * 0.3, 0, 0, gemY, gemSize)
      gemGrad.addColorStop(0, '#ffffff')
      gemGrad.addColorStop(0.3, '#E8E8FF')
      gemGrad.addColorStop(1, 'rgba(220,230,255,0.8)')
      ctx.fillStyle = gemGrad
      ctx.fill()

      ctx.beginPath()
      ctx.arc(-gemSize * 0.25, gemY - gemSize * 0.25, gemSize * 0.15, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,255,255,0.8)'
      ctx.fill()

      ctx.strokeStyle = resolvedMetalColor
      ctx.lineWidth = 2
      for (let i = 0; i < 4; i++) {
        const pa = (i / 4) * Math.PI * 2
        const px = Math.cos(pa) * gemSize * 0.8
        const py = gemY + Math.sin(pa) * gemSize * 0.8
        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(px * 0.3, gemY + (py - gemY) * 0.3)
        ctx.stroke()
      }

      ctx.restore()
    },
    [resolvedMetalColor, caratSize]
  )

  const processFrames = useCallback(async () => {
    if (videoRef.current && handsRef.current && videoRef.current.readyState >= 2) {
      try {
        await handsRef.current.send({ image: videoRef.current })
      } catch {
        // ignore frame errors
      }
    }
    animFrameRef.current = requestAnimationFrame(processFrames)
  }, [])

  const initHandTracking = useCallback(async () => {
    try {
      const { Hands } = await import('@mediapipe/hands')
      const hands = new Hands({
        locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      })
      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.5,
      })
      hands.onResults((results: any) => {
        const canvas = canvasRef.current
        const video = videoRef.current
        if (!canvas || !video) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if (results.multiHandLandmarks?.length > 0) {
          setHandDetected(true)
          drawRing(ctx, results.multiHandLandmarks[0], canvas.width, canvas.height)
        } else {
          setHandDetected(false)
        }
      })
      handsRef.current = hands
    } catch (err) {
      console.warn('MediaPipe not available:', err)
    }
  }, [drawRing])

  const startCamera = useCallback(async () => {
    try {
      setError(null)
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop())
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
        setIsStreaming(true)
        setCameraActive(true)
        if (!handsRef.current) await initHandTracking()
        processFrames()
      }
    } catch {
      setError('Camera access denied. Please allow camera permissions.')
      setCameraActive(false)
    }
  }, [initHandTracking, processFrames])

  const stopCamera = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
    if (videoRef.current) videoRef.current.srcObject = null
    setIsStreaming(false)
    setCameraActive(false)
    setHandDetected(false)
  }, [])

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop())
    }
  }, [])

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="relative w-full aspect-[4/3] bg-black rounded-lg overflow-hidden border border-yellow-500/10">
        {cameraActive ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover"
              style={{ transform: 'scaleX(-1)' }}
            />
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ transform: 'scaleX(-1)' }}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-3">✋</div>
              <p className="text-white/40 text-sm">Enable camera to try the ring on your hand</p>
            </div>
          </div>
        )}

        {cameraActive && (
          <div className={cn(
            'absolute top-3 left-3 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-sm',
            handDetected
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-black/60 text-zinc-400'
          )}>
            {handDetected ? '✋ Hand Detected' : '👆 Show Your Hand'}
          </div>
        )}

        <div className="absolute top-3 right-3 px-2 py-1 bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 text-xs tracking-wider uppercase rounded">
          ◈ AR
        </div>

        {error && (
          <div className="absolute bottom-3 left-3 right-3 bg-black/80 border border-red-500/40 text-red-400 text-xs px-3 py-2 rounded">
            {error}
          </div>
        )}
      </div>

      <button
        onClick={cameraActive ? stopCamera : startCamera}
        className={cn(
          'flex items-center justify-center gap-2 w-full py-3 rounded-lg border text-sm font-sans tracking-wider uppercase transition-all',
          cameraActive
            ? 'border-yellow-500/60 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20'
            : 'border-white/20 text-white/60 hover:border-yellow-500/50 hover:text-yellow-400'
        )}
      >
        {cameraActive ? (
          <><CameraOff size={16} /> Stop Camera</>
        ) : (
          <><Camera size={16} /> Try On With Camera</>
        )}
      </button>

      <p className="text-center text-white/30 text-xs tracking-widest uppercase">
        {cameraActive ? 'Show your ring finger to the camera' : 'Enable camera for live AR try-on'}
      </p>
    </div>
  )
}

export default ARTryOn
