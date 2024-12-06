using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TicTacToeAPI.Services.Commands;
using TicTacToeAPI.Services.Queries;
using TicTacToeCore.Domain;


namespace TicTacToeAPI.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;
        public UserController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<User>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllUsers()
        {
            List<User> users = await _mediator.Send(new GetAllUsers.Query { });
            return Ok(users);
        }

        [HttpGet("/history/{id:guid}")]
        [ProducesResponseType(typeof(IEnumerable<GameRecord>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetHistory(Guid id)
        {
            List<GameRecord> games = await _mediator.Send(new GetHistory.Query { Id = id });
            return Ok(games);
        }

        [HttpGet(("{id:guid}"))]
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetUser(Guid id)
        {
            var user = await _mediator.Send(new GetUser.Query { Id = id });
            return user == null ? NotFound() : Ok(user);

        }

        [HttpGet("/username/{username}")]
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetUserByUsername(string username)
        {
            var user = await _mediator.Send(new GetUserByUsername.Query { Username = username });
            return user == null ? NotFound() : Ok(user);

        }

        [HttpPost]
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        public async Task<IActionResult> CreateUser([FromBody] CreateUser.Command command)
        {
            var created = await _mediator.Send(command);
            return Ok(created);
        }

        [HttpPut(("{id:guid}"))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateUser(UpdateUser.Command command)
        {

            var updated = await _mediator.Send(command);
            return Ok(updated);

        }
    }
}


