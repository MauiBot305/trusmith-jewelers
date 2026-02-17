// ── Ring Builder Zustand Store ─────────────────────────────────────────────────
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Diamond } from '@/types/diamond'

// ── Setting type (for builder) ─────────────────────────────────────────────────
export interface BuilderSetting {
  id: string
  name: string
  style: string
  basePrice: number
  priceModifier: number
  image: string
  tagline: string
  description: string
  story: string
}

// ── Metal type (for builder) ───────────────────────────────────────────────────
export interface BuilderMetal {
  id: string
  name: string
  karat: string
  color: string
  hex: string
  priceModifier: number
  description: string
}

// ── Builder State ──────────────────────────────────────────────────────────────
export interface BuilderState {
  // Current step (1-6)
  currentStep: number

  // Selections
  diamond: Diamond | null
  setting: BuilderSetting | null
  metal: BuilderMetal | null
  engraving: string
  ringSize: string
  notes: string

  // Completed steps tracking
  completedSteps: number[]

  // Actions
  setDiamond: (diamond: Diamond) => void
  setSetting: (setting: BuilderSetting) => void
  setMetal: (metal: BuilderMetal) => void
  setEngraving: (text: string) => void
  setRingSize: (size: string) => void
  setNotes: (notes: string) => void
  setStep: (step: number) => void
  completeStep: (step: number) => void
  reset: () => void

  // Computed
  getTotal: () => number
  canNavigateToStep: (step: number) => boolean
  getSummary: () => DesignSummary
}

// ── Design Summary ─────────────────────────────────────────────────────────────
export interface DesignSummary {
  diamond: Diamond | null
  setting: BuilderSetting | null
  metal: BuilderMetal | null
  engraving: string
  ringSize: string
  notes: string
  total: number
  depositAmount: number
}

// ── Deposit config ─────────────────────────────────────────────────────────────
export const DEPOSIT_AMOUNT = 500
export const DEPOSIT_PERCENTAGE = 0.2 // 20%

function calculateTotal(
  diamond: Diamond | null,
  setting: BuilderSetting | null,
  metal: BuilderMetal | null
): number {
  let total = 0
  if (diamond) total += diamond.price
  if (setting) total += setting.basePrice
  if (metal) total += metal.priceModifier
  return total
}

// ── Store ──────────────────────────────────────────────────────────────────────
export const useBuilderStore = create<BuilderState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      diamond: null,
      setting: null,
      metal: null,
      engraving: '',
      ringSize: '',
      notes: '',
      completedSteps: [],

      setDiamond: (diamond) =>
        set((state) => ({
          diamond,
          completedSteps: Array.from(new Set([...state.completedSteps, 1])),
        })),

      setSetting: (setting) =>
        set((state) => ({
          setting,
          completedSteps: Array.from(new Set([...state.completedSteps, 2])),
        })),

      setMetal: (metal) =>
        set((state) => ({
          metal,
          completedSteps: Array.from(new Set([...state.completedSteps, 3])),
        })),

      setEngraving: (engraving) => set({ engraving }),

      setRingSize: (ringSize) => set({ ringSize }),

      setNotes: (notes) => set({ notes }),

      setStep: (step) => set({ currentStep: step }),

      completeStep: (step) =>
        set((state) => ({
          completedSteps: Array.from(new Set([...state.completedSteps, step])),
        })),

      reset: () =>
        set({
          currentStep: 1,
          diamond: null,
          setting: null,
          metal: null,
          engraving: '',
          ringSize: '',
          notes: '',
          completedSteps: [],
        }),

      getTotal: () => {
        const { diamond, setting, metal } = get()
        return calculateTotal(diamond, setting, metal)
      },

      canNavigateToStep: (step: number) => {
        const { completedSteps, currentStep } = get()
        // Can always go back to already-visited steps
        if (step <= currentStep) return true
        // Can only go forward to completed steps
        if (step === 1) return true
        return completedSteps.includes(step - 1)
      },

      getSummary: () => {
        const { diamond, setting, metal, engraving, ringSize, notes } = get()
        const total = calculateTotal(diamond, setting, metal)
        const depositAmount = Math.max(DEPOSIT_AMOUNT, total * DEPOSIT_PERCENTAGE)
        return {
          diamond,
          setting,
          metal,
          engraving,
          ringSize,
          notes,
          total,
          depositAmount,
        }
      },
    }),
    {
      name: 'trusmith-ring-builder',
      // Only persist the data, not the functions
      partialize: (state) => ({
        currentStep: state.currentStep,
        diamond: state.diamond,
        setting: state.setting,
        metal: state.metal,
        engraving: state.engraving,
        ringSize: state.ringSize,
        notes: state.notes,
        completedSteps: state.completedSteps,
      }),
    }
  )
)
