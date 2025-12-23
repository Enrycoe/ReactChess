import type { Piece } from "./piece";

export class Knight implements Piece {
  id: string;
  icon: "N";
  color: "black" | "white";
  currentPosition: [number, number];
  constructor(id: string, color: "black" | "white", currentPosition: [number, number]) {
    this.id = id;
    this.icon = "N";
    this.color = color;
    this.currentPosition = currentPosition;
  }

  getAvaiableMoves(squares: Piece[][]): [number, number][] {
    const moves: [number, number][] = [];
    const knightMoves = [
      [2, 1], [2, -1], [-2, 1], [-2, -1],
      [1, 2], [1, -2], [-1, 2], [-1, -2]
    ];
    for (const [dx, dy] of knightMoves) {
      const x = this.currentPosition[0] + dx;
      const y = this.currentPosition[1] + dy;
      if (x >= 0 && x < 8 && y >= 0 && y < 8) {
        if (squares[x][y] === null || squares[x][y]?.color !== this.color) {
          moves.push([x, y]);
        }
      }
    }
    return moves;
  }
}