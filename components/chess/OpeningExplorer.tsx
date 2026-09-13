"use client";

import { useState } from "react";
import type { Square } from "react-chessboard/dist/chessboard/types";
import { Board } from "./Board";
import { BoardControls } from "./BoardControls";
import { MoveList } from "./MoveList";
import { legalTargetsFrom, pieceColorAt, replayToIndex, tryMove } from "@/lib/chess-utils";
import { buildSquareStyles } from "@/lib/board-styles";

type OpeningExplorerProps = {
  lineMoves: string[];
  lineLabel: string;
  moveIndex: number;
  orientation: "white" | "black";
  isPlaying: boolean;
  showHints: boolean;
  isCustomLine: boolean;
  onSeek: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
  onFlip: () => void;
  onToggleHints: () => void;
  onResetToTheory: () => void;
  onCustomMove: (san: string) => void;
};

export function OpeningExplorer({
  lineMoves,
  lineLabel,
  moveIndex,
  orientation,
  isPlaying,
  showHints,
  isCustomLine,
  onSeek,
  onPrev,
  onNext,
  onTogglePlay,
  onFlip,
  onToggleHints,
  onResetToTheory,
  onCustomMove,
}: OpeningExplorerProps) {
  const [selected, setSelected] = useState<Square | null>(null);
  const replay = replayToIndex(lineMoves, moveIndex);
  const legalTargets = selected ? legalTargetsFrom(replay.fen, selected) : [];

  const styles = buildSquareStyles({
    replay,
    selectedSquare: selected,
    legalTargets,
    showHints,
  });

  function attemptMove(from: Square, to: Square) {
    const result = tryMove(replay.fen, from, to);
    if (!result) return false;
    onCustomMove(result.san);
    setSelected(null);
    return true;
  }

  function handleSquareClick(square: Square) {
    if (selected) {
      if (selected === square) {
        setSelected(null);
        return;
      }
      if (attemptMove(selected, square)) return;
    }
    const color = pieceColorAt(replay.fen, square);
    setSelected(color === replay.turn ? square : null);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full max-w-[560px] items-center justify-between gap-2">
        <span className="truncate text-sm font-medium text-text-secondary">{lineLabel}</span>
        {replay.isCheckmate && (
          <span className="shrink-0 rounded-full bg-accent-gold/15 px-2.5 py-0.5 text-xs font-semibold text-accent-gold">
            Мат
          </span>
        )}
      </div>

      <Board
        fen={replay.fen}
        orientation={orientation}
        interactive
        onPieceDrop={(from, to) => attemptMove(from, to)}
        onSquareClick={handleSquareClick}
        customSquareStyles={styles}
      />

      <div className="w-full max-w-[560px]">
        <BoardControls
          moveIndex={moveIndex}
          totalMoves={lineMoves.length}
          isPlaying={isPlaying}
          showHints={showHints}
          isCustomLine={isCustomLine}
          onPrev={onPrev}
          onNext={onNext}
          onSeek={onSeek}
          onTogglePlay={onTogglePlay}
          onFlip={onFlip}
          onToggleHints={onToggleHints}
          onResetToTheory={onResetToTheory}
        />
      </div>

      <div className="w-full max-w-[560px] rounded-2xl border border-border-subtle bg-white/[0.02] p-4">
        <MoveList moves={lineMoves} moveIndex={moveIndex} onSeek={onSeek} />
      </div>
    </div>
  );
}
