using System.Security.Claims;
using CMSReactDotNet.Server.Data.UnitOfWork;
using Microsoft.AspNetCore.Mvc;
using PicHub.Server.Entities;

namespace PicHub.Server.Controllers
{
    [ApiController]
    [Route("api/follows")]
    public class FollowController : ControllerBase
    {
        private readonly IUnitOfWork unit;

        public FollowController(IUnitOfWork unit)
        {
            this.unit = unit;
        }

        [HttpGet("{user-id}/followers-count")]
        public async Task<IActionResult> GetFollowersCountAsync(
            [FromRoute(Name = "user-id")] string userId
        )
        {
            var followers = await unit.Follows.GetFollowersAsync(userId);
            return Ok(followers.Count());
        }

        [HttpGet("{user-id}/followings-count")]
        public async Task<IActionResult> GetFollowingsCountAsync(
            [FromRoute(Name = "user-id")] string userId
        )
        {
            var followings = await unit.Follows.GetFollowingsAsync(userId);
            return Ok(followings.Count());
        }

        [HttpGet("is-followed/{user-id}")]
        public async Task<IActionResult> GetIsFollowedAsync(
            [FromRoute(Name = "user-id")] string userId
        )
        {
            var followerId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (followerId == null)
                return Unauthorized();

            var follow = await unit.Follows.ExistsByPredicateAsync(f =>
                f.FollowerId == followerId && f.FollowingId == userId
            );

            return Ok(follow);
        }

        [HttpPost("{user-id}")]
        public async Task<IActionResult> CreateAsync([FromRoute(Name = "user-id")] string userId)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            try
            {
                var follow = await unit.Follows.ExistsByPredicateAsync(f =>
                    f.FollowerId == loggedInUserId && f.FollowingId == userId
                );
                if (follow == true)
                    return BadRequest("You've already followed this user.");

                await unit.Follows.AddAsync(
                    new Follow
                    {
                        FollowerId = loggedInUserId,
                        FollowingId = userId,
                        DateTime = DateTime.Now,
                    }
                );
                await unit.CompleteAsync();
                return Created();
            }
            catch (Exception ex)
            {
                return BadRequest("Could not follow. " + ex.Message);
            }
        }

        [HttpDelete("{user-id}")]
        public async Task<IActionResult> DeleteAsync(
            [FromRoute(Name = "user-id")] string followingId
        )
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();
            try
            {
                var follow = await unit.Follows.GetByPredicateAsync(f =>
                    f.FollowerId == loggedInUserId && f.FollowingId == followingId
                );
                unit.Follows.Remove(follow);
                await unit.CompleteAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest("Could not unfollow. " + ex.Message);
            }
        }
    }
}
