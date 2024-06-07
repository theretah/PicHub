using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Pichub.Server.Utilities;
using PicHub.Server.Entities;
using PicHub.Server.ViewModels;

namespace PicHub.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;

        public UserController(UserManager<AppUser> userManager)
        {
            this.userManager = userManager;
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update(EditProfileViewModel model)
        {
            var user = await userManager.GetUserAsync(User);
            if (model.ProfileImageFile != null)
            { user.ProfileImageUrl = FileUtilities.FileToByteArray(model.ProfileImageFile); }
            user.FullName = model.FullName;
            user.UserName = model.UserName;
            user.Gender = model.Gender;
            user.Bio = model.Bio;
            try
            {
                var result = await userManager.UpdateAsync(user);
                if (result.Succeeded)
                { return Ok(); }
                else
                {
                    return BadRequest(result.Errors);
                }
            }
            catch (Exception)
            {
                return BadRequest("Profile could not be updated.");
            }
        }
    }
}