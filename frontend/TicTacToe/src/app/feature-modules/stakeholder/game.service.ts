import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private hubConnection: HubConnection;

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7014/gameHub') 
      .build();
  }

  // Start the connection with await to ensure it's fully established
  async startConnection() {
    try {
      await this.hubConnection.start();
      console.log("Connection established.");
    } catch (err) {
      console.error('Error while starting connection: ' + err);
    }
  }

  // Request game after ensuring the connection is established
  async requestGame(userId: string) {
    try {
      // Ensure connection is started before making the request
      if (this.hubConnection.state === 'Connected') {
        await this.hubConnection.invoke('JoinGame', userId);
        console.log("Game request sent.");
      } else {
        console.log("Connection not established.");
      }
    } catch (err) {
      console.error('Error while requesting game: ' + err);
    }
  }

  // End the game after ensuring the connection is established
  async endGame(playerId: string, opponentId: string | "") {
    try {
      if (this.hubConnection.state === 'Connected') {
        await this.hubConnection.invoke('EndGame', playerId, opponentId);
        console.log("Game ended.");
      } else {
        console.log("Connection not established.");
      }
    } catch (err) {
      console.error('Error while ending the game: ' + err);
    }
  }

  // Make a move after ensuring the connection is established
  async makeMove(gameId: string, index: number) {
    try {
      if (this.hubConnection.state === 'Connected') {
        await this.hubConnection.invoke('MakeMove', gameId, index);
        console.log("Move made.");
      } else {
        console.log("Connection not established.");
      }
    } catch (err) {
      console.error('Error while making move: ' + err);
    }
  }

  // Register a callback for when the game starts
  onGameStarted(callback: (symbol: string, opponentId: string) => void) {
    this.hubConnection.on('GameStarted', callback);
  }

  // Register a callback for when the game is waiting for an opponent
  onWaitingForOpponent(callback: () => void) {
    this.hubConnection.on('WaitingForOpponent', callback);
  }

  // Register a callback for when an opponent makes a move
  onOpponentMadeMove(callback: (playerId: string, squareIndex: number) => void) {
    this.hubConnection.on('OpponentMadeMove', callback);
  }

  // Register a callback for when the game is cleaned up
  onGameCleanedUp(callback: () => void) {
    this.hubConnection.on('GameCleanedUp', callback);
  }

  // Register a callback for when the opponent leaves
  onOpponentLeft(callback: () => void) {
    this.hubConnection.on('OpponentLeft', callback);
  }
}
