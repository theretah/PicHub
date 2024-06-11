using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PicHub.Server.Entities;
using PicHub.Server.Utilities;
using PicHub.Server.ViewModels;

namespace PicHub.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly UserManager<AppUser> userManager;
        private readonly IUserStore<AppUser> userStore;

        public AccountController(IConfiguration configuration, UserManager<AppUser> userManager, IUserStore<AppUser> userStore)
        {
            this.userStore = userStore;
            this.configuration = configuration;
            this.userManager = userManager;
        }

        [Authorize]
        [HttpGet("getloggedinuser")]
        public async Task<IActionResult> GetLoggedInUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized("User is not authenticated. From GetLoggedInUser().");
            }

            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                user.Id,
                user.UserName,
                user.Email,
                user.FullName,
                user.Bio,
                user.Gender,
                user.ProfileImageUrl
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            var existedUser = await userManager.FindByNameAsync(model.UserName);
            if (existedUser != null)
            {
                return BadRequest("User with this username already exists.");
            }

            var user = CreateUser();
            user.FullName = model.FullName;
            user.UserName = model.UserName;
            user.Email = model.Email;
            user.EmailConfirmed = true;
            user.RegistrationDate = DateTime.Now;

            var result = await userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                var token = JwtTokenGenerator.GenerateJwtToken(userManager, configuration, model.UserName);
                return Ok(new { token });
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            var user = await userManager.FindByNameAsync(model.UserName);
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {
                var token = JwtTokenGenerator.GenerateJwtToken(userManager, configuration, model.UserName);
                return Ok(new { token });
            }

            return BadRequest("Login failed. Invalid username or password.");
        }

        [HttpGet("getall")]
        public async Task<IEnumerable<AppUser>> GetAllUsers()
        {
            return await userManager.Users.ToListAsync();
        }
        [HttpGet("getuserscount")]
        public async Task<int> GetUsersCountAsync()
        {
            return await userManager.Users.CountAsync();
        }

        [HttpGet("getbyemail")]
        public async Task<AppUser> GetUserByEmail(string email)
        {
            return await userManager.FindByEmailAsync(email);
        }

        [HttpGet("getbyid")]
        public async Task<AppUser> GetUserById(string id)
        {
            return await userManager.FindByIdAsync(id);
        }

        [HttpGet("getbyusername")]
        public async Task<AppUser> GetUserByUsername(string userName)
        {
            return await userManager.FindByNameAsync(userName);
        }

        [Authorize]
        [HttpGet("getloggedinuserjson")]
        public async Task<IActionResult> GetLoggedInUserJson()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var loggedInUser = await userManager.FindByIdAsync(userId);
            return new JsonResult(loggedInUser);
        }

        [HttpGet("lastregistered")]
        public async Task<IEnumerable<AppUser>> GetLastRegisteredUsers()
        {
            return await userManager.Users.OrderByDescending(u => u.RegistrationDate).ToListAsync();
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

        private AppUser CreateUser()
        {
            try
            {
                return Activator.CreateInstance<AppUser>();
            }
            catch
            {
                throw new InvalidOperationException($"Can't create an instance of '{nameof(AppUser)}'. " +
                    $"Ensure that '{nameof(AppUser)}' is not an abstract class and has a parameterless constructor, or alternatively " +
                    $"override the register page in /Areas/Identity/Pages/Account/Register.cshtml");
            }
        }
    }
}