using System.Security.Claims;
using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using PicHub.Server.DTOs;
using PicHub.Server.Entities;
using PicHub.Server.Utilities;

namespace PicHub.Server.Controllers
{
    [ApiController]
    [Route("api/posts")]
    public class PostController : ControllerBase
    {
        private readonly IUnitOfWork unit;

        public PostController(IUnitOfWork unit)
        {
            this.unit = unit;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var posts = await unit.Posts.GetAllAsync();

            if (posts.Any())
                return Ok(posts.OrderByDescending(p => p.CreateDate).ToList());

            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(int id)
        {
            try
            {
                var post = await unit.Posts.GetByIdAsync(id);
                if (post != null)
                    return Ok(post);

                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("by-author/{user-id}")]
        public async Task<IActionResult> GetByAuthorAsync(
            [FromRoute(Name = "user-id")] string userId
        )
        {
            var posts = await unit.Posts.GetAllByAuthorIdAsync(userId);

            if (posts.Any())
                return Ok(posts);

            return NoContent();
        }

        [HttpGet("by-author/{user-id}/count")]
        public async Task<ActionResult<int>> GetCountByAuthorAsync(
            [FromRoute(Name = "user-id")] string userId
        )
        {
            var posts = await unit.Posts.GetAllByAuthorIdAsync(userId);
            if (posts.Any())
                return Ok(posts.Count());

            return Ok(0);
        }

        [HttpGet("{post-id}/likes-count")]
        public async Task<IActionResult> GetLikesCountAsync(
            [FromRoute(Name = "post-id")] int postId
        )
        {
            return Ok(await unit.Likes.CountLikesByPostId(postId));
        }

        [HttpGet("{post-id}/is-saved")]
        public async Task<IActionResult> IsSavedAsync([FromRoute(Name = "post-id")] int postId)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            try
            {
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

        [HttpGet("{post-id}/is-liked")]
        public async Task<IActionResult> IsLikedAsync([FromRoute(Name = "post-id")] int postId)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            try
            {
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

        [HttpGet("likes")]
        public async Task<IActionResult> GetLikedPostsAsync()
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            try
            {
                var postIds = new List<int>();

                var likesByUserId = await unit.Likes.GetLikesByUserId(loggedInUserId);
                if (!likesByUserId.Any())
                    return NotFound();

                foreach (var like in likesByUserId)
                {
                    postIds.Add(like.PostId);
                }

                return Ok(await unit.Posts.GetAllByPredicateAsync(p => postIds.Contains(p.Id)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("saves")]
        public async Task<IActionResult> GetSavedPostsAsync()
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            try
            {
                var postIds = new List<int>();

                var savesByUserId = await unit.Saves.GetSavesByUserId(loggedInUserId);
                if (!savesByUserId.Any())
                    return NotFound();

                foreach (var save in savesByUserId)
                {
                    postIds.Add(save.PostId);
                }

                return Ok(await unit.Posts.GetAllByPredicateAsync(p => postIds.Contains(p.Id)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateAsync(CreateEditPostDTO model)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

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

        [HttpPost("{post-id}/saves")]
        public async Task<IActionResult> SaveAsync([FromRoute(Name = "post-id")] int postId)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            try
            {
                await unit.Saves.AddAsync(new Save() { PostId = postId, UserId = loggedInUserId });
                await unit.CompleteAsync();
                return Created();
            }
            catch (Exception ex)
            {
                return BadRequest("A problem occured while saving the post. " + ex.Message);
            }
        }

        [HttpPost("{post-id}/likes")]
        public async Task<IActionResult> LikeAsync([FromRoute(Name = "post-id")] int postId)
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

        [HttpPatch("{post-id}")]
        public async Task<IActionResult> UpdateAsync(
            [FromRoute(Name = "post-id")] int postId,
            [FromBody] JsonPatchDocument<Post> patchDoc
        )
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var post = await unit.Posts.GetByIdAsync(postId);
            if (post == null)
                return NotFound();

            patchDoc.ApplyTo(post, ModelState);
            if (!TryValidateModel(post))
                return BadRequest(ModelState);

            unit.Posts.Update(post);
            await unit.CompleteAsync();

            return NoContent();
        }

        [HttpDelete("{post-id}/saves")]
        public async Task<IActionResult> UnSaveAsync([FromRoute(Name = "post-id")] int postId)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var existingSave = await unit.Saves.GetByPredicateAsync(s =>
                s.UserId == loggedInUserId && s.PostId == postId
            );
            if (existingSave != null)
            {
                unit.Saves.Remove(existingSave);
                await unit.CompleteAsync();
                return NoContent();
            }

            return BadRequest("Could not remove the post from saves.");
        }

        [HttpDelete("{post-id}/likes")]
        public async Task<IActionResult> DisLikeAsync([FromRoute(Name = "post-id")] int postId)
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

        [HttpDelete("{post-id}")]
        public async Task<IActionResult> DeleteAsync([FromRoute(Name = "post-id")] int postId)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            try
            {
                var post = await unit.Posts.GetByIdAsync(postId);
                if (post.AuthorId == loggedInUserId)
                {
                    unit.Posts.Remove(post);
                    await unit.CompleteAsync();
                    return NoContent();
                }
                return Forbid();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
