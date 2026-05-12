import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        'flex h-11 w-full rounded-sm border border-input bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors',
        'focus-visible:outline-none focus-visible:border-foreground/40 focus-visible:ring-1 focus-visible:ring-ring/40',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
        className,
      )}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
