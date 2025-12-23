import type { Piece } from "./piece";

export class Pawn implements Piece {
  id: string;

  icon: 'P';
  color: 'white' | 'black';
  currentPosition: [number, number];

  constructor(id: string, color: 'white' | 'black', currentPosition: [number, number]) {
    this.id = id;
    this.icon = 'P';
    this.color = color;
    this.currentPosition = currentPosition;
  }

  getAvaiableMoves(squares: Piece[][]): [number, number][] {
    const currentPosition = this.currentPosition;

    let nextRow: number;
    if (this.color === 'white') {
      nextRow = currentPosition[0] - 1;
    } else {
      nextRow = currentPosition[0] + 1;
    }

    const leftMove = [nextRow, currentPosition[1] - 1] as [number, number];
    const rightMove = [nextRow, currentPosition[1] + 1] as [number, number];
    const forwardMove = [nextRow, currentPosition[1]] as [number, number];

    if (squares[forwardMove[0]] && squares[forwardMove[0]][forwardMove[1]] === null) {
      return [forwardMove];
    }

    if (nextRow < 0 || nextRow > 7) {
      return [];
    }

    const moves: [number, number][] = [];
    if (squares[leftMove[0]] && squares[leftMove[0]][leftMove[1]] && squares[leftMove[0]][leftMove[1]].color !== this.color) {
      moves.push(leftMove);
    }

    if (squares[rightMove[0]] && squares[rightMove[0]][rightMove[1]] && squares[rightMove[0]][rightMove[1]].color !== this.color) {
      moves.push(rightMove);
    }
    return moves;
  }
}