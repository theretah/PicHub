using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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

        public PostController(IUnitOfWork unit, UserManager<AppUser> userManager)
        {
            this.unit = unit;
            this.userManager = userManager;
        }

        [HttpGet("getAll")]
        public async Task<IEnumerable<Post>> GetAll()
        {
            return unit.Posts.GetAll().OrderByDescending(p => p.CreateDate);
        }

        [HttpGet("getAllByAuthorId")]
        public async Task<IEnumerable<Post>> GetAllByAuthorId(string authorId)
        {
            return unit.Posts.Find(p => p.AuthorId == authorId);
        }

        [HttpGet("getAllByAuthorUserName")]
        public async Task<IEnumerable<Post>> GetAllByAuthorUserName(string userName)
        {
            var user = await userManager.FindByNameAsync(userName);
            return unit.Posts.Find(p => p.AuthorId == user.Id);
        }

        [HttpGet("get")]
        public async Task<Post> Get(int id)
        {
            return unit.Posts.Get(id);
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
                unit.Posts.Add(new Post
                {
                    Caption = model.Caption,
                    CommentsAllowed = !model.TurnOffComments,
                    AuthorId = loggedInUserId,
                    CreateDate = DateTime.Now,
                    PhotoContent = FileUtilities.FileToByteArray(model.ImageFile),
                });
                unit.Complete();
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
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId != null)
            {
                var save = unit.Saves.Find(s => s.UserId == loggedInUserId && s.PostId == postId).FirstOrDefault();
                if (save != null)
                {
                    unit.Saves.Remove(save);
                }
                else
                {
                    unit.Saves.Add(new Save()
                    {
                        PostId = postId,
                        UserId = loggedInUserId
                    });
                }
                unit.Complete();
                return Ok();
            }

            return BadRequest("Could not save this post.");
        }

        [HttpGet("isSaved")]
        public async Task<IActionResult> IsSaved(int postId)
        {
            try
            {
                var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var isSaved = unit.Saves.Find(l => l.PostId == postId && l.UserId == loggedInUserId).Any();
                return Ok(isSaved);
            }
            catch (Exception)
            {
                throw new Exception("Could not get data.");
            }
        }

        [HttpGet("isLiked")]
        public async Task<IActionResult> IsLiked(int postId)
        {
            try
            {
                var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var isLiked = unit.Likes.Find(l => l.PostId == postId && l.UserId == loggedInUserId).Any();
                return Ok(isLiked);
            }
            catch (Exception)
            {
                throw new Exception("Could not get data.");
            }
        }

        [HttpPost("like")]
        public async Task<IActionResult> Like(int postId)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId != null)
            {
                var post = unit.Posts.Get(postId);
                var existingLike = unit.Likes.Find(l => l.UserId == loggedInUserId && l.PostId == postId).FirstOrDefault();
                if (existingLike != null)
                {
                    unit.Likes.Remove(existingLike);
                    post.LikesCount--;
                    unit.Posts.Update(post);
                }
                else
                {
                    unit.Likes.Add(new Like
                    {
                        UserId = loggedInUserId,
                        PostId = postId,
                    });
                    post.LikesCount++;
                    unit.Posts.Update(post);
                }
                unit.Complete();
                return Created();
            }
            return BadRequest("Could not like this post.");
        }

        [HttpGet("getSavedPosts")]
        public async IAsyncEnumerable<Post> GetSaveds()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            foreach (var save in await unit.Saves.GetSavesByUserId(userId))
            {
                yield return unit.Posts.Find(p => p.Id == save.PostId).Single();
            }
        }

        [HttpGet("getLikedPosts")]
        public async IAsyncEnumerable<Post> GetLikeds(string userId)
        {
            foreach (var like in await unit.Likes.GetLikesByUserId(userId))
            {
                yield return unit.Posts.Find(p => p.Id == like.PostId).Single();
            }
        }

        [HttpGet("getLikesCount")]
        public async Task<IActionResult> GetLikesCount(int postId)
        {
            var post = unit.Posts.Get(postId);
            return Ok(post.LikesCount);
        }
    }
}