"use client";

import { cn } from "@/lib/utils";

type MoveListProps = {
  moves: string[];
  moveIndex: number;
  onSeek: (index: number) => void;
};

export function MoveList({ moves, moveIndex, onSeek }: MoveListProps) {
  const pairs: { num: number; white?: string; whiteIdx: number; black?: string; blackIdx?: number }[] = [];
  for (let i = 0; i < moves.length; i += 2) {
    pairs.push({
      num: i / 2 + 1,
      white: moves[i],
      whiteIdx: i + 1,
      black: moves[i + 1],
      blackIdx: moves[i + 1] ? i + 2 : undefined,
    });
  }

  if (moves.length === 0) {
    return <p className="text-sm text-text-secondary">Начальная позиция.</p>;
  }

  return (
    <div className="flex flex-wrap items-center gap-x-1 gap-y-1.5 font-mono text-sm">
      {pairs.map((p) => (
        <span key={p.num} className="flex items-center gap-1">
          <span className="text-text-secondary/50">{p.num}.</span>
          <button
            type="button"
            onClick={() => onSeek(p.whiteIdx)}
            className={cn(
              "rounded px-1.5 py-0.5 transition-colors hover:bg-white/10",
              moveIndex === p.whiteIdx ? "bg-accent-primary/25 text-accent-glow" : "text-text-primary"
            )}
          >
            {p.white}
          </button>
          {p.black && (
            <button
              type="button"
              onClick={() => onSeek(p.blackIdx!)}
              className={cn(
                "rounded px-1.5 py-0.5 transition-colors hover:bg-white/10",
                moveIndex === p.blackIdx ? "bg-accent-primary/25 text-accent-glow" : "text-text-primary"
              )}
            >
              {p.black}
            </button>
          )}
        </span>
      ))}
    </div>
  );
}
