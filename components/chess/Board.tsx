"use client";

import { useId } from "react";
import { Chessboard } from "react-chessboard";
import type { BoardOrientation, CustomSquareStyles, Square } from "react-chessboard/dist/chessboard/types";
import { useElementWidth } from "@/lib/useElementWidth";
import { cn } from "@/lib/utils";

type BoardProps = {
  fen: string;
  orientation?: BoardOrientation;
  interactive?: boolean;
  onPieceDrop?: (source: Square, target: Square, piece: string) => boolean;
  onSquareClick?: (square: Square) => void;
  customSquareStyles?: CustomSquareStyles;
  animationDurationMs?: number;
  className?: string;
  id?: string;
};

export function Board({
  fen,
  orientation = "white",
  interactive = false,
  onPieceDrop,
  onSquareClick,
  customSquareStyles,
  animationDurationMs = 300,
  className,
  id,
}: BoardProps) {
  const autoId = useId();
  const boardId = id ?? autoId;
  const { ref, width } = useElementWidth<HTMLDivElement>(400);

  return (
    <div
      className={cn(
        "glass gradient-border-mask relative aspect-square w-full max-w-[560px] rounded-2xl p-2.5 shadow-glass sm:p-4",
        className
      )}
    >
      <div ref={ref} className="h-full w-full overflow-hidden rounded-xl">
        <Chessboard
          id={boardId}
          position={fen}
          boardOrientation={orientation}
          boardWidth={width || 320}
          arePiecesDraggable={interactive}
          areArrowsAllowed={interactive}
          animationDuration={animationDurationMs}
          customSquareStyles={customSquareStyles}
          onPieceDrop={
            interactive && onPieceDrop
              ? (source, target, piece) => onPieceDrop(source, target, piece)
              : undefined
          }
          onSquareClick={interactive && onSquareClick ? (sq) => onSquareClick(sq) : undefined}
          customBoardStyle={{ borderRadius: "10px" }}
          customLightSquareStyle={{ backgroundColor: "#EBECD0" }}
          customDarkSquareStyle={{ backgroundColor: "#739552" }}
          customDropSquareStyle={{ boxShadow: "inset 0 0 1px 4px rgba(129,140,248,0.75)" }}
          showBoardNotation
        />
      </div>
    </div>
  );
}
