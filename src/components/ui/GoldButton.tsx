'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface GoldButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const GoldButton = forwardRef<HTMLButtonElement, GoldButtonProps>(
  ({ className, variant = 'solid', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-sans font-medium tracking-wider uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:opacity-50 disabled:cursor-not-allowed',
          // sizes
          size === 'sm' && 'px-4 py-2 text-xs',
          size === 'md' && 'px-6 py-3 text-sm',
          size === 'lg' && 'px-8 py-4 text-base',
          // variants
          variant === 'solid' &&
            'bg-gold-gradient text-black hover:shadow-gold-lg hover:scale-[1.02] active:scale-[0.98]',
          variant === 'outline' &&
            'border border-gold/60 text-gold hover:border-gold hover:bg-gold/10 hover:shadow-gold',
          variant === 'ghost' && 'text-gold/80 hover:text-gold hover:bg-gold/10',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

GoldButton.displayName = 'GoldButton'

export default GoldButton
