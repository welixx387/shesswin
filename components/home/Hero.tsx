"use client";

import { MouseEvent, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { AutoplayBoard } from "@/components/chess/AutoplayBoard";
import { openings } from "@/data/openings";

const HEADING = "Освой шахматные дебюты — как гроссмейстер";

function AnimatedHeading() {
  const words = HEADING.split(" ");
  let globalIndex = 0;

  return (
    <h1 className="font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
      {words.map((word, wi) => (
        <span key={wi} className="inline-block">
          {word.split("").map((char) => {
            const i = globalIndex++;
            return (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.04, ease: [0.4, 0, 0.2, 1] }}
              >
                {char}
              </motion.span>
            );
          })}
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h1>
  );
}

function TiltBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 150, damping: 20 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateYRaw.set(px * 14);
    rotateXRaw.set(py * -14);
  }

  function handleMouseLeave() {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className="w-full"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="mx-auto w-full max-w-[480px]"
      >
        <AutoplayBoard moves={openings[0].moves} intervalMs={800} className="max-w-none shadow-glow-primary-lg" />
      </motion.div>
    </div>
  );
}

export function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(500px circle at ${x}px ${y}px, rgba(99,102,241,0.18), transparent 70%)`;

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-28 lg:pt-40"
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-text-secondary"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-success" />
            Новая платформа для изучения дебютов
          </motion.span>

          <AnimatedHeading />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="mt-6 max-w-lg text-lg text-text-secondary"
          >
            ShessWin превращает теорию в живой опыт: интерактивные доски, разбор партий и система
            прогресса — всё в одном месте.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.65 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button href="/debuts" size="lg" pulse>
              Начать обучение
            </Button>
            <Button href="#openings" variant="ghost" size="lg" icon={<Play size={16} />}>
              Смотреть демо
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.9 }}
            className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4"
          >
            <div>
              <div className="font-heading text-2xl font-bold text-text-primary">
                <CountUp value={1200} suffix="+" />
              </div>
              <div className="text-sm text-text-secondary">учеников</div>
            </div>
            <div>
              <div className="font-heading text-2xl font-bold text-text-primary">
                <CountUp value={openings.length} />
              </div>
              <div className="text-sm text-text-secondary">дебютов</div>
            </div>
          </motion.div>
        </div>

        <TiltBoard />
      </div>
    </section>
  );
}
