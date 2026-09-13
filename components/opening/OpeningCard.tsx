"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { AutoplayBoard } from "@/components/chess/AutoplayBoard";
import { accentClasses } from "@/lib/accent";
import { useProgressStore } from "@/lib/store";
import type { Opening } from "@/types/opening";

export function OpeningCard({ opening, index = 0 }: { opening: Opening; index?: number }) {
  const accent = accentClasses[opening.accent];
  const isCompleted = useProgressStore((s) => s.isCompleted(opening.slug));

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{
        opacity: { duration: 0.5, delay: index * 0.1 },
        y: { type: "spring", stiffness: 300, damping: 22 },
        scale: { type: "spring", stiffness: 300, damping: 22 },
      }}
      className="group h-full"
    >
      <Link href={`/debuts/${opening.slug}`} className="block h-full">
        <GlassCard className={`flex h-full flex-col overflow-hidden p-4 transition-shadow duration-300 ${accent.glow}`}>
          <div className="pointer-events-none relative mb-4 overflow-hidden rounded-xl">
            <AutoplayBoard moves={opening.heroMoves} intervalMs={900} className="max-w-none" />
            {isCompleted && (
              <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-bg-primary/80 px-2 py-1 text-xs font-semibold text-accent-success backdrop-blur">
                <CheckCircle2 size={14} />
                Изучено
              </span>
            )}
          </div>

          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${accent.border} ${accent.bg} ${accent.text}`}>
              {opening.level}
            </span>
            <span className="rounded-full border border-border-subtle px-2.5 py-0.5 font-mono text-[11px] text-text-secondary">
              {opening.eco}
            </span>
          </div>

          <h3 className="font-heading text-xl font-bold text-text-primary">{opening.name}</h3>
          <p className="mb-4 mt-1 line-clamp-2 flex-1 text-sm text-text-secondary">{opening.tagline}</p>

          <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className={`h-full rounded-full ${accent.solidBg} transition-all duration-700`}
              style={{ width: isCompleted ? "100%" : "6%" }}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-text-primary">Изучать</span>
            <span className={`transition-transform duration-300 group-hover:translate-x-1.5 ${accent.text}`}>
              <ArrowRight size={18} />
            </span>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}
