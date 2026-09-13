"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Lightbulb, RotateCcw, X } from "lucide-react";
import { Board } from "./Board";
import { legalTargetsFrom, pieceColorAt, replayToIndex, stateFromFen, tryMove } from "@/lib/chess-utils";
import { buildSquareStyles } from "@/lib/board-styles";
import { accentClasses } from "@/lib/accent";
import type { Square } from "react-chessboard/dist/chessboard/types";
import type { AccentColor, Puzzle } from "@/types/opening";

type Status = "idle" | "correct" | "incorrect";

function PuzzleCard({ puzzle, index, accent }: { puzzle: Puzzle; index: number; accent: AccentColor }) {
  const accentCls = accentClasses[accent];
  const startFen = replayToIndex(puzzle.fromMoves, puzzle.fromMoves.length).fen;

  const [fen, setFen] = useState(startFen);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [selected, setSelected] = useState<Square | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [showSolution, setShowSolution] = useState(false);

  const replay = stateFromFen(fen, lastMove);
  const legalTargets = selected ? legalTargetsFrom(fen, selected) : [];
  const styles = buildSquareStyles({ replay, selectedSquare: selected, legalTargets });

  function reset() {
    setFen(startFen);
    setLastMove(null);
    setSelected(null);
    setStatus("idle");
  }

  function attempt(from: Square, to: Square) {
    if (status === "correct") return false;
    const result = tryMove(fen, from, to);
    if (!result) return false;
    setSelected(null);
    if (result.san === puzzle.solution) {
      setFen(result.fen);
      setLastMove({ from: result.from, to: result.to });
      setStatus("correct");
    } else {
      setStatus("incorrect");
      setTimeout(reset, 700);
    }
    return true;
  }

  function handleSquareClick(square: Square) {
    if (status === "correct") return;
    if (selected) {
      if (selected === square) {
        setSelected(null);
        return;
      }
      if (attempt(selected, square)) return;
    }
    const color = pieceColorAt(fen, square);
    setSelected(color === replay.turn ? square : null);
  }

  return (
    <div className="glass rounded-2xl p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-text-primary">
          Задача {index + 1}. {puzzle.prompt}
        </p>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${accentCls.border} ${accentCls.text}`}
        >
          {replay.turn === "w" ? "Ход белых" : "Ход чёрных"}
        </span>
      </div>

      <div className="mx-auto max-w-[360px]">
        <Board
          fen={fen}
          interactive={status !== "correct"}
          onPieceDrop={(from, to) => attempt(from, to)}
          onSquareClick={handleSquareClick}
          customSquareStyles={styles}
          className="max-w-none"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <AnimatePresence mode="wait">
          {status === "correct" && (
            <motion.span
              key="correct"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1.5 text-sm font-semibold text-accent-success"
            >
              <Check size={16} /> Верно! {puzzle.solution}
            </motion.span>
          )}
          {status === "incorrect" && (
            <motion.span
              key="incorrect"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1.5 text-sm font-semibold text-red-400"
            >
              <X size={16} /> Не тот ход — попробуйте ещё раз
            </motion.span>
          )}
          {status === "idle" && <span className="text-sm text-text-secondary">Сделайте ход на доске</span>}
        </AnimatePresence>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={reset}
            className="grid h-9 w-9 place-items-center rounded-full border border-border-subtle text-text-secondary transition-colors hover:text-text-primary"
            aria-label="Начать заново"
          >
            <RotateCcw size={15} />
          </button>
          <button
            type="button"
            onClick={() => setShowSolution((v) => !v)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${accentCls.border} ${accentCls.text}`}
          >
            <Lightbulb size={14} /> {showSolution ? "Скрыть решение" : "Показать решение"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {(showSolution || status === "correct") && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden text-sm leading-relaxed text-text-secondary"
          >
            <span className="font-mono font-semibold text-text-primary">{puzzle.solution}</span> —{" "}
            {puzzle.explanation}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PuzzlePractice({ puzzles, accent }: { puzzles: Puzzle[]; accent: AccentColor }) {
  return (
    <div className="flex flex-col gap-5">
      {puzzles.map((p, i) => (
        <PuzzleCard key={i} puzzle={p} index={i} accent={accent} />
      ))}
    </div>
  );
}
