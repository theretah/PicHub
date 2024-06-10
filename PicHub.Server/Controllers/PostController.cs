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
            var userName = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userName == null)
            {
                return Unauthorized();
            }

            var user = await userManager.FindByNameAsync(userName);
            try
            {
                unit.Posts.Add(new Post
                {
                    Caption = model.Caption,
                    CommentsAllowed = !model.TurnOffComments,
                    AuthorId = user.Id,
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
            return BadRequest();
        }

        [HttpPost("like")]
        public async Task<IActionResult> Like(int postId)
        {
            return BadRequest();
        }
    }
}