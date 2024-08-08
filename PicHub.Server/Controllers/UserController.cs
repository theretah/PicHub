using System.Security.Claims;
using System.Text.Json;
using AutoMapper;
using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pichub.Server.Utilities;
using PicHub.Server.DTOs;
using PicHub.Server.Entities;
using PicHub.Server.ViewModels;

namespace PicHub.Server.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IUnitOfWork unit;
        private readonly ILogger<UserController> logger;
        private readonly IMapper mapper;
        private readonly IAppUserRepository userRepository;

        public UserController(UserManager<AppUser> userManager,
            IAppUserRepository userRepository,
            IUnitOfWork unit,
            ILogger<UserController> logger,
            IMapper mapper)
        {
            this.userRepository = userRepository;
            this.logger = logger;
            this.mapper = mapper;
            this.userManager = userManager;
            this.unit = unit;
        }

        [Authorize]
        [HttpPut("update")]
        public async Task<IActionResult> UpdateProfile([FromForm] EditProfileViewModel model)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
            {
                return Unauthorized();
            }

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

        [HttpGet("getPostsCount")]
        public async Task<IActionResult> GetPostsCount(string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user == null) return NotFound();
            var posts = await unit.Posts.GetAllByPredicateAsync(p => p.AuthorId == user.Id);
            return Ok(posts.Count());
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search(string? query, int pageNumber = 1, int pageSize = 5)
        {
            var (users, paginationMetadata) = await userRepository
                .Search(query, pageNumber, pageSize);

            Response.Headers.Append("X-Pagination", JsonSerializer.Serialize(paginationMetadata));
            return Ok(users);
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(mapper.Map<IEnumerable<UserDto>>(await userManager.Users.ToListAsync()));
        }

        [HttpGet("getUsersCount")]
        public async Task<IActionResult> GetUsersCountAsync()
        {
            return Ok(await userManager.Users.CountAsync());
        }

        [HttpGet("getByEmail")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(mapper.Map<UserDto>(user));
        }

        [HttpGet("getById")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(mapper.Map<UserDto>(user));
        }

        [HttpGet("getByUserName")]
        public async Task<IActionResult> GetUserByUsername(string userName)
        {
            var user = await userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(mapper.Map<UserDto>(user));
        }

        [HttpGet("lastRegistered")]
        public async Task<IActionResult> GetLastRegisteredUsers()
        {
            try
            {
                var lastRegisteredUsers = await userManager.Users.OrderByDescending(u => u.RegistrationDate).ToListAsync();
                return Ok(mapper.Map<IEnumerable<UserDto>>(lastRegisteredUsers));
            }
            catch (Exception)
            {
                return BadRequest("Problem occured while fetching last registerd users.");
            }
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user != null)
            {
                await userManager.DeleteAsync(user);
                return Ok(new { success = true });
            }
            return BadRequest("A problem occured while removing the user.");
        }
    }
}