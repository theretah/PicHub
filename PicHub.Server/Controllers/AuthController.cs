using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.IdentityModel.Tokens;
using PicHub.Server.DTOs;
using PicHub.Server.Entities;
using PicHub.Server.ViewModels;

namespace PicHub.Server.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly UserManager<AppUser> userManager;
        private readonly IMapper mapper;

        public AuthController(
            IMapper mapper,
            IConfiguration configuration,
            UserManager<AppUser> userManager
        )
        {
            this.mapper = mapper;
            this.configuration = configuration;
            this.userManager = userManager;
        }

        [Authorize]
        [HttpGet("getLoggedInUser")]
        public async Task<IActionResult> GetLoggedInUser()
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
            {
                return Unauthorized();
            }

            var user = await userManager.FindByIdAsync(loggedInUserId);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<UserDto>(user));
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (await userManager.FindByEmailAsync(model.Email) != null)
            {
                return BadRequest("User with this email address already exists.");
            }

            if (await userManager.FindByNameAsync(model.UserName) != null)
            {
                return BadRequest("User with this username already exists.");
            }

            var user = new AppUser(
                userName: model.UserName,
                fullName: model.FullName,
                email: model.Email,
                phoneNumber: string.Empty,
                genderId: 0,
                isPrivate: false,
                accountCategoryId: 0
            );

            var result = await userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                var createdUser = await userManager.FindByNameAsync(model.UserName);
                if (
                    createdUser != null
                    && await userManager.CheckPasswordAsync(createdUser, model.Password)
                )
                {
                    var jwtConfigSection = configuration.GetSection("JwtConfig");
                    var token = GenerateToken(user.Id);
                    var response = new
                    {
                        UserName = createdUser.UserName,
                        Password = model.Password,
                    };
                    return CreatedAtAction(nameof(Login), new { id = createdUser.Id }, response);
                }
                return BadRequest("Unable to login as registered user.");
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
            if (user != null)
            {
                if (await userManager.CheckPasswordAsync(user, model.Password))
                {
                    var token = GenerateToken(user.Id);
                    return Ok(new { token });
                }
                return BadRequest("Failed to login with this password.");
            }
            return BadRequest("User with this username does not exist.");
        }

        private string GenerateToken(string userId)
        {
            var jwtConfigSection = configuration.GetSection("JwtConfig");
            var secret = jwtConfigSection["Secret"];
            var issuer = jwtConfigSection["ValidIssuer"];
            var audience = jwtConfigSection["ValidAudiences"];
            if (secret is null || issuer is null || audience is null)
            {
                throw new ApplicationException("Jwt config is not set in the configuration.");
            }

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity([new Claim(ClaimTypes.NameIdentifier, userId)]),
                Expires = DateTime.UtcNow.AddDays(1),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(
                    signingKey,
                    SecurityAlgorithms.HmacSha256
                ),
            };
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(securityToken);
        }
    }
}
