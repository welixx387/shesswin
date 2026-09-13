"use client";

import { ChevronLeft, ChevronRight, FlipVertical2, Lightbulb, Pause, Play, Undo2 } from "lucide-react";
import { cn } from "@/lib/utils";

type BoardControlsProps = {
  moveIndex: number;
  totalMoves: number;
  isPlaying: boolean;
  showHints: boolean;
  isCustomLine?: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSeek: (index: number) => void;
  onTogglePlay: () => void;
  onFlip: () => void;
  onToggleHints: () => void;
  onResetToTheory?: () => void;
};

function IconButton({
  active,
  disabled,
  onClick,
  label,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        "grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-200",
        active
          ? "border-accent-primary/60 bg-accent-primary/15 text-accent-glow shadow-glow-primary"
          : "border-border-subtle bg-white/[0.03] text-text-secondary hover:border-accent-glow/40 hover:text-text-primary",
        "disabled:opacity-30 disabled:pointer-events-none"
      )}
    >
      {children}
    </button>
  );
}

export function BoardControls({
  moveIndex,
  totalMoves,
  isPlaying,
  showHints,
  isCustomLine,
  onPrev,
  onNext,
  onSeek,
  onTogglePlay,
  onFlip,
  onToggleHints,
  onResetToTheory,
}: BoardControlsProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="w-20 shrink-0 font-mono text-xs text-text-secondary">
          {moveIndex}/{totalMoves}
        </span>
        <input
          type="range"
          min={0}
          max={totalMoves}
          value={moveIndex}
          onChange={(e) => onSeek(Number(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-accent-primary"
          aria-label="Позиция в партии"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <IconButton label="Предыдущий ход" onClick={onPrev} disabled={moveIndex === 0}>
            <ChevronLeft size={18} />
          </IconButton>
          <IconButton label={isPlaying ? "Пауза" : "Проиграть всё"} onClick={onTogglePlay} active={isPlaying}>
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </IconButton>
          <IconButton
            label="Следующий ход"
            onClick={onNext}
            disabled={moveIndex === totalMoves && !isPlaying}
          >
            <ChevronRight size={18} />
          </IconButton>
        </div>

        <div className="flex items-center gap-2">
          {isCustomLine && onResetToTheory && (
            <IconButton label="Вернуться к теории" onClick={onResetToTheory}>
              <Undo2 size={16} />
            </IconButton>
          )}
          <IconButton label="Перевернуть доску" onClick={onFlip}>
            <FlipVertical2 size={16} />
          </IconButton>
          <IconButton label="Показать подсказки" onClick={onToggleHints} active={showHints}>
            <Lightbulb size={16} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
