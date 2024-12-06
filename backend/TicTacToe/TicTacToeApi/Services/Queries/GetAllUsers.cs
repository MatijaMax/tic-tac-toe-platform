using MediatR;
using TicTacToeCore.Domain;
using TicTacToeInfrastructure.Repositories;

namespace TicTacToeAPI.Services.Queries
{
    public static class GetAllUsers
    {
        public class Query : IRequest<List<User>>
        {

        }

        public class RequestHandler : IRequestHandler<Query, List<User>>
        {
            private readonly IRepository<User> _repository;

            public RequestHandler(IRepository<User> repository)
            {
                _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            }

            public Task<List<User>> Handle(Query request, CancellationToken cancellationToken)
            {
                if (request is null)
                {
                    throw new ArgumentNullException(nameof(request));
                }

                List<User> users = _repository.GetAll()
                    .Select(user => new User
                    {
                    Id = user.Id,
                    Name = user.Name,
                    Surname = user.Surname,
                    Username = user.Username,
                    Password = string.Empty,
                    Points = user.Points,
                    Streak = user.Streak,
                    InQueue = user.InQueue
                    })
                    .ToList();

                return Task.FromResult(users);
            }
        }
    }
}
