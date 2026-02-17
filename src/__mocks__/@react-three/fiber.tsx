// Mock for @react-three/fiber in Jest tests
import React from 'react'

export const Canvas = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="three-canvas">{children}</div>
)

export const useFrame = jest.fn()
export const useThree = jest.fn(() => ({ camera: {}, gl: {}, scene: {} }))
