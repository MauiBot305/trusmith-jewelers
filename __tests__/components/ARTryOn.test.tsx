import { render, screen, fireEvent } from '@testing-library/react'
import { ARTryOn } from '@/components/builder/ARTryOn'

// Mock dynamic import (ThreeRingViewer)
jest.mock('next/dynamic', () => {
  const MockThreeViewer = () => <div data-testid="three-viewer" />
  MockThreeViewer.displayName = 'MockThreeViewer'
  return () => MockThreeViewer
})

describe('ARTryOn', () => {
  it('renders without crashing', () => {
    render(<ARTryOn />)
    expect(screen.getByText('◈ AR Preview')).toBeInTheDocument()
  })

  it('renders all three skin tone presets', () => {
    render(<ARTryOn />)
    expect(screen.getByText('Fair')).toBeInTheDocument()
    expect(screen.getByText('Medium')).toBeInTheDocument()
    expect(screen.getByText('Deep')).toBeInTheDocument()
  })

  it('starts with Fair tone selected', () => {
    render(<ARTryOn />)
    const fairBtn = screen.getByText('Fair').closest('button')
    expect(fairBtn).toHaveClass('border-gold')
  })

  it('switches to Medium tone on click', () => {
    render(<ARTryOn />)
    const mediumBtn = screen.getByText('Medium').closest('button')!
    fireEvent.click(mediumBtn)
    expect(mediumBtn).toHaveClass('border-gold')
  })

  it('switches to Deep tone on click', () => {
    render(<ARTryOn />)
    const deepBtn = screen.getByText('Deep').closest('button')!
    fireEvent.click(deepBtn)
    expect(deepBtn).toHaveClass('border-gold')
  })

  it('has a toggle ring overlay button', () => {
    render(<ARTryOn />)
    expect(screen.getByText('Hide Ring')).toBeInTheDocument()
  })

  it('toggles ring visibility', () => {
    render(<ARTryOn />)
    const toggle = screen.getByText('Hide Ring')
    fireEvent.click(toggle)
    expect(screen.getByText('Show Ring')).toBeInTheDocument()
  })

  it('shows Phase 2 teaser text', () => {
    render(<ARTryOn />)
    expect(screen.getByText(/Live WebAR with hand tracking/i)).toBeInTheDocument()
  })

  it('accepts custom className', () => {
    const { container } = render(<ARTryOn className="custom-ar-class" />)
    expect(container.firstChild).toHaveClass('custom-ar-class')
  })
})
