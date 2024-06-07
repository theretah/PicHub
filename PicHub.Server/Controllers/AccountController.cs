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
                var token = GenerateJwtToken(model.UserName);
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
                var token = GenerateJwtToken(model.UserName);
                return Ok(new { token });
            }

            return BadRequest("Login failed. Invalid username or password.");
        }
        private string GenerateJwtToken(string userName)
        {
            var user = userManager.FindByNameAsync(userName).Result;
            var secret = configuration["JwtConfig:ValidSecret"];
            var issuer = configuration["JwtConfig:ValidIssuer"];
            var audience = configuration["JwtConfig:ValidAudience"];
            if (secret is null || issuer is null || audience is null)
            {
                throw new ApplicationException("Jwt config is not set.");
            }
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, userName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpGet]
        [Route("getall")]
        public async Task<IEnumerable<AppUser>> GetAllUsers()
        {
            return await userManager.Users.ToListAsync();
        }
        public async Task<int> GetUsersCountAsync()
        {
            return await userManager.Users.CountAsync();
        }

        [HttpGet]
        [Route("getbyemail")]
        public async Task<AppUser> GetUserByEmail(string email)
        {
            return await userManager.FindByEmailAsync(email);
        }

        [HttpGet]
        [Route("getbyid")]
        public async Task<AppUser> GetUserById(string id)
        {
            return await userManager.FindByIdAsync(id);
        }

        [HttpGet]
        [Route("getbyusername")]
        public async Task<AppUser> GetUserByUsername(string userName)
        {
            return await userManager.FindByNameAsync(userName);
        }

        [HttpGet("getloggedinuser")]
        public async Task<IActionResult> GetLoggedInUser()
        {
            var userId = HttpContext.Items["UserId"]?.ToString();
            if (userId == null)
            {
                return Unauthorized();
            }

            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            var userProfile = new
            {
                user.Id,
                user.UserName,
                user.Email,
                user.FullName,
                user.Bio,
                user.Gender,
                user.ProfileImageUrl
            };

            return Ok(userProfile);
        }

        [HttpGet]
        [Route("getloggedinuserjson")]
        public async Task<IActionResult> GetLoggedInUserJson()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var loggedInUser = await userManager.FindByIdAsync(userId);
            return new JsonResult(loggedInUser);
        }

        [HttpGet]
        [Route("lastregistered")]
        public async Task<IEnumerable<AppUser>> GetLastRegisteredUsers()
        {
            return await userManager.Users.OrderByDescending(u => u.RegistrationDate).ToListAsync();
        }

        [HttpDelete]
        [Route("delete")]
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