using MediatR;
using TicTacToeCore.Domain;
using TicTacToeInfrastructure.Repositories;

namespace TicTacToeAPI.Services.Commands
{
    public static class LoginUser
    {
        public class Command : IRequest<LoginResponse>
        {
            public string Username { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }

        public class LoginResponse
        {
            public string Token { get; set; } = string.Empty;
        }

        public class RequestHandler : IRequestHandler<Command, LoginResponse>
        {
            private readonly IRepository<User> _repository;
            private readonly JwtTokenService _jwtTokenService;

            public RequestHandler(IRepository<User> repository, JwtTokenService jwtTokenService)
            {
                _repository = repository ?? throw new ArgumentNullException(nameof(repository));
                _jwtTokenService = jwtTokenService ?? throw new ArgumentNullException(nameof(jwtTokenService));
            }

            public Task<LoginResponse> Handle(Command request, CancellationToken cancellationToken)
            {

                var user = _repository.Find(u => u.Username == request.Username).SingleOrDefault();

                if (user == null || user.Password != request.Password)  
                {
                    return Task.FromResult<LoginResponse>(null); 
                }

                var token = _jwtTokenService.GenerateToken(request.Username);

                return Task.FromResult(new LoginResponse
                {
                    Token = token
                });
            }
        }
    }
}
