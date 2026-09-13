import type { CustomSquareStyles, Square } from "react-chessboard/dist/chessboard/types";
import type { ReplayState } from "./chess-utils";

type BuildStylesArgs = {
  replay: ReplayState;
  selectedSquare?: Square | null;
  legalTargets?: { to: Square; isCapture: boolean }[];
  showHints?: boolean;
};

export function buildSquareStyles({
  replay,
  selectedSquare,
  legalTargets = [],
  showHints = true,
}: BuildStylesArgs): CustomSquareStyles {
  const styles: CustomSquareStyles = {};

  if (replay.lastMove && showHints) {
    const lastMoveStyle = {
      backgroundColor: "rgba(255, 213, 79, 0.35)",
      transition: "background-color 0.4s ease",
    };
    styles[replay.lastMove.from] = { ...(styles[replay.lastMove.from] ?? {}), ...lastMoveStyle };
    styles[replay.lastMove.to] = { ...(styles[replay.lastMove.to] ?? {}), ...lastMoveStyle };
  }

  if (replay.isCheck && replay.checkSquare) {
    styles[replay.checkSquare] = {
      ...(styles[replay.checkSquare] ?? {}),
      animation: "check-pulse-glow 1.2s ease-in-out infinite, check-shake 0.5s ease-in-out 2",
      borderRadius: "6px",
    };
  }

  for (const target of legalTargets) {
    styles[target.to] = {
      ...(styles[target.to] ?? {}),
      backgroundImage: target.isCapture
        ? "radial-gradient(circle, transparent 58%, rgba(99,102,241,0.65) 60%, rgba(99,102,241,0.65) 68%, transparent 70%)"
        : "radial-gradient(circle, rgba(99,102,241,0.55) 0, rgba(99,102,241,0.55) 20%, transparent 22%)",
      animation: "dot-pulse 1.5s ease-in-out infinite",
      cursor: "pointer",
    };
  }

  if (selectedSquare) {
    styles[selectedSquare] = {
      ...(styles[selectedSquare] ?? {}),
      boxShadow: "inset 0 0 0 3px rgba(129,140,248,0.85)",
    };
  }

  return styles;
}
