using System.Security.Claims;
using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PicHub.Server.Entities;

namespace PicHub.Server.Controllers
{
    [ApiController]
    [Route("api/follow")]
    public class FollowController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IUnitOfWork unit;

        public FollowController(UserManager<AppUser> userManager, IUnitOfWork unit)
        {
            this.unit = unit;
            this.userManager = userManager;
        }

        [HttpGet("getFollowersCount")]
        public async Task<ActionResult<int>> GetFollowersCountAsync(string userId)
        {
            return Ok(await FollowersCountAsync(userId));
        }

        [HttpGet("getFollowingsCount")]
        public async Task<ActionResult<int>> GetFollowingsCountAsync(string userId)
        {
            return Ok(await FollowingsCountAsync(userId));
        }

        private async Task<int> FollowersCountAsync(string userId)
        {
            var follows = await unit.Follows.GetAllByPredicateAsync(f => f.FollowingId == userId);
            return follows.Count();
        }

        private async Task<int> FollowingsCountAsync(string userId)
        {
            var follows = await unit.Follows.GetAllByPredicateAsync(f => f.FollowerId == userId);
            return follows.Count();
        }

        [HttpGet("getIsFollowing")]
        public async Task<ActionResult<bool>> GetIsFollowingAsync(string followingId)
        {
            var followerId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (followerId == null)
                return Unauthorized();

            var follow = await unit.Follows.ExistsByPredicateAsync(f =>
                f.FollowerId == followerId && f.FollowingId == followingId
            );

            return Ok(follow);
        }

        [HttpPost("follow")]
        public async Task<IActionResult> FollowAsync(string followingId)
        {
            try
            {
                var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (loggedInUserId == null)
                    return Unauthorized();

                var follower = await userManager.FindByIdAsync(loggedInUserId);
                if (follower == null)
                    return Unauthorized();
                var following = await userManager.FindByIdAsync(followingId);
                if (following == null)
                    return NotFound();

                await unit.Follows.AddAsync(
                    new Follow
                    {
                        FollowerId = loggedInUserId,
                        FollowingId = followingId,
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

        [HttpDelete("unFollow")]
        public async Task<IActionResult> UnFollowAsync(string followingId)
        {
            try
            {
                var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (loggedInUserId == null)
                    return Unauthorized();

                var follower = await userManager.FindByIdAsync(loggedInUserId);
                if (follower == null)
                    return Unauthorized();
                var following = await userManager.FindByIdAsync(followingId);
                if (following == null)
                    return NotFound();

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
