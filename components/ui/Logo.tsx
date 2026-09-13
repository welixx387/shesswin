"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { KNIGHT_PATHS } from "@/lib/knight-paths";

type LogoProps = {
  size?: number;
  showWordmark?: boolean;
  animate?: boolean;
  className?: string;
};

export function Logo({ size = 28, showWordmark = true, animate = true, className }: LogoProps) {
  const uid = useId();
  const gradientId = `shesswin-logo-gradient-${uid}`;
  const glowId = `shesswin-logo-glow-${uid}`;

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 outline-none",
        className
      )}
      aria-label="ShessWin — на главную"
    >
      <span className="relative grid place-items-center rounded-xl border border-border-subtle bg-surface-glass p-1.5 transition-shadow duration-300 group-hover:shadow-glow-primary">
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          initial={false}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#6366F1" />
              <stop offset="1" stopColor="#10B981" />
            </linearGradient>
            <radialGradient id={glowId} cx="0.5" cy="0.5" r="0.6">
              <stop offset="0" stopColor="#818CF8" stopOpacity="0.55" />
              <stop offset="1" stopColor="#818CF8" stopOpacity="0" />
            </radialGradient>
          </defs>

          {animate && (
            <motion.circle
              cx="12"
              cy="12"
              r="11"
              fill={`url(#${glowId})`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
            />
          )}

          {KNIGHT_PATHS.map((d, i) =>
            animate ? (
              <motion.path
                key={d}
                d={d}
                stroke={`url(#${gradientId})`}
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: 0.9, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.2, delay: i * 0.12 },
                }}
              />
            ) : (
              <path
                key={d}
                d={d}
                stroke={`url(#${gradientId})`}
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )
          )}
        </motion.svg>
      </span>

      {showWordmark && (
        <span className="font-heading text-lg font-bold tracking-tight text-text-primary">
          <span className="text-gradient-brand">S</span>hessWin
        </span>
      )}
    </Link>
  );
}
