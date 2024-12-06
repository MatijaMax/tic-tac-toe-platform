using MediatR;
using TicTacToeCore.Domain;
using TicTacToeInfrastructure.Repositories;

namespace TicTacToeAPI.Services.Commands
{
    public static class CreateGameRecord
    {
        public class Command : IRequest<GameRecord>
        {
            public string Player1 { get; set; } = string.Empty;
            public string Player2 { get; set; } = string.Empty;
            public string Winner { get; set; } = string.Empty;
            public int WinPoints { get; set; }
            public int LossPoints { get; set; }
        }

        public class RequestHandler : IRequestHandler<Command, GameRecord>
        {
            private readonly IRepository<GameRecord> _repository;

            public RequestHandler(IRepository<GameRecord> repository)
            {
                _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            }

            public Task<GameRecord> Handle(Command request, CancellationToken cancellationToken)
            {
                if (request is null)
                {
                    throw new ArgumentNullException(nameof(request));
                }

                var game = new GameRecord {Player1 = request.Player1, Player2 = request.Player2, Winner = request.Winner, WinPoints = request.WinPoints, LossPoints = request.LossPoints};
                _repository.Insert(game);
                _repository.Save();
                return Task.FromResult(game);
            }
        }
    }
}

