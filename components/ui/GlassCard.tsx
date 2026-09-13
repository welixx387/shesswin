import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glass gradient-border-mask rounded-2xl shadow-glass",
        className
      )}
      {...props}
    />
  );
}
