using Microsoft.AspNetCore.SignalR;

namespace TicTacToeAPI.Game
{
    public class GameHub : Hub
    {
        private readonly GameService _gameService;

        public GameHub(GameService gameService)
        {
            _gameService = gameService;
        }

        public async Task JoinGame(string playerId)
        {
            var opponentId = _gameService.AddPlayer(playerId);

            if (opponentId != null)
            {
                await Clients.Client(playerId).SendAsync("GameStarted", "O", opponentId);
                await Clients.Client(opponentId).SendAsync("GameStarted", "X", playerId);
            }
            else
            {
                await Clients.Client(playerId).SendAsync("WaitingForOpponent");
            }
        }

        public async Task MakeMove(string playerId, int squareIndex)
        {
            var opponentId = _gameService.GetOpponent(playerId);
            if (opponentId != null)
            {
                await Clients.Client(opponentId).SendAsync("OpponentMadeMove", playerId, squareIndex);
            }
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var playerId = Context.ConnectionId;

            await EndGame(playerId);

            var opponentId = _gameService.GetOpponent(playerId);
            if (opponentId != null)
            {
                await Clients.Client(opponentId).SendAsync("OpponentLeft");
                await EndGame(opponentId);
            }

            await base.OnDisconnectedAsync(exception);
        }

        public async Task EndGame(string playerId, string? opponentId = null)
        {
            _gameService.RemovePlayer(playerId);
            if (opponentId != null)
            {
                _gameService.RemovePlayer(opponentId);
            }
            if (opponentId != null)
            {
                await Clients.Client(opponentId).SendAsync("GameCleanedUp");
            }
        }
    }
}
