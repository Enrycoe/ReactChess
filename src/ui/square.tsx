import type { Piece } from "../entities/piece";

export default function Square({ piece, isBlack, isHighlighted, onSquareClick }: { piece: Piece | null; isBlack: boolean; isHighlighted: boolean; onSquareClick: () => void }) {
  const colorClassName = isBlack ? "black" : "white";
  const pieceClassName = piece ? (piece.color === "white" ? "white-piece" : "black-piece") : "";
  const highlightedClassName = isHighlighted ? "highlighted" : "";
  return (
    <button className={`square ${colorClassName} ${pieceClassName} ${highlightedClassName}`} onClick={onSquareClick}>
      {piece?.icon}
    </button>
  )
}