"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, Crown, Puzzle, ScrollText, Sparkles, Swords, Target } from "lucide-react";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { OpeningExplorer } from "@/components/chess/OpeningExplorer";
import { PuzzlePractice } from "@/components/chess/PuzzlePractice";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { XpToast } from "@/components/ui/XpToast";
import { accentClasses } from "@/lib/accent";
import { fireConfetti } from "@/lib/confetti";
import { useProgressStore } from "@/lib/store";
import type { Opening } from "@/types/opening";

export function OpeningDetailClient({ opening }: { opening: Opening }) {
  const accent = accentClasses[opening.accent];

  const [lineMoves, setLineMoves] = useState(opening.moves);
  const [lineLabel, setLineLabel] = useState(opening.name);
  const [moveIndex, setMoveIndex] = useState(opening.moves.length);
  const [isCustomLine, setIsCustomLine] = useState(false);
  const [orientation, setOrientation] = useState<"white" | "black">("white");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHints, setShowHints] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const isCompleted = useProgressStore((s) => s.isCompleted(opening.slug));
  const markCompleted = useProgressStore((s) => s.markCompleted);

  function loadLine(moves: string[], label: string) {
    setLineMoves(moves);
    setLineLabel(label);
    setMoveIndex(moves.length);
    setIsCustomLine(false);
    setIsPlaying(false);
  }

  function handleCustomMove(san: string) {
    setLineMoves((prev) => {
      const truncated = prev.slice(0, moveIndex);
      return [...truncated, san];
    });
    setLineLabel("Ваш вариант");
    setIsCustomLine(true);
    setMoveIndex((i) => i + 1);
    setIsPlaying(false);
  }

  function handleResetToTheory() {
    loadLine(opening.moves, opening.name);
  }

  function handleSeek(index: number) {
    setIsPlaying(false);
    setMoveIndex(Math.max(0, Math.min(index, lineMoves.length)));
  }

  useEffect(() => {
    if (!isPlaying) return;
    if (moveIndex >= lineMoves.length) {
      setIsPlaying(false);
      return;
    }
    const t = setTimeout(() => setMoveIndex((i) => Math.min(i + 1, lineMoves.length)), 600);
    return () => clearTimeout(t);
  }, [isPlaying, moveIndex, lineMoves.length]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (e.key === "ArrowLeft") {
        setIsPlaying(false);
        setMoveIndex((i) => Math.max(0, i - 1));
      }
      if (e.key === "ArrowRight") {
        setIsPlaying(false);
        setMoveIndex((i) => Math.min(lineMoves.length, i + 1));
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lineMoves.length]);

  function handleMarkComplete() {
    if (isCompleted) return;
    markCompleted(opening.slug, 50);
    fireConfetti();
    setShowToast(true);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-text-secondary">
        <Link href="/" className="link-underline transition-colors hover:text-text-primary">
          ShessWin
        </Link>
        <ChevronRight size={14} />
        <Link href="/debuts" className="link-underline transition-colors hover:text-text-primary">
          Дебюты
        </Link>
        <ChevronRight size={14} />
        <span className="text-text-primary">{opening.name}</span>
      </nav>

      <Reveal className="mb-10 max-w-3xl">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${accent.border} ${accent.bg} ${accent.text}`}
          >
            {opening.level}
          </span>
          <span className="rounded-full border border-border-subtle px-3 py-1 font-mono text-xs text-text-secondary">
            ECO {opening.eco}
          </span>
          <span
            className="rounded-full border border-border-subtle px-3 py-1 text-xs text-text-secondary"
            title="Ориентировочный рейтинг, на котором этот дебют даёт наибольшую пользу"
          >
            ~{opening.eloRange}
          </span>
          {isCompleted && (
            <span className="rounded-full border border-accent-success/40 bg-accent-success/15 px-3 py-1 text-xs font-semibold text-accent-success">
              ✓ Изучено
            </span>
          )}
        </div>
        <h1 className="font-heading text-4xl font-extrabold text-text-primary sm:text-5xl">{opening.name}</h1>
        <p className="mt-2 text-lg text-text-secondary">{opening.tagline}</p>
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-12">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <OpeningExplorer
            lineMoves={lineMoves}
            lineLabel={lineLabel}
            moveIndex={moveIndex}
            orientation={orientation}
            isPlaying={isPlaying}
            showHints={showHints}
            isCustomLine={isCustomLine}
            onSeek={handleSeek}
            onPrev={() => handleSeek(moveIndex - 1)}
            onNext={() => handleSeek(moveIndex + 1)}
            onTogglePlay={() => setIsPlaying((p) => !p)}
            onFlip={() => setOrientation((o) => (o === "white" ? "black" : "white"))}
            onToggleHints={() => setShowHints((h) => !h)}
            onResetToTheory={handleResetToTheory}
            onCustomMove={handleCustomMove}
          />
        </div>

        <div className="min-w-0">
          <Reveal>
            <Accordion defaultOpen="intro" className="mb-8">
              <AccordionItem id="intro" title="Введение" icon={<BookOpen size={18} className={accent.text} />}>
                <div className="flex flex-col gap-4">
                  <p>{opening.intro}</p>
                  <div>
                    <h4 className="mb-1 flex items-center gap-1.5 font-heading text-xs font-semibold uppercase tracking-wider text-text-secondary/70">
                      <ScrollText size={14} /> История
                    </h4>
                    <p>{opening.history}</p>
                  </div>
                  <div>
                    <h4 className="mb-1 font-heading text-xs font-semibold uppercase tracking-wider text-text-secondary/70">
                      Пешечная структура
                    </h4>
                    <p>{opening.pawnStructure}</p>
                  </div>
                </div>
              </AccordionItem>

              <AccordionItem title="Идеи за белых" icon={<Crown size={18} className={accent.text} />}>
                <ul className="flex flex-col gap-2.5">
                  {opening.ideasWhite.map((idea) => (
                    <li key={idea} className="flex gap-2.5">
                      <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${accent.solidBg}`} />
                      {idea}
                    </li>
                  ))}
                </ul>
              </AccordionItem>

              <AccordionItem title="Идеи за чёрных" icon={<Crown size={18} className="rotate-180 text-text-secondary" />}>
                <ul className="flex flex-col gap-2.5">
                  {opening.ideasBlack.map((idea) => (
                    <li key={idea} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-text-secondary" />
                      {idea}
                    </li>
                  ))}
                </ul>
              </AccordionItem>

              <AccordionItem title="Ключевые варианты" icon={<Swords size={18} className={accent.text} />}>
                <div className="flex flex-col gap-4">
                  {opening.keyLines.map((line) => (
                    <div
                      key={line.name}
                      className="rounded-xl border border-border-subtle bg-white/[0.02] p-4 transition-colors hover:border-accent-glow/30"
                    >
                      <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-heading text-sm font-semibold text-text-primary">{line.name}</h4>
                        <button
                          type="button"
                          onClick={() => loadLine(line.moves, line.name)}
                          className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-all hover:-translate-y-0.5 ${accent.border} ${accent.text}`}
                        >
                          Показать на доске
                        </button>
                      </div>
                      <p className="mb-2 font-mono text-xs text-text-secondary/80">{line.moves.join(" ")}</p>
                      <p className="text-sm text-text-secondary">{line.note}</p>
                    </div>
                  ))}
                </div>
              </AccordionItem>

              <AccordionItem title="Типичные ошибки" icon={<Target size={18} className="text-accent-gold" />}>
                <ul className="flex flex-col gap-4">
                  {opening.mistakes.map((mistake) => (
                    <li key={mistake.title}>
                      <p className="font-medium text-text-primary">{mistake.title}</p>
                      <p className="mt-0.5 text-text-secondary">{mistake.explanation}</p>
                    </li>
                  ))}
                </ul>
              </AccordionItem>

              <AccordionItem title="Примерная партия" icon={<Sparkles size={18} className={accent.text} />}>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-heading font-semibold text-text-primary">
                        {opening.sampleGame.white} — {opening.sampleGame.black}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {opening.sampleGame.event}, {opening.sampleGame.year}
                      </p>
                    </div>
                    <span className="rounded-full border border-border-subtle px-2.5 py-1 font-mono text-xs text-text-secondary">
                      {opening.sampleGame.result}
                    </span>
                  </div>
                  <p>{opening.sampleGame.note}</p>
                  <button
                    type="button"
                    onClick={() =>
                      loadLine(
                        opening.sampleGame.moves,
                        `${opening.sampleGame.white} — ${opening.sampleGame.black}, ${opening.sampleGame.year}`
                      )
                    }
                    className={`w-fit rounded-full border px-4 py-2 text-xs font-medium transition-all hover:-translate-y-0.5 ${accent.border} ${accent.text}`}
                  >
                    Проиграть партию на доске
                  </button>
                </div>
              </AccordionItem>

              <AccordionItem title="Задачи для практики" icon={<Puzzle size={18} className={accent.text} />}>
                <PuzzlePractice puzzles={opening.puzzles} accent={opening.accent} />
              </AccordionItem>
            </Accordion>
          </Reveal>

          <Reveal delay={0.1}>
            <motion.div className="glass gradient-border-mask flex flex-col items-center gap-3 rounded-2xl p-6 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <p className="font-heading text-lg font-semibold text-text-primary">
                  {isCompleted ? "Дебют уже изучен" : "Готовы закрепить материал?"}
                </p>
                <p className="text-sm text-text-secondary">
                  {isCompleted ? "Вы получили +50 XP за этот дебют." : "Отметьте дебют изученным и получите +50 XP."}
                </p>
              </div>
              <Button
                variant={isCompleted ? "ghost" : "primary"}
                size="lg"
                onClick={handleMarkComplete}
                disabled={isCompleted}
              >
                {isCompleted ? "✓ Изучено" : "Отметить как изучено"}
              </Button>
            </motion.div>
          </Reveal>
        </div>
      </div>

      <XpToast visible={showToast} xp={50} onDone={() => setShowToast(false)} />
    </div>
  );
}
