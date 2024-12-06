using MediatR;
using TicTacToeInfrastructure.Repositories;
using TicTacToeCore.Domain;

namespace TicTacToeAPI.Services.Queries;

public static class GetHistory
{
    public class Query : IRequest<List<GameRecord>>
    {
        public Guid Id { get; set; }
    }

    public class RequestHandler : IRequestHandler<Query, List<GameRecord>>
    {
        private readonly IRepository<GameRecord> _gameRecordRepository;
        private readonly IRepository<User> _userRepository;

        public RequestHandler(IRepository<GameRecord> gameRecordRepository, IRepository<User> userRepository)
        {
            _gameRecordRepository = gameRecordRepository ?? throw new ArgumentNullException(nameof(gameRecordRepository));
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        }

        public Task<List<GameRecord>> Handle(Query request, CancellationToken cancellationToken)
        {
            if (request is null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            var user = _userRepository.GetByID(request.Id);
            List<GameRecord> games = _gameRecordRepository.GetAll()
                .Where(game => game.Player1 ==  user.Username || game.Player2 == user.Username)
                .ToList();

            return Task.FromResult(games);
        }
    }
}
