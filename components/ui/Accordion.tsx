"use client";

import { ReactNode, createContext, useContext, useId, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionContextValue = {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

export function Accordion({
  children,
  defaultOpen,
  className,
}: {
  children: ReactNode;
  defaultOpen?: string;
  className?: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(defaultOpen ?? null);
  return (
    <AccordionContext.Provider value={{ activeId, setActiveId }}>
      <div className={cn("flex flex-col gap-3", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  title,
  icon,
  children,
  id: providedId,
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  id?: string;
}) {
  const ctx = useContext(AccordionContext);
  const autoId = useId();
  const id = providedId ?? autoId;
  if (!ctx) throw new Error("AccordionItem must be used within Accordion");
  const isOpen = ctx.activeId === id;

  return (
    <div className="glass overflow-hidden rounded-2xl">
      <button
        type="button"
        onClick={() => ctx.setActiveId(isOpen ? null : id)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.04] sm:px-6 sm:py-5"
      >
        <span className="flex items-center gap-3 font-heading text-base font-semibold text-text-primary sm:text-lg">
          {icon}
          {title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="shrink-0 text-text-secondary"
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 text-sm leading-relaxed text-text-secondary sm:px-6 sm:pb-6 sm:text-base">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
