import type { Piece } from "./piece";

export class Queen implements Piece {
  id: string;
  icon: "Q"; 
  color: "black" | "white";
  currentPosition: [number, number];
  constructor(id: string, color: "black" | "white", currentPosition: [number, number]) {
    this.id = id;
    this.icon = "Q";
    this.color = color;
    this.currentPosition = currentPosition;
  }
  getAvaiableMoves(squares: Piece[][]): [number, number][] {
    const moves: [number, number][] = [];
    const directions = [
      [1, 0],   // down
      [1, 1],   // down-right
      [0, 1],   // right
      [-1, 1],  // up-right
      [-1, 0],  // up
      [-1, -1], // up-left
      [0, -1],  // left
      [1, -1]   // down-left
    ];
    for (const [dx, dy] of directions) {
      let x = this.currentPosition[0] + dx;
      let y = this.currentPosition[1] + dy;
      while (x >= 0 && x < 8 && y >= 0 && y < 8) {
        if (squares[x][y] === null) {
          moves.push([x, y]);
        } else {
          if (squares[x][y]?.color !== this.color) {
            moves.push([x, y]);
          }
        }
        x += dx;
        y += dy;
      }
    }
    return moves;
  }
}