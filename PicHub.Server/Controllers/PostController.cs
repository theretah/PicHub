using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CMSReactDotNet.Server.Data.IRepositories;
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

        [HttpGet("getall")]
        public async Task<IEnumerable<Post>> GetAllPosts()
        {
            return unit.Posts.GetAll().OrderByDescending(p => p.CreateDate);
        }

        [HttpGet("getallbyauthor")]
        public async Task<IEnumerable<Post>> GetAllPostsByAuthor(string authorId)
        {
            return unit.Posts.Find(p => p.AuthorId == authorId);
        }

        [HttpGet("get")]
        public async Task<Post> Get(int id)
        {
            return unit.Posts.Get(id);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreatePost(CreatePostViewModel model)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }

            try
            {
                unit.Posts.Add(new Post
                {
                    Caption = model.Caption,
                    CommentsAllowed = !model.TurnOffComments,
                    AuthorId = userId,
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
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId != null)
            {
                var save = unit.Saves.Find(s => s.UserId == userId && s.PostId == postId).FirstOrDefault();
                if (save != null)
                {
                    unit.Saves.Remove(save);
                }
                else
                {
                    unit.Saves.Add(new Save()
                    {
                        PostId = postId,
                        UserId = userId
                    });
                }
                unit.Complete();
                return Ok();
            }

            return BadRequest("Could not save this post.");
        }

        [HttpGet("issaved")]
        public async Task<IActionResult> IsSaved(int postId)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var isSaved = unit.Saves.Find(l => l.PostId == postId && l.UserId == userId).Any();
                return Ok(isSaved);
            }
            catch (Exception)
            {
                throw new Exception("Could not get data.");
            }
        }

        [HttpGet("isliked")]
        public async Task<IActionResult> IsLiked(int postId)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var isLiked = unit.Likes.Find(l => l.PostId == postId && l.UserId == userId).Any();
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
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId != null)
            {
                var existingLike = unit.Likes.Find(l => l.UserId == userId && l.PostId == postId).FirstOrDefault();
                if (existingLike != null)
                {
                    unit.Likes.Remove(existingLike);
                }
                else
                {
                    unit.Likes.Add(new Like
                    {
                        UserId = userId,
                        PostId = postId,
                    });
                }
                unit.Complete();
                return Ok();
            }
            return BadRequest("Could not like this post.");
        }
    }
}