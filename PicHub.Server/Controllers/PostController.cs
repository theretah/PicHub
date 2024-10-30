using System.Security.Claims;
using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PicHub.Server.DTOs;
using PicHub.Server.Entities;
using Pichub.Server.Utilities;

namespace PicHub.Server.Controllers
{
    [ApiController]
    [Route("api/post")]
    public class PostController : ControllerBase
    {
        private readonly IUnitOfWork unit;
        private readonly UserManager<AppUser> userManager;

        public PostController(IUnitOfWork unit, UserManager<AppUser> userManager)
        {
            this.unit = unit;
            this.userManager = userManager;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllAsync()
        {
            try
            {
                var posts = await unit.Posts.GetAllAsync();
                if (!posts.Any() || posts == null)
                    return NoContent();
                return Ok(posts.OrderByDescending(p => p.CreateDate).ToList());
            }
            catch (Exception ex)
            {
                return BadRequest("A problem occured while getting posts. " + ex.Message);
            }
        }

        [HttpGet("getAllByAuthorId")]
        public async Task<IActionResult> GetAllByAuthorIdAsync(string authorId)
        {
            try
            {
                var posts = await unit.Posts.GetAllByAuthorIdAsync(authorId);
                return Ok(posts);
            }
            catch (Exception ex)
            {
                return BadRequest("Could not find posts created by this user. " + ex.Message);
            }
        }

        [HttpGet("getAllByAuthorUserName")]
        public async Task<IActionResult> GetAllByAuthorUserNameAsync(string userName)
        {
            try
            {
                var user = await userManager.FindByNameAsync(userName);
                if (user == null)
                {
                    return BadRequest("User not found.");
                }
                return Ok(await unit.Posts.GetAllByAuthorIdAsync(user.Id));
            }
            catch (Exception ex)
            {
                return BadRequest("Could not find posts created by this user. " + ex.Message);
            }
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetAsync(int id)
        {
            try
            {
                var post = await unit.Posts.GetByIdAsync(id);
                if (post != null)
                {
                    return Ok(post);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            try
            {
                await unit.Posts.RemoveByIdAsync(id);
                await unit.CompleteAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<IActionResult> CreateAsync(CreatePostDto model)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
            {
                return Unauthorized();
            }

            try
            {
                var imageFile = ImageUtilities.CompressImage(model.ImageFile, 1080);
                await unit.Posts.AddAsync(
                    new Post
                    {
                        Caption = model.Caption,
                        CommentsAllowed = !model.TurnOffComments,
                        AuthorId = loggedInUserId,
                        CreateDate = DateTime.Now,
                        PhotoContent = FileUtilities.FileToByteArray(imageFile),
                    }
                );
                await unit.CompleteAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to add the post. " + ex.Message);
            }
        }

        [HttpDelete("unSave")]
        public async Task<IActionResult> UnSaveAsync(int postId)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
            {
                return Unauthorized();
            }

            var save = await unit.Saves.GetByPredicateAsync(s =>
                s.UserId == loggedInUserId && s.PostId == postId
            );
            if (save != null)
            {
                unit.Saves.Remove(save);
                await unit.CompleteAsync();
                return NoContent();
            }

            return BadRequest("Could not remove post from saves.");
        }

        [HttpPost("save")]
        public async Task<IActionResult> SaveAsync(int postId)
        {
            try
            {
                var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (loggedInUserId == null)
                {
                    return Unauthorized();
                }

                await unit.Saves.AddAsync(new Save() { PostId = postId, UserId = loggedInUserId });
                await unit.CompleteAsync();
                return Created();
            }
            catch (Exception ex)
            {
                return BadRequest("A problem occured while saving the post. " + ex.Message);
            }
        }

        [HttpGet("isSaved")]
        public async Task<IActionResult> IsSavedAsync(int postId)
        {
            try
            {
                var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var isSaved = await unit.Saves.ExistsByPredicateAsync(l =>
                    l.PostId == postId && l.UserId == loggedInUserId
                );
                return Ok(isSaved);
            }
            catch (Exception ex)
            {
                return BadRequest("Could not get data. " + ex.Message);
            }
        }

        [HttpGet("isLiked")]
        public async Task<IActionResult> IsLikedAsync(int postId)
        {
            try
            {
                var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var isLiked = await unit.Likes.ExistsByPredicateAsync(l =>
                    l.PostId == postId && l.UserId == loggedInUserId
                );
                return Ok(isLiked);
            }
            catch (Exception ex)
            {
                return BadRequest("Could not get data. " + ex.Message);
            }
        }

        [HttpDelete("disLike")]
        public async Task<IActionResult> DisLikeAsync(int postId)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var existingLike = await unit.Likes.GetByPredicateAsync(l =>
                l.UserId == loggedInUserId && l.PostId == postId
            );
            if (existingLike != null)
            {
                unit.Likes.Remove(existingLike);
                await unit.CompleteAsync();

                return NoContent();
            }

            return BadRequest("Could not remove your like from the post.");
        }

        [HttpPost("like")]
        public async Task<IActionResult> LikeAsync(int postId)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();
            try
            {
                await unit.Likes.AddAsync(new Like { UserId = loggedInUserId, PostId = postId });
                await unit.CompleteAsync();

                return Created();
            }
            catch (Exception ex)
            {
                return BadRequest("A problem occured while liking the post. " + ex.Message);
            }
        }

        [HttpGet("getSavedPosts")]
        public async Task<ActionResult> GetSavedsAsync()
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
            {
                return Unauthorized();
            }
            try
            {
                var postIds = new List<int>();

                var savesByUserId = await unit.Saves.GetSavesByUserId(loggedInUserId);
                foreach (var save in savesByUserId)
                {
                    postIds.Add(save.PostId);
                }

                var savedPosts = new List<Post>();
                foreach (var postId in postIds)
                {
                    var post = await unit.Posts.GetByIdAsync(postId);
                    if (post != null)
                    {
                        savedPosts.Add(post);
                    }
                }

                return Ok(savedPosts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getLikedPosts")]
        public async IAsyncEnumerable<Post> GetLikedsAsync(string userId)
        {
            foreach (var like in await unit.Likes.GetLikesByUserId(userId))
            {
                yield return await unit.Posts.GetByPredicateAsync(p => p.Id == like.PostId);
            }
        }

        [HttpGet("getLikesCount")]
        public async Task<ActionResult<int>> GetLikesCountAsync(int postId)
        {
            var post = await unit.Posts.GetByIdAsync(postId);
            var likes = await unit.Likes.GetAllByPredicateAsync(l => l.PostId == postId);
            return Ok(likes.Count());
        }
    }
}
