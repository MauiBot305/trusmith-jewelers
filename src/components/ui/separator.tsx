'use client'

import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

import { cn } from '@/lib/utils'

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
    gold?: boolean
  }
>(({ className, orientation = 'horizontal', decorative = true, gold = false, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      'shrink-0',
      orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
      gold ? 'bg-gold/30' : 'bg-white/10',
      className
    )}
    {...props}
  />
))
Separator.displayName = SeparatorPrimitive.Root.displayName

// ── Gold Divider — decorative section separator ───────────────────────────────

const GoldDivider = ({ className }: { className?: string }) => (
  <div className={cn('flex items-center gap-4 my-8', className)}>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/30" />
    <div className="w-1.5 h-1.5 bg-gold/60 rotate-45" />
    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/30" />
  </div>
)

export { Separator, GoldDivider }
