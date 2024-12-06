using MediatR;
using TicTacToeCore.Domain;
using TicTacToeInfrastructure.Repositories;

namespace TicTacToeAPI.Services.Commands
{
    public static class UpdateUser
    {
        public class Command : IRequest<User>
        {
            public Guid Id { get; set; }
            public int Points { get; set; }
        }

        public class RequestHandler : IRequestHandler<Command, User>
        {
            private readonly IRepository<User> _repository;

            public RequestHandler(IRepository<User> repository)
            {
                _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            }

            public Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                if (request is null)
                {
                    throw new ArgumentNullException(nameof(request));
                }
                User user = _repository.GetByID(request.Id);
                
                if (request.Points <= 0) {
                    user.Streak = 0;
                    user.Points += request.Points;
                }
                else
                {
                    user.Points += request.Points;
                }
                if (user.Points < 0) { user.Points = 0; }

                _repository.Save();
                return Task.FromResult(user);
            }
        }
    }
}
