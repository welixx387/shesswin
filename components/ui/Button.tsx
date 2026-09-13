"use client";

import { MouseEvent, ReactNode, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Ripple = { id: number; x: number; y: number; size: number };

type ButtonProps = {
  variant?: "primary" | "ghost" | "outline";
  size?: "md" | "lg";
  pulse?: boolean;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  "aria-label"?: string;
};

const sizeStyles = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const variantStyles = {
  primary:
    "bg-gradient-brand text-white shadow-glow-primary hover:shadow-glow-primary-lg bg-[length:160%_100%] bg-left hover:bg-right",
  ghost: "glass text-text-primary hover:border-accent-glow/50 hover:bg-white/[0.08]",
  outline:
    "border border-border-subtle text-text-primary hover:border-accent-primary hover:text-accent-glow",
};

const baseClasses =
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight transition-all duration-300 ease-board-move disabled:opacity-50 disabled:pointer-events-none";

function useRipples() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  function addRipple(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.8;
    const ripple: Ripple = {
      id: Date.now() + Math.random(),
      x: e.clientX - rect.left - size / 2,
      y: e.clientY - rect.top - size / 2,
      size,
    };
    setRipples((prev) => [...prev, ripple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
    }, 650);
  }

  const rippleLayer = (
    <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="absolute rounded-full bg-white/40"
            style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
            initial={{ opacity: 0.5, scale: 0 }}
            animate={{ opacity: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </span>
  );

  return { addRipple, rippleLayer };
}

export function Button({
  variant = "primary",
  size = "md",
  pulse,
  icon,
  className,
  children,
  href,
  type = "button",
  disabled,
  onClick,
  ...rest
}: ButtonProps) {
  const { addRipple, rippleLayer } = useRipples();
  const classes = cn(baseClasses, sizeStyles[size], variantStyles[variant], className);

  const hoverAnimate = pulse ? { scale: [1, 1.02, 1] } : undefined;
  const hoverTransition = pulse
    ? { scale: { duration: 3, repeat: Infinity, ease: "easeInOut" as const } }
    : undefined;

  const content = (
    <>
      {icon}
      {children}
      {rippleLayer}
    </>
  );

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    addRipple(e);
    onClick?.(e);
  };

  if (href) {
    return (
      <motion.div
        className="inline-block"
        animate={hoverAnimate}
        transition={hoverTransition}
        whileHover={{ y: -2, scale: 1.015 }}
        whileTap={{ scale: 0.97 }}
      >
        <Link href={href} className={classes} onClick={handleClick} {...rest}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={classes}
      onClick={handleClick}
      animate={hoverAnimate}
      transition={hoverTransition}
      whileHover={{ y: -2, scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
      aria-label={rest["aria-label"]}
    >
      {content}
    </motion.button>
  );
}
