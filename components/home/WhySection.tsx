"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { KNIGHT_PATHS } from "@/lib/knight-paths";

function InteractiveIcon({ hovered }: { hovered: boolean }) {
  return (
    <motion.svg
      width={32}
      height={32}
      viewBox="0 0 24 24"
      fill="none"
      animate={{ y: hovered ? -4 : 0, rotate: hovered ? -10 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {KNIGHT_PATHS.map((d) => (
        <path key={d} d={d} stroke="#6366F1" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </motion.svg>
  );
}

function ClearIcon({ hovered }: { hovered: boolean }) {
  return (
    <motion.div
      animate={{ rotateY: hovered ? 25 : 0, scale: hovered ? 1.08 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <BookOpen size={32} className="text-accent-glow" strokeWidth={1.8} />
    </motion.div>
  );
}

function ProgressIcon({ hovered }: { hovered: boolean }) {
  const bars = [0.45, 0.7, 1];
  return (
    <div className="flex h-8 items-end gap-1.5">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-2.5 rounded-full bg-accent-success"
          style={{ height: "100%", originY: 1 }}
          animate={{ scaleY: hovered ? h : h * 0.45 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: hovered ? i * 0.08 : 0 }}
        />
      ))}
    </div>
  );
}

const CARDS = [
  {
    title: "Интерактивно",
    description: "Доска реагирует на каждый ваш ход — пробуйте варианты прямо в теории, без риска.",
    Icon: InteractiveIcon,
  },
  {
    title: "Понятно",
    description: "Идеи, а не зубрёжка: разбираем логику дебюта простым языком с примерами.",
    Icon: ClearIcon,
  },
  {
    title: "С прогрессом",
    description: "XP, отметки изучения и рейтинг помогают видеть, как растёт ваш уровень.",
    Icon: ProgressIcon,
  },
];

function WhyCard({ card, index }: { card: (typeof CARDS)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = card.Icon;

  return (
    <Reveal delay={index * 0.1}>
      <GlassCard
        className="flex h-full flex-col gap-4 p-7"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="grid h-14 w-14 place-items-center rounded-2xl border border-border-subtle bg-white/[0.04]">
          <Icon hovered={hovered} />
        </div>
        <h3 className="font-heading text-xl font-bold text-text-primary">{card.title}</h3>
        <p className="text-sm leading-relaxed text-text-secondary">{card.description}</p>
      </GlassCard>
    </Reveal>
  );
}

export function WhySection() {
  return (
    <section id="why" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="mb-12 text-center">
        <h2 className="font-heading text-3xl font-extrabold text-text-primary sm:text-4xl">Почему ShessWin</h2>
      </Reveal>
      <div className="grid gap-6 sm:grid-cols-3">
        {CARDS.map((card, i) => (
          <WhyCard key={card.title} card={card} index={i} />
        ))}
      </div>
    </section>
  );
}
