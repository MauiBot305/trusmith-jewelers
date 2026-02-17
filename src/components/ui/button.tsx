import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // Base styles — all buttons share these
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-sans font-medium ring-offset-black transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // Gold CTA — primary action
        primary:
          'bg-gold-gradient text-black font-semibold tracking-wider uppercase hover:shadow-gold-lg hover:scale-[1.02] active:scale-[0.98]',
        // Dark secondary
        secondary:
          'bg-black-soft text-white-off border border-white/10 hover:border-gold/40 hover:text-gold',
        // Outlined gold
        outline:
          'border border-gold/50 text-gold bg-transparent hover:bg-gold/10 hover:border-gold tracking-wider uppercase',
        // Ghost
        ghost: 'text-white-off/70 hover:text-gold hover:bg-white/5',
        // Destructive
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        // Link style
        link: 'text-gold underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        sm: 'h-9 px-4 py-2 text-xs tracking-wider',
        md: 'h-11 px-6 py-2.5',
        lg: 'h-13 px-8 py-3 text-base tracking-widest',
        xl: 'h-16 px-10 py-4 text-lg tracking-widest',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
