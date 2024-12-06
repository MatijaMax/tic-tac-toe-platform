using System.Collections.Concurrent;

namespace TicTacToeAPI.Game
{
    public class GameService
    {
        //MIGHT NEED REFACTORING AND DEBUG
        private  ConcurrentQueue<string> _waitingPlayers = new();
        private  Dictionary<string, string> _activeGames = new();

        public string? AddPlayer(string playerId)
        {
            lock (_waitingPlayers)
            {
                _waitingPlayers.Enqueue(playerId);

                if (_waitingPlayers.Count >= 2)
                {
                    if (_waitingPlayers.TryDequeue(out var player1) && _waitingPlayers.TryDequeue(out var player2))
                    {
                        _activeGames[player1] = player2;
                        _activeGames[player2] = player1;

                        return player2;
                    }
                }
                return null;
            }
        }

        public void RemovePlayer(string playerId)
        {
            lock (_waitingPlayers)
            {
                if (_waitingPlayers.Contains(playerId))
                {
                    _waitingPlayers = new ConcurrentQueue<string>(_waitingPlayers.Where(id => id != playerId));
                }

                if (_activeGames.ContainsKey(playerId))
                {
                    var opponent = _activeGames[playerId];
                    _activeGames.Remove(playerId);
                    _activeGames.Remove(opponent);
                }
            }
        }

        public string? GetOpponent(string playerId)
        {
            return _activeGames.TryGetValue(playerId, out var opponent) ? opponent : null;
        }


    }
}
