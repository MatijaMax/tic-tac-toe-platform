import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-board',
  templateUrl: './mp-board.component.html',
  styleUrls: ['./mp-board.component.css']
})
export class MpBoardComponent {
  squares: any = [];
  winner = '';
  counter = 0;
  isDraw = '';
  freshPage = true;
  username = "test";
  opponentId: string = '';
  playerSymbol: string = 'X';
  opSymbol: string = '';

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.gameService.onGameStarted((symbol:string, opponentId: string) => {
      this.playerSymbol = symbol;
      this.opponentId = opponentId;
      console.log("GAME STARTED")
    });

    this.gameService.onOpponentMadeMove((playerId: string, squareIndex: number) => {
      this.opSymbol = this.playerSymbol === 'X' ? 'O' : 'X'; 
      this.squares.splice(squareIndex, 1, this.opSymbol);
      console.log(playerId + "made a move with" + squareIndex);
    });
  }

  async newGame() {
    this.squares = Array(9).fill(null);
    this.winner = '';
    this.isDraw = '';
    this.counter = 0;
    this.freshPage = false;
    this.username = this.generateRandomString(4);

    await this.gameService.startConnection();
    
    await this.gameService.requestGame(this.username);
  }

  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


  makeMove(idx: number) {
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.playerSymbol);
      this.counter++;
    }
    this.makeMoveS(idx);
    this.winner = this.calculateWinner();
    if (this.winner){
      this.endGame();
    }
    if (!this.winner && this.counter === 9) {
      this.isDraw = 'yes';
      this.endGame();
    }
  }
  endGame() {
      this.gameService.endGame(this.username, this.opponentId);
  }

  async makeMoveS(squareIndex: number) {
    await this.gameService.makeMove(this.username, squareIndex);
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
