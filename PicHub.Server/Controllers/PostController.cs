using System.Security.Claims;
using AutoMapper;
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
        private readonly IMapper mapper;

        public PostController(IUnitOfWork unit, IMapper mapper)
        {
            this.unit = unit;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostDTO>>> GetAllAsync()
        {
            var posts = await unit.Posts.GetAllAsync();

            return posts.Any()
                ? Ok(
                    mapper.Map<IEnumerable<PostDTO>>(
                        posts.OrderByDescending(p => p.CreateDate).ToList()
                    )
                )
                : NoContent();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PostDTO>> GetAsync(int id)
        {
            var post = await unit.Posts.GetByIdAsync(id);
            return (post != null) ? Ok(mapper.Map<PostDTO>(post)) : NotFound();
        }

        [HttpGet("by-author/{user-id}")]
        public async Task<ActionResult<IEnumerable<PostDTO>>> GetAllByAuthorAsync(
            [FromRoute(Name = "user-id")] string userId
        )
        {
            var posts = await unit.Posts.GetAllByAuthorIdAsync(userId);
            return Ok(mapper.Map<IEnumerable<PostDTO>>(posts));
        }

        [HttpGet("by-author/{author-id}/count")]
        public async Task<ActionResult<int>> GetCountByAuthorAsync(
            [FromRoute(Name = "author-id")] string authorId
        )
        {
            var posts = await unit.Posts.GetAllByAuthorIdAsync(authorId);
            return Ok(posts.Any() ? posts.Count() : 0);
        }

        [HttpGet("{post-id}/likes-count")]
        public async Task<ActionResult<int>> GetLikesCountAsync(
            [FromRoute(Name = "post-id")] int postId
        )
        {
            return Ok(await unit.Likes.CountLikesByPostId(postId));
        }

        [HttpGet("{post-id}/is-saved")]
        public async Task<ActionResult<bool>> IsSavedAsync([FromRoute(Name = "post-id")] int postId)
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
        public async Task<ActionResult<bool>> IsLikedAsync([FromRoute(Name = "post-id")] int postId)
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
        public async Task<ActionResult<IEnumerable<PostDTO>>> GetLikedPostsAsync()
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            try
            {
                var postIds = new List<int>();

                var likesByUserId = await unit.Likes.GetLikesByUserId(loggedInUserId);
                if (!likesByUserId.Any())
                    return Ok();

                foreach (var like in likesByUserId)
                {
                    postIds.Add(like.PostId);
                }
                var posts = await unit.Posts.GetAllByPredicateAsync(p => postIds.Contains(p.Id));
                return Ok(mapper.Map<IEnumerable<PostDTO>>(posts));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("saves")]
        public async Task<ActionResult<IEnumerable<PostDTO>>> GetSavedPostsAsync()
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            try
            {
                var posts = new List<Post>();

                var savesByUserId = await unit.Saves.GetSavesByUserId(loggedInUserId);
                if (savesByUserId.Any())
                {
                    foreach (var save in savesByUserId)
                    {
                        posts.Add(await unit.Posts.GetByIdAsync(save.PostId));
                    }
                    return Ok(mapper.Map<IEnumerable<PostDTO>>(posts));
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<PostDTO>> CreateAsync(CreateEditPostDTO model)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            FormFile imageFile;
            try
            {
                imageFile = ImageUtilities.CompressImage(model.ImageFile, "imageContent", 1080);
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to compress image for the post. " + ex.Message);
            }
            var post = new Post
            {
                Caption = model.Caption,
                CommentsAllowed = model.CommentsAllowed,
                AuthorId = loggedInUserId,
                CreateDate = DateTime.Now,
                PhotoContent = FileUtilities.FileToByteArray(imageFile),
            };
            await unit.Posts.AddAsync(post);
            await unit.CompleteAsync();

            return Ok(mapper.Map<Post>(post));
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
        public async Task<ActionResult<PostDTO>> UpdateAsync(
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

            if (patchDoc == null)
                return BadRequest();

            patchDoc.ApplyTo(post, ModelState);
            if (!TryValidateModel(post))
                return BadRequest(ModelState);

            unit.Posts.Update(post);
            await unit.CompleteAsync();

            return Ok(mapper.Map<PostDTO>(post));
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
