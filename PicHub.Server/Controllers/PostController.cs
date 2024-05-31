using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
        [HttpPost("create")]
        public async Task<IActionResult> CreatePost(CreatePostViewModel model)
        {
            var user = await userManager.GetUserAsync(User);
            try
            {
                unit.Posts.Add(new Post
                {
                    Caption = model.Caption,
                    CommentsAllowed = model.CommentsAllowed,
                    AuthorId = user.Id,
                    CreateDate = DateTime.Now,
                    PhotoContent = model.ImageData
                });
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest("Failed to add the post.");
            }

        }
    }
}