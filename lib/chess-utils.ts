import { Chess, type Square } from "chess.js";

export type ReplayState = {
  fen: string;
  lastMove: { from: Square; to: Square } | null;
  isCheck: boolean;
  checkSquare: Square | null;
  isCheckmate: boolean;
  isGameOver: boolean;
  turn: "w" | "b";
};

function checkInfo(chess: Chess) {
  const isCheck = chess.isCheck();
  let checkSquare: Square | null = null;
  if (isCheck) {
    for (const row of chess.board()) {
      for (const cell of row) {
        if (cell && cell.type === "k" && cell.color === chess.turn()) {
          checkSquare = cell.square as Square;
        }
      }
    }
  }
  return { isCheck, checkSquare };
}

export function replayToIndex(moves: string[], index: number): ReplayState {
  const chess = new Chess();
  const clamped = Math.max(0, Math.min(index, moves.length));
  let lastMove: { from: Square; to: Square } | null = null;

  for (let i = 0; i < clamped; i++) {
    const move = chess.move(moves[i]);
    if (move) lastMove = { from: move.from as Square, to: move.to as Square };
  }

  const { isCheck, checkSquare } = checkInfo(chess);

  return {
    fen: chess.fen(),
    lastMove,
    isCheck,
    checkSquare,
    isCheckmate: chess.isCheckmate(),
    isGameOver: chess.isGameOver(),
    turn: chess.turn(),
  };
}

export function stateFromFen(fen: string, lastMove: { from: Square; to: Square } | null = null): ReplayState {
  const chess = new Chess(fen);
  const { isCheck, checkSquare } = checkInfo(chess);
  return {
    fen: chess.fen(),
    lastMove,
    isCheck,
    checkSquare,
    isCheckmate: chess.isCheckmate(),
    isGameOver: chess.isGameOver(),
    turn: chess.turn(),
  };
}

export function legalTargetsFrom(fen: string, square: Square) {
  const chess = new Chess(fen);
  return chess.moves({ square, verbose: true }).map((m) => ({
    to: m.to as Square,
    isCapture: m.flags.includes("c") || m.flags.includes("e"),
  }));
}

export function tryMove(fen: string, from: Square, to: Square) {
  const chess = new Chess(fen);
  try {
    const move = chess.move({ from, to, promotion: "q" });
    if (!move) return null;
    return { san: move.san, fen: chess.fen(), from: move.from as Square, to: move.to as Square };
  } catch {
    return null;
  }
}

export function pieceColorAt(fen: string, square: Square): "w" | "b" | null {
  const chess = new Chess(fen);
  const piece = chess.get(square);
  return piece ? piece.color : null;
}
