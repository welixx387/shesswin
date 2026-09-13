"use client";

import { InputHTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, className, id, onFocus, onBlur, ...props },
  ref
) {
  const [focused, setFocused] = useState(false);
  const fieldId = id ?? props.name;

  return (
    <label className="block" htmlFor={fieldId}>
      <span className="mb-1.5 block text-sm font-medium text-text-secondary">{label}</span>
      <span className="relative block overflow-hidden rounded-xl">
        <input
          ref={ref}
          id={fieldId}
          className={cn(
            "w-full rounded-xl border border-border-subtle bg-white/[0.03] px-4 py-2.5 text-text-primary placeholder:text-text-secondary/40 outline-none transition-colors focus:border-transparent",
            className
          )}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...props}
        />
        <span
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-brand transition-transform duration-300",
            focused && "scale-x-100"
          )}
        />
      </span>
    </label>
  );
});
