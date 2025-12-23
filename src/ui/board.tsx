import { useState } from "react"
import Square from "./square"
import type { Piece } from "../entities/piece"
import { Pawn } from "../entities/pawn"
import { Rook } from "../entities/rook"
import { Knight } from "../entities/knight"
import { Bishop } from "../entities/bishop"
import { Queen } from "../entities/queen"
import { King } from "../entities/king"

  // 00 01 02 03 04 05 06 07
  // 10 11 12 13 14 15 16 17
  // 20 21 22 23 24 25 26 27
  // 30 31 32 33 34 35 36 37
  // 40 41 42 43 44 45 46 47
  // 50 51 52 53 54 55 56 57
  // 60 61 62 63 64 65 66 67
  // 70 71 72 73 74 75 76 77


const initialBoard = (): Array<Array<Piece | null>> => [
  [new Rook('r1', 'black', [0, 0]), new Knight('k1', 'black', [0, 1]), new Bishop('b1', 'black', [0, 2]), new Queen('q1', 'black', [0, 3]), new King('k1', 'black', [0, 4]), new Bishop('b2', 'black', [0, 4]), new Knight('k2', 'black', [0, 6]), new Rook('r2', 'black', [0, 7])], 
  [new Pawn('p1', 'black', [1, 0]), new Pawn('p2', 'black', [1, 1]), new Pawn('p3', 'black', [1, 2]), new Pawn('p4', 'black', [1, 3]), new Pawn('p5', 'black', [1, 4]), new Pawn('p6', 'black', [1, 5]), new Pawn('p7', 'black', [1, 6]), new Pawn('p8', 'black', [1, 7])], // row 1 (preto)
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [new Pawn('p1', 'white', [6, 0]), new Pawn('p2', 'white', [6, 1]), new Pawn('p3', 'white', [6, 2]), new Pawn('p4', 'white', [6, 3]), new Pawn('p5', 'white', [6, 4]), new Pawn('p6', 'white', [6, 5]), new Pawn('p7', 'white', [6, 6]), new Pawn('p8', 'white' , [6, 7])], // row 6 (branco)
  [new Rook('r1', 'white', [7, 0]), new Knight('k1', 'white', [7, 1]), new Bishop('b1', 'white', [7, 2]), new Queen('q1', 'white', [7, 3]), new King('k1', 'white', [7, 4]), new Bishop('b2', 'white', [7, 4]), new Knight('k2', 'white', [7, 6]), new Rook('r2', 'white', [7, 7])], 
]

const initialHighlights = (): boolean[][] =>
  Array.from({ length: 8 }, () => Array(8).fill(false))

export default function Board(){
  const [squares, setSquares] = useState<Array<Array<Piece | null>>>(initialBoard())
  const [currentPiece, setCurrentPiece] = useState<{ piece: Piece | null; position: [number, number] } | null>(null)
  const [highlightedSquares, setHighlightedSquares] = useState<boolean[][]>(() => initialHighlights())

  function handleSquareClick(i: number, j: number) {
    if (!currentPiece) {
      if (squares[i][j] == null){
        setCurrentPiece(null)
        return;
      }

      const availableMoves = squares[i][j]?.getAvaiableMoves(squares)
      const newHighlights = highlightedSquares.slice()
      for (const [x, y] of availableMoves || []) {
        newHighlights[x][y] = true
      }

      setCurrentPiece({ piece: squares[i][j], position: [i, j] })
      setHighlightedSquares(newHighlights)

      return;
    }

    const availableMoves = currentPiece.piece?.getAvaiableMoves(squares)
    const isMoveAvailable = availableMoves?.some(([x, y]) => x === i && y === j)

    if (!isMoveAvailable) {
      setCurrentPiece(null)
      setHighlightedSquares(initialHighlights())
      return;
    }

    const newSquares = squares.map((row) => row.slice())
    newSquares[currentPiece.position[0]][currentPiece.position[1]] = null;
    newSquares[i][j] = currentPiece.piece
    newSquares[i][j]!.currentPosition = [i, j]
    setCurrentPiece(null)
    setSquares(newSquares)
    setHighlightedSquares(initialHighlights())
  }

  return (<div className="board">
      <div className="board-row">
        <Square piece={squares[0][0]} isBlack={false} isHighlighted={highlightedSquares[0][0]} onSquareClick={() => handleSquareClick(0, 0)} />
        <Square piece={squares[0][1]} isBlack={true} isHighlighted={highlightedSquares[0][1]} onSquareClick={() => handleSquareClick(0, 1)} />
        <Square piece={squares[0][2]} isBlack={false} isHighlighted={highlightedSquares[0][2]} onSquareClick={() => handleSquareClick(0, 2)} />
        <Square piece={squares[0][3]} isBlack={true} isHighlighted={highlightedSquares[0][3]} onSquareClick={() => handleSquareClick(0, 3)} />
        <Square piece={squares[0][4]} isBlack={false} isHighlighted={highlightedSquares[0][4]} onSquareClick={() => handleSquareClick(0, 4)} />
        <Square piece={squares[0][5]} isBlack={true} isHighlighted={highlightedSquares[0][5]} onSquareClick={() => handleSquareClick(0, 5)} />
        <Square piece={squares[0][6]} isBlack={false} isHighlighted={highlightedSquares[0][6]} onSquareClick={() => handleSquareClick(0, 6)} />
        <Square piece={squares[0][7]} isBlack={true} isHighlighted={highlightedSquares[0][7]} onSquareClick={() => handleSquareClick(0, 7)} />
      </div>
      <div className="board-row">
        <Square piece={squares[1][0]} isBlack={true} isHighlighted={highlightedSquares[1][0]} onSquareClick={() => handleSquareClick(1, 0)} />
        <Square piece={squares[1][1]} isBlack={false} isHighlighted={highlightedSquares[1][1]} onSquareClick={() => handleSquareClick(1, 1)} />
        <Square piece={squares[1][2]} isBlack={true} isHighlighted={highlightedSquares[1][2]} onSquareClick={() => handleSquareClick(1, 2)} />
        <Square piece={squares[1][3]} isBlack={false} isHighlighted={highlightedSquares[1][3]} onSquareClick={() => handleSquareClick(1, 3)} />
        <Square piece={squares[1][4]} isBlack={true} isHighlighted={highlightedSquares[1][4]} onSquareClick={() => handleSquareClick(1, 4)} />
        <Square piece={squares[1][5]} isBlack={false} isHighlighted={highlightedSquares[1][5]} onSquareClick={() => handleSquareClick(1, 5)} />
        <Square piece={squares[1][6]} isBlack={true} isHighlighted={highlightedSquares[1][6]} onSquareClick={() => handleSquareClick(1, 6)} />
        <Square piece={squares[1][7]} isBlack={false} isHighlighted={highlightedSquares[1][7]} onSquareClick={() => handleSquareClick(1, 7)} />
      </div>
      <div className="board-row">
        <Square piece={squares[2][0]} isBlack={false} isHighlighted={highlightedSquares[2][0]} onSquareClick={() => handleSquareClick(2, 0)} />
        <Square piece={squares[2][1]} isBlack={true} isHighlighted={highlightedSquares[2][1]} onSquareClick={() => handleSquareClick(2, 1)} />
        <Square piece={squares[2][2]} isBlack={false} isHighlighted={highlightedSquares[2][2]} onSquareClick={() => handleSquareClick(2, 2)} />
        <Square piece={squares[2][3]} isBlack={true} isHighlighted={highlightedSquares[2][3]} onSquareClick={() => handleSquareClick(2, 3)} />
        <Square piece={squares[2][4]} isBlack={false} isHighlighted={highlightedSquares[2][4]} onSquareClick={() => handleSquareClick(2, 4)} />
        <Square piece={squares[2][5]} isBlack={true} isHighlighted={highlightedSquares[2][5]} onSquareClick={() => handleSquareClick(2, 5)} />
        <Square piece={squares[2][6]} isBlack={false} isHighlighted={highlightedSquares[2][6]} onSquareClick={() => handleSquareClick(2, 6)} />
        <Square piece={squares[2][7]} isBlack={true} isHighlighted={highlightedSquares[2][7]} onSquareClick={() => handleSquareClick(2, 7)} />
      </div>
      <div className="board-row">
        <Square piece={squares[3][0]} isBlack={true} isHighlighted={highlightedSquares[3][0]} onSquareClick={() => handleSquareClick(3, 0)} />
        <Square piece={squares[3][1]} isBlack={false} isHighlighted={highlightedSquares[3][1]} onSquareClick={() => handleSquareClick(3, 1)} />
        <Square piece={squares[3][2]} isBlack={true} isHighlighted={highlightedSquares[3][2]} onSquareClick={() => handleSquareClick(3, 2)} />
        <Square piece={squares[3][3]} isBlack={false} isHighlighted={highlightedSquares[3][3]} onSquareClick={() => handleSquareClick(3, 3)} />
        <Square piece={squares[3][4]} isBlack={true} isHighlighted={highlightedSquares[3][4]} onSquareClick={() => handleSquareClick(3, 4)} />
        <Square piece={squares[3][5]} isBlack={false} isHighlighted={highlightedSquares[3][5]} onSquareClick={() => handleSquareClick(3, 5)} />
        <Square piece={squares[3][6]} isBlack={true} isHighlighted={highlightedSquares[3][6]} onSquareClick={() => handleSquareClick(3, 6)} />
        <Square piece={squares[3][7]} isBlack={false} isHighlighted={highlightedSquares[3][7]} onSquareClick={() => handleSquareClick(3, 7)} />
      </div>
      <div className="board-row">
        <Square piece={squares[4][0]} isBlack={false} isHighlighted={highlightedSquares[4][0]} onSquareClick={() => handleSquareClick(4, 0)} />
        <Square piece={squares[4][1]} isBlack={true} isHighlighted={highlightedSquares[4][1]} onSquareClick={() => handleSquareClick(4, 1)} />
        <Square piece={squares[4][2]} isBlack={false} isHighlighted={highlightedSquares[4][2]} onSquareClick={() => handleSquareClick(4, 2)} />
        <Square piece={squares[4][3]} isBlack={true} isHighlighted={highlightedSquares[4][3]} onSquareClick={() => handleSquareClick(4, 3)} />
        <Square piece={squares[4][4]} isBlack={false} isHighlighted={highlightedSquares[4][4]} onSquareClick={() => handleSquareClick(4, 4)} />
        <Square piece={squares[4][5]} isBlack={true} isHighlighted={highlightedSquares[4][5]} onSquareClick={() => handleSquareClick(4, 5)} />
        <Square piece={squares[4][6]} isBlack={false} isHighlighted={highlightedSquares[4][6]} onSquareClick={() => handleSquareClick(4, 6)} />
        <Square piece={squares[4][7]} isBlack={true} isHighlighted={highlightedSquares[4][7]} onSquareClick={() => handleSquareClick(4, 7)} />
      </div>
      <div className="board-row">
        <Square piece={squares[5][0]} isBlack={true} isHighlighted={highlightedSquares[5][0]} onSquareClick={() => handleSquareClick(5, 0)} />
        <Square piece={squares[5][1]} isBlack={false} isHighlighted={highlightedSquares[5][1]} onSquareClick={() => handleSquareClick(5, 1)} />
        <Square piece={squares[5][2]} isBlack={true} isHighlighted={highlightedSquares[5][2]} onSquareClick={() => handleSquareClick(5, 2)} />
        <Square piece={squares[5][3]} isBlack={false} isHighlighted={highlightedSquares[5][3]} onSquareClick={() => handleSquareClick(5, 3)} />
        <Square piece={squares[5][4]} isBlack={true} isHighlighted={highlightedSquares[5][4]} onSquareClick={() => handleSquareClick(5, 4)} />
        <Square piece={squares[5][5]} isBlack={false} isHighlighted={highlightedSquares[5][5]} onSquareClick={() => handleSquareClick(5, 5)} />
        <Square piece={squares[5][6]} isBlack={true} isHighlighted={highlightedSquares[5][6]} onSquareClick={() => handleSquareClick(5, 6)} />
        <Square piece={squares[5][7]} isBlack={false} isHighlighted={highlightedSquares[5][7]} onSquareClick={() => handleSquareClick(5, 7)} />
      </div>
      <div className="board-row">
        <Square piece={squares[6][0]} isBlack={false} isHighlighted={highlightedSquares[6][0]} onSquareClick={() => handleSquareClick(6, 0)} />
        <Square piece={squares[6][1]} isBlack={true} isHighlighted={highlightedSquares[6][1]} onSquareClick={() => handleSquareClick(6, 1)} />
        <Square piece={squares[6][2]} isBlack={false} isHighlighted={highlightedSquares[6][2]} onSquareClick={() => handleSquareClick(6, 2)} />
        <Square piece={squares[6][3]} isBlack={true} isHighlighted={highlightedSquares[6][3]} onSquareClick={() => handleSquareClick(6, 3)} />
        <Square piece={squares[6][4]} isBlack={false} isHighlighted={highlightedSquares[6][4]} onSquareClick={() => handleSquareClick(6, 4)} />
        <Square piece={squares[6][5]} isBlack={true} isHighlighted={highlightedSquares[6][5]} onSquareClick={() => handleSquareClick(6, 5)} />
        <Square piece={squares[6][6]} isBlack={false} isHighlighted={highlightedSquares[6][6]} onSquareClick={() => handleSquareClick(6, 6)} />
        <Square piece={squares[6][7]} isBlack={true} isHighlighted={highlightedSquares[6][7]} onSquareClick={() => handleSquareClick(6, 7)} />
      </div>
      <div className="board-row">
        <Square piece={squares[7][0]} isBlack={true} isHighlighted={highlightedSquares[7][0]} onSquareClick={() => handleSquareClick(7, 0)} />
        <Square piece={squares[7][1]} isBlack={false} isHighlighted={highlightedSquares[7][1]} onSquareClick={() => handleSquareClick(7, 1)} />
        <Square piece={squares[7][2]} isBlack={true} isHighlighted={highlightedSquares[7][2]} onSquareClick={() => handleSquareClick(7, 2)} />
        <Square piece={squares[7][3]} isBlack={false} isHighlighted={highlightedSquares[7][3]} onSquareClick={() => handleSquareClick(7, 3)} />
        <Square piece={squares[7][4]} isBlack={true} isHighlighted={highlightedSquares[7][4]} onSquareClick={() => handleSquareClick(7, 4)} />
        <Square piece={squares[7][5]} isBlack={false} isHighlighted={highlightedSquares[7][5]} onSquareClick={() => handleSquareClick(7, 5)} />
        <Square piece={squares[7][6]} isBlack={true} isHighlighted={highlightedSquares[7][6]} onSquareClick={() => handleSquareClick(7, 6)} />
        <Square piece={squares[7][7]} isBlack={false} isHighlighted={highlightedSquares[7][7]} onSquareClick={() => handleSquareClick(7, 7)} />
      </div>
    </div>
  )
}