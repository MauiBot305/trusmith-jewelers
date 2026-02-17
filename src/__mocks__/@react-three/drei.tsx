// Mock for @react-three/drei in Jest tests
import React from 'react'

export const OrbitControls = () => null
export const useGLTF = jest.fn(() => ({ scene: {} }))
export const Environment = () => null
export const ContactShadows = () => null
export const Html = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const Text = ({ children }: { children: React.ReactNode }) => <span>{children}</span>
