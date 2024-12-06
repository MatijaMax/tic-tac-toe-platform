using MediatR;
using TicTacToeInfrastructure.Repositories;
using TicTacToeCore.Domain;

namespace TicTacToeAPI.Services.Queries;

public static class GetUser
{
    public class Query : IRequest<User?>
    {
        public Guid Id { get; set; }
    }

    public class RequestHandler : IRequestHandler<Query, User?>
    {
        private readonly IRepository<User> _repository;

        public RequestHandler(IRepository<User> repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        public Task<User?> Handle(Query request, CancellationToken cancellationToken)
        {
            if (request is null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            var user = _repository.GetByID(request.Id);
            user.Password = string.Empty;

            return Task.FromResult(user);
        }
    }
}
