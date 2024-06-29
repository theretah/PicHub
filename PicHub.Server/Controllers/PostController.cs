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
        public IAsyncEnumerable<Post> GetAll()
        {
            return unit.Posts.GetAllPostsDescendigAsync();
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
        public Post Get(int id)
        {
            return unit.Posts.Get(id);
        }

        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {
            try
            {
                unit.Posts.Remove(id);
                unit.Complete();
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("create")]
        public IActionResult Create(CreatePostViewModel model)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
            {
                return Unauthorized();
            }

            try
            {
                var imageFile = ImageUtilities.CompressImage(model.ImageFile, 1080);
                unit.Posts.Add(new Post
                {
                    Caption = model.Caption,
                    CommentsAllowed = !model.TurnOffComments,
                    AuthorId = loggedInUserId,
                    CreateDate = DateTime.Now,
                    PhotoContent = FileUtilities.FileToByteArray(imageFile),
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
        public IActionResult Save(int postId)
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
        public IActionResult IsSaved(int postId)
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
        public IActionResult IsLiked(int postId)
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
        public IActionResult Like(int postId)
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
            if (userId != null)
            {
                foreach (var save in await unit.Saves.GetSavesByUserId(userId))
                {
                    yield return unit.Posts.Find(p => p.Id == save.PostId).Single();
                }
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
        public IActionResult GetLikesCount(int postId)
        {
            var post = unit.Posts.Get(postId);
            return Ok(post.LikesCount);
        }
    }
}