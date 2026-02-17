import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-sans text-white-off/70 tracking-wider"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            'flex h-11 w-full rounded-sm border bg-black-soft px-4 py-2',
            'font-sans text-sm text-white-off placeholder:text-white-off/30',
            'transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'border-red-500/70 focus-visible:ring-red-500'
              : 'border-white/10 hover:border-white/20 focus-visible:border-gold/50',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-red-400 text-xs font-sans">{error}</p>}
        {helperText && !error && (
          <p className="text-white-off/40 text-xs font-sans">{helperText}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
