import type { Piece } from "./piece";

export class Bishop implements Piece {
  id: string;
  icon: "B";
  color: "black" | "white";
  currentPosition: [number, number];
  constructor(id: string, color: "black" | "white", currentPosition: [number, number]) {
    this.id = id;
    this.icon = "B";
    this.color = color;
    this.currentPosition = currentPosition;
  }
  getAvaiableMoves(squares: Piece[][]): [number, number][] {
    const moves: [number, number][] = [];
    const directions = [
      [1, 1],   // down-right
      [1, -1],  // down-left
      [-1, 1],  // up-right
      [-1, -1]  // up-left
    ];

    for (const [dx, dy] of directions) {
      let x = this.currentPosition[0] + dx;
      let y = this.currentPosition[1] + dy;
      while (x >= 0 && x < 8 && y >= 0 && y < 8) {
        if (squares[x][y] === null || squares[x][y]?.color !== this.color) {
          moves.push([x, y]);
        }
        if (squares[x][y] !== null) break;
        x += dx;
        y += dy;
      }
    }
    return moves;
  }
}