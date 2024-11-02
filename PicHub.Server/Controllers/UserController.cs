using System.Security.Claims;
using AutoMapper;
using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PicHub.Server.DTOs;
using PicHub.Server.Entities;
using Pichub.Server.Utilities;

namespace PicHub.Server.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IUnitOfWork unit;
        private readonly ILogger<UserController> logger;
        private readonly IMapper mapper;
        private readonly IAppUserRepository userRepository;

        public UserController(
            UserManager<AppUser> userManager,
            IAppUserRepository userRepository,
            IUnitOfWork unit,
            ILogger<UserController> logger,
            IMapper mapper
        )
        {
            this.userRepository = userRepository;
            this.logger = logger;
            this.mapper = mapper;
            this.userManager = userManager;
            this.unit = unit;
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchByUserNameAsync(
            [FromQuery(Name = "query")] string? query
        )
        {
            return Ok(await userRepository.Search(query));
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsersAsync()
        {
            var users = await userManager.Users.ToListAsync();
            if (users.Any())
            {
                var mapped = mapper.Map<IEnumerable<UserDto>>(users);
                return Ok(mapped);
            }
            return NoContent();
        }

        [HttpGet("by-email/{email}")]
        public async Task<IActionResult> GetUserByEmailAsync(string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(mapper.Map<UserDto>(user));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserByIdAsync(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(mapper.Map<UserDto>(user));
        }

        [HttpGet("by-username/{username}")]
        public async Task<IActionResult> GetUserByUserNameAsync(string username)
        {
            var user = await userManager.FindByNameAsync(username);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(mapper.Map<UserDto>(user));
        }

        [HttpGet("last-registered")]
        public async Task<IActionResult> GetLastRegisteredUsersAsync()
        {
            try
            {
                var lastRegisteredUsers = await userManager
                    .Users.OrderByDescending(u => u.RegistrationDate)
                    .Take(5)
                    .ToListAsync();
                return Ok(mapper.Map<IEnumerable<UserDto>>(lastRegisteredUsers));
            }
            catch (Exception ex)
            {
                return BadRequest(
                    "Problem occured while fetching last registerd users. " + ex.Message
                );
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserAsync(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user != null)
            {
                await userManager.DeleteAsync(user);
                return Ok(new { success = true });
            }
            return BadRequest("A problem occured while removing the user.");
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateProfileAsync([FromForm] EditProfileDto model)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var user = await userManager.FindByIdAsync(loggedInUserId);
            if (user == null)
            {
                return Unauthorized();
            }

            var existingUser = await userManager.FindByNameAsync(model.UserName);
            if (existingUser != null && existingUser != user)
                return BadRequest("User with this username already exists. Try another username.");

            if (model.ProfileImageFile != null)
            {
                var imageFile = ImageUtilities.CompressImage(model.ProfileImageFile, 150);
                user.ProfileImageUrl = FileUtilities.FileToByteArray(imageFile);
            }
            else
            {
                user.ProfileImageUrl = null;
            }

            user.FullName = model.FullName;
            user.UserName = model.UserName;
            user.GenderId = model.GenderId;
            user.Bio = model.Bio;
            try
            {
                var result = await userManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest(result.Errors);
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
