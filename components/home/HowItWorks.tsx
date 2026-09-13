"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, Puzzle, Trophy } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    title: "Изучи теорию",
    description: "Разбери идеи, ключевые варианты и типичные ошибки дебюта.",
    Icon: BookOpen,
  },
  {
    title: "Пройди практику",
    description: "Проиграй партию на интерактивной доске и закрепи ходы.",
    Icon: Puzzle,
  },
  {
    title: "Примени в партии",
    description: "Используй дебют в своих играх и получай XP за прогресс.",
    Icon: Trophy,
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.5"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="mb-16 text-center">
        <h2 className="font-heading text-3xl font-extrabold text-text-primary sm:text-4xl">Как это работает</h2>
      </Reveal>

      <div ref={ref} className="relative grid gap-10 sm:grid-cols-3 sm:gap-6">
        <div className="absolute left-[16.6%] right-[16.6%] top-7 hidden h-px bg-border-subtle sm:block">
          <motion.div className="h-full origin-left bg-gradient-brand" style={{ scaleX }} />
        </div>

        {STEPS.map((step, i) => (
          <Reveal
            key={step.title}
            delay={i * 0.15}
            className="relative flex flex-col items-center text-center sm:items-start sm:text-left"
          >
            <div className="glass relative z-10 mb-5 grid h-14 w-14 place-items-center rounded-2xl text-accent-glow">
              <step.Icon size={24} />
            </div>
            <span className="mb-1 font-mono text-xs text-accent-glow">Шаг {i + 1}</span>
            <h3 className="mb-2 font-heading text-lg font-bold text-text-primary">{step.title}</h3>
            <p className="text-sm text-text-secondary">{step.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
