export interface Piece {
  id: string;
  icon:  'P'|'R'|'N'|'B'|'Q'|'K'|'p'|'r'|'n'|'b'|'q'|'k';
  color: 'white' | 'black';
  currentPosition: [number, number];
  getAvaiableMoves(squares: (Piece | null)[][]): [number, number][];
}