using MediatR;
using TicTacToeCore.Domain;
using TicTacToeInfrastructure.Repositories;

namespace TicTacToeAPI.Services.Commands
{
    public static class CreateUser
    {
        public class Command : IRequest<User>
        {
            public string Name { get; set; } = string.Empty;
            public string Surname { get; set; } = string.Empty;
            public string Username { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
            public int Points { get; set; }
            public int Streak { get; set; }
            public bool InQueue { get; set; } = false;
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

                var user = _repository.Find(c => c.Password == request.Password).SingleOrDefault();
                if (user == null)
                {
                    user = new User { Name = request.Name, Surname = request.Surname, Username = request.Username, Password = request.Password, Points = 0, Streak = 0, InQueue = false };
                    _repository.Insert(user);
                }
                _repository.Save();
                return Task.FromResult(user);
            }
        }
    }
}

