"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

type XpToastProps = {
  visible: boolean;
  xp: number;
  label?: string;
  onDone: () => void;
};

export function XpToast({ visible, xp, label = "Дебют изучен!", onDone }: XpToastProps) {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(onDone, 3600);
    return () => clearTimeout(t);
  }, [visible, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="glass-strong fixed bottom-6 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-3 rounded-2xl px-5 py-4 shadow-glow-success sm:bottom-8 sm:left-auto sm:right-8 sm:translate-x-0"
          role="status"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-success/15 text-accent-success">
            <motion.svg width={22} height={22} viewBox="0 0 24 24" fill="none">
              <motion.path
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              />
            </motion.svg>
          </span>
          <div className="pr-2">
            <p className="text-sm font-medium text-text-primary">{label}</p>
            <p className="text-xs text-text-secondary">Продолжай в том же духе</p>
          </div>
          <motion.span
            initial={{ scale: 0, rotate: -8 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 15 }}
            className="ml-1 flex items-center gap-1 rounded-full bg-accent-gold/15 px-3 py-1 text-sm font-bold text-accent-gold shadow-glow-gold"
          >
            <Sparkles size={14} />+{xp} XP
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
