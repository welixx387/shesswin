"use client";

import { useEffect, useState } from "react";
import { Board } from "./Board";
import { replayToIndex } from "@/lib/chess-utils";
import { buildSquareStyles } from "@/lib/board-styles";

type AutoplayBoardProps = {
  moves: string[];
  intervalMs?: number;
  pauseAtEndMs?: number;
  className?: string;
  orientation?: "white" | "black";
};

export function AutoplayBoard({
  moves,
  intervalMs = 800,
  pauseAtEndMs = 1800,
  className,
  orientation = "white",
}: AutoplayBoardProps) {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    if (mq.matches) setIndex(moves.length);
  }, [moves.length]);

  useEffect(() => {
    if (reducedMotion) return;
    const delay = index >= moves.length ? pauseAtEndMs : intervalMs;
    const t = setTimeout(() => {
      setIndex((prev) => (prev >= moves.length ? 0 : prev + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [index, moves.length, intervalMs, pauseAtEndMs, reducedMotion]);

  const replay = replayToIndex(moves, index);
  const styles = buildSquareStyles({ replay });

  return (
    <Board
      fen={replay.fen}
      orientation={orientation}
      interactive={false}
      customSquareStyles={styles}
      animationDurationMs={Math.round(intervalMs * 0.7)}
      className={className}
    />
  );
}
