using Microsoft.AspNetCore.Mvc;
using MediatR;
using System.Threading.Tasks;
using TicTacToeAPI.Services.Commands;

namespace TicTacToeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUser.Command request)
        {
            var response = await _mediator.Send(request);

            if (response == null)
            {
                return Unauthorized();
            }

            return Ok(response); 
        }
    }
}
