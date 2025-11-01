import { render, screen, fireEvent } from '@testing-library/react'
import AnimatedButton from '../../src/components/ui/AnimatedButton'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
}))

describe('AnimatedButton', () => {
  test('renders with default props', () => {
    render(<AnimatedButton>Click me</AnimatedButton>)
    
    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toBeInTheDocument()
    expect(button).not.toBeDisabled()
  })

  test('renders with different variants', () => {
    const { rerender } = render(
      <AnimatedButton variant="success">Success</AnimatedButton>
    )
    
    let button = screen.getByRole('button')
    expect(button).toHaveClass('bg-green-500')
    
    rerender(<AnimatedButton variant="danger">Danger</AnimatedButton>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('bg-red-500')
  })

  test('renders with different sizes', () => {
    const { rerender } = render(
      <AnimatedButton size="sm">Small</AnimatedButton>
    )
    
    let button = screen.getByRole('button')
    expect(button).toHaveClass('h-9')
    
    rerender(<AnimatedButton size="lg">Large</AnimatedButton>)
    button = screen.getByRole('button')
    expect(button).toHaveClass('h-11')
  })

  test('handles click events', () => {
    const handleClick = jest.fn()
    render(
      <AnimatedButton onClick={handleClick}>Click me</AnimatedButton>
    )
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('is disabled when disabled prop is true', () => {
    const handleClick = jest.fn()
    render(
      <AnimatedButton disabled onClick={handleClick}>
        Disabled
      </AnimatedButton>
    )
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    
    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  test('shows loading state correctly', () => {
    render(
      <AnimatedButton loading>Loading</AnimatedButton>
    )
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('cursor-not-allowed')
  })

  test('renders with icons', () => {
    const icon = <span data-testid="left-icon">🔥</span>
    const rightIcon = <span data-testid="right-icon">→</span>
    
    render(
      <AnimatedButton icon={icon} rightIcon={rightIcon}>
        With Icons
      </AnimatedButton>
    )
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
  })

  test('applies custom className', () => {
    render(
      <AnimatedButton className="custom-class">Custom</AnimatedButton>
    )
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  test('does not call onClick when loading', () => {
    const handleClick = jest.fn()
    render(
      <AnimatedButton loading onClick={handleClick}>
        Loading
      </AnimatedButton>
    )
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(handleClick).not.toHaveBeenCalled()
  })

  test('renders gaming variant with gradient', () => {
    render(
      <AnimatedButton variant="gaming">Gaming</AnimatedButton>
    )
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-gradient-to-r', 'from-purple-500', 'to-pink-500')
  })

  test('applies glow effect when enabled', () => {
    render(
      <AnimatedButton glowEffect>Glowing</AnimatedButton>
    )
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('shadow-lg', 'shadow-current/25')
  })
})