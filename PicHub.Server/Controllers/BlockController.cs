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

        [HttpGet("{blocked-user-id}")]
        public async Task<ActionResult<bool>> ExistsAsync(
            [FromRoute(Name = "blocked-user-id")] string blockedUserId
        )
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var blockedUsers = await unit.Blocks.ExistsByPredicateAsync(b =>
                b.BlockerId == loggedInUserId && b.BlockedId == blockedUserId
            );

            return Ok(blockedUsers);
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

            return Ok(blockedUsers);
        }

        [HttpPost("{user-id}")]
        public async Task<IActionResult> CreateAsync([FromRoute(Name = "user-id")] string userId)
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
        public async Task<IActionResult> DeleteAsync([FromRoute(Name = "user-id")] string userId)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var block = await unit.Blocks.GetByPredicateAsync(b =>
                b.BlockedId == userId && b.BlockerId == loggedInUserId
            );
            if (block == null)
                return NotFound();

            unit.Blocks.Remove(block);
            await unit.CompleteAsync();
            return NoContent();
        }
    }
}
