import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-sans font-semibold tracking-wider uppercase transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-gold text-black',
        secondary: 'border-transparent bg-black-soft text-white-off',
        outline: 'border-gold/40 text-gold bg-transparent',
        destructive: 'border-transparent bg-red-600 text-white',
        lab: 'border-transparent bg-emerald-900/50 text-emerald-400 border-emerald-800/50',
        certified: 'border-transparent bg-blue-900/50 text-blue-300 border-blue-800/50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
