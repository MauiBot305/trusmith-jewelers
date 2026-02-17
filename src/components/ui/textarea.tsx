import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-sans text-white-off/70 tracking-wider"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            'flex min-h-[120px] w-full rounded-sm border bg-black-soft px-4 py-3',
            'font-sans text-sm text-white-off placeholder:text-white-off/30',
            'resize-y transition-all duration-200',
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
Textarea.displayName = 'Textarea'

export { Textarea }
