import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './ai-board.component.html',
  styleUrls: ['./ai-board.component.css']
})
export class AiBoardComponent {
  squares: any = [];
  winner = '';
  xIsNext = true;
  counter = 0;
  isDraw = '';
  freshPage = true;

  constructor() {}

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = '';
    this.xIsNext = true;
    this.isDraw = '';
    this.counter = 0;
    this.freshPage = false;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if (!this.squares[idx] && !this.winner) {
      this.squares[idx] = this.player;
      this.counter++;
      this.winner = this.calculateWinner();

      if (!this.winner && this.counter < 9) {
        this.xIsNext = !this.xIsNext;
        if (!this.xIsNext) {
          this.makeAIMove();
        }
      }

      if (!this.winner && this.counter === 9) {
        this.isDraw = 'yes';
      }
    }
  }

  makeAIMove() {
    const bestMove = this.getBestMove();
    if (bestMove !== null) {
      this.squares[bestMove] = 'O';
      this.counter++;
      this.winner = this.calculateWinner();
      if (!this.winner) {
        this.xIsNext = true;
      }
    }
  }

  getBestMove(): number | null {
    let bestScore = -Infinity;
    let move = null;

    for (let i = 0; i < 9; i++) {
      if (!this.squares[i]) {
        this.squares[i] = 'O'; 
        const score = this.minimax(0, false);
        this.squares[i] = null; 

        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    return move;
  }

  minimax(depth: number, isMaximizing: boolean): number {
    const winner = this.calculateWinner();
    if (winner === 'O') return 10 - depth;
    if (winner === 'X') return depth - 10;
    if (this.squares.every((square: any) => square !== null)) return 0; 

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (!this.squares[i]) {
          this.squares[i] = 'O';
          const score = this.minimax(depth + 1, false);
          this.squares[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (!this.squares[i]) {
          this.squares[i] = 'X';
          const score = this.minimax(depth + 1, true);
          this.squares[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}