using System.Security.Claims;
using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.AspNetCore.Mvc;
using PicHub.Server.Entities;

namespace PicHub.Server.Controllers
{
    [ApiController]
    [Route("api/blocks")]
    public class BlockController : ControllerBase
    {
        private readonly IUnitOfWork unit;

        public BlockController(IUnitOfWork unit)
        {
            this.unit = unit;
        }

        [HttpGet]
        public async Task<IActionResult> GetBlockedUsersAsync()
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var blockedUsers = await unit.Blocks.GetAllByPredicateAsync(b =>
                b.BlockerId == loggedInUserId
            );

            if (blockedUsers.Any())
                return Ok(blockedUsers);
            else
                return NotFound();
        }

        [HttpPost("{user-id}")]
        public async Task<IActionResult> BlockUserAsync(string userId)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            await unit.Blocks.AddAsync(
                new Block { BlockerId = loggedInUserId, BlockedId = userId }
            );
            await unit.CompleteAsync();

            return Created();
        }

        [HttpDelete("{user-id}")]
        public async Task<IActionResult> UnBlockUserAsync(string userId)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var block = await unit.Blocks.GetByPredicateAsync(b =>
                b.BlockedId == userId && b.BlockerId == loggedInUserId
            );
            unit.Blocks.Remove(block);
            await unit.CompleteAsync();

            return NoContent();
        }
    }
}
