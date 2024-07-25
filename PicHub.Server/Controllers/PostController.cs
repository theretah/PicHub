using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Pichub.Server.Utilities;
using PicHub.Server.Entities;
using PicHub.Server.ViewModels;

namespace PicHub.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly IUnitOfWork unit;
        private readonly UserManager<AppUser> userManager;
        private readonly IMemoryCache cache;

        public PostController(IUnitOfWork unit, UserManager<AppUser> userManager, IMemoryCache cache)
        {
            this.unit = unit;
            this.userManager = userManager;
            this.cache = cache;
        }

        [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<Post>>> GetAll()
        {
            if (!cache.TryGetValue("posts", out IEnumerable<Post> posts))
            {
                posts = await unit.Posts.GetAllAsync();
                cache.Set("posts", posts, TimeSpan.FromMinutes(5));
            }
            return Ok(posts);
        }

        [HttpGet("getAllByAuthorId")]
        public ActionResult<IAsyncEnumerable<Post>> GetAllByAuthorId(string authorId)
        {
            try
            {
                return Ok(unit.Posts.GetAllByAuthorIdAsync(authorId));
            }
            catch (Exception)
            {
                return BadRequest("Could not find posts created by this user.");
            }
        }

        [HttpGet("getAllByAuthorUserName")]
        public ActionResult<IAsyncEnumerable<Post>> GetAllByAuthorUserName(string userName)
        {
            try
            {
                var user = userManager.FindByNameAsync(userName).Result;
                if (user == null)
                {
                    return BadRequest("User not found.");
                }
                return Ok(unit.Posts.GetAllByAuthorIdAsync(user.Id));
            }
            catch (Exception)
            {
                return BadRequest("Could not find posts created by this user.");
            }
        }

        [HttpGet("get")]
        public async Task<IActionResult> Get(int id)
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
            catch (Exception)
            {
                return BadRequest();
            }
        }
        [HttpDelete("delete")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await unit.Posts.RemoveByIdAsync(id);
                await unit.CompleteAsync();
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(CreatePostViewModel model)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
            {
                return Unauthorized();
            }

            try
            {
                var imageFile = ImageUtilities.CompressImage(model.ImageFile, 1080);
                await unit.Posts.AddAsync(new Post
                {
                    Caption = model.Caption,
                    CommentsAllowed = !model.TurnOffComments,
                    AuthorId = loggedInUserId,
                    CreateDate = DateTime.Now,
                    PhotoContent = FileUtilities.FileToByteArray(imageFile),
                });
                await unit.CompleteAsync();
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest("Failed to add the post.");
            }
        }

        [HttpPost("save")]
        public async Task<IActionResult> Save(int postId)
        {
            try
            {
                var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (loggedInUserId == null)
                {
                    return Unauthorized();
                }

                var save = await unit.Saves.GetByPredicateAsync(s => s.UserId == loggedInUserId && s.PostId == postId);
                if (save != null)
                {
                    unit.Saves.Remove(save);
                    await unit.CompleteAsync();
                    return NoContent();
                }
                else
                {
                    await unit.Saves.AddAsync(new Save()
                    {
                        PostId = postId,
                        UserId = loggedInUserId
                    });
                    await unit.CompleteAsync();
                    return Created();
                }

            }
            catch (Exception)
            {
                return BadRequest("A problem occured.");
            }
        }

        [HttpGet("isSaved")]
        public async Task<IActionResult> IsSaved(int postId)
        {
            try
            {
                var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var isSaved = await unit.Saves.ExistsByPredicateAsync(l => l.PostId == postId && l.UserId == loggedInUserId);
                return Ok(isSaved);
            }
            catch (Exception)
            {
                return BadRequest("Could not get data.");
            }
        }

        [HttpGet("isLiked")]
        public async Task<IActionResult> IsLiked(int postId)
        {
            try
            {
                var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var isLiked = await unit.Likes.ExistsByPredicateAsync(l => l.PostId == postId && l.UserId == loggedInUserId);
                return Ok(isLiked);
            }
            catch (Exception)
            {
                return BadRequest("Could not get data.");
            }
        }

        [HttpPost("like")]
        public async Task<IActionResult> Like(int postId)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null) return Unauthorized();
            try
            {
                var post = await unit.Posts.GetByIdAsync(postId);
                var existingLike = await unit.Likes.GetByPredicateAsync(l => l.UserId == loggedInUserId && l.PostId == postId);
                if (existingLike != null)
                {
                    unit.Likes.Remove(existingLike);
                    post.LikesCount--;
                    unit.Posts.Update(post);
                    await unit.CompleteAsync();

                    return NoContent();
                }
                else
                {
                    await unit.Likes.AddAsync(new Like
                    {
                        UserId = loggedInUserId,
                        PostId = postId,
                    });
                    post.LikesCount++;
                    unit.Posts.Update(post);
                    await unit.CompleteAsync();

                    return Created();
                }
            }
            catch (Exception)
            {
                return BadRequest("A problem occured.");
            }
        }

        [HttpGet("getSavedPosts")]
        public async Task<ActionResult> GetSaveds()
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
            {
                return Unauthorized();
            }
            try
            {
                var postIds = new List<int>();

                await foreach (var save in unit.Saves.GetSavesByUserId(loggedInUserId))
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
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("getLikedPosts")]
        public async IAsyncEnumerable<Post> GetLikeds(string userId)
        {
            foreach (var like in await unit.Likes.GetLikesByUserId(userId))
            {
                yield return await unit.Posts.GetByPredicateAsync(p => p.Id == like.PostId);
            }
        }

        [HttpGet("getLikesCount")]
        public async Task<IActionResult> GetLikesCount(int postId)
        {
            var post = await unit.Posts.GetByIdAsync(postId);
            return Ok(post.LikesCount);
        }
    }
}