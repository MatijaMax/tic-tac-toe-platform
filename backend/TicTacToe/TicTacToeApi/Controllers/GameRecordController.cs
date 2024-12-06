using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TicTacToeAPI.Services.Commands;
using TicTacToeCore.Domain;

namespace TicTacToeAPI.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class GameRecordController : ControllerBase
    {
        private readonly IMediator _mediator;
        public GameRecordController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpPost]
        [ProducesResponseType(typeof(GameRecord), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> CreateGameRecord([FromBody] CreateGameRecord.Command command)
        {
            var createdGameRecord = await _mediator.Send(command);
            return Ok(createdGameRecord);
        }
    }
}

