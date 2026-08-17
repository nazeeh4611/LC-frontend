import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={id} className="text-xs uppercase tracking-wider text-ink-muted">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "h-11 w-full rounded border bg-bg-elevated px-4 text-sm text-white placeholder:text-ink-faint",
            "border-border transition-colors duration-200",
            "focus-visible:outline-none focus-visible:border-gold-bright",
            error ? "border-status-danger" : "",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-status-danger">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
