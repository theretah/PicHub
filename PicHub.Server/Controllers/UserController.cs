using System.Security.Claims;
using AutoMapper;
using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PicHub.Server.DTOs;
using PicHub.Server.Entities;
using PicHub.Server.Utilities;

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

        public UserController(
            UserManager<AppUser> userManager,
            IUnitOfWork unit,
            ILogger<UserController> logger,
            IMapper mapper
        )
        {
            this.logger = logger;
            this.mapper = mapper;
            this.userManager = userManager;
            this.unit = unit;
        }

        [HttpGet("search")]
        public ActionResult<IEnumerable<UserDTO>> Search([FromQuery(Name = "query")] string? query)
        {
            var usersQuery = userManager.Users.AsQueryable();

            if (!string.IsNullOrWhiteSpace(query))
            {
                usersQuery = usersQuery.Where(u =>
                    u.UserName.Trim().ToLower().Contains(query.Trim().ToLower())
                );
            }

            var users = usersQuery.OrderBy(u => u.UserName).ToList();

            return Ok(mapper.Map<UserDTO[]>(users));
        }

        [HttpGet]
        public ActionResult<IEnumerable<UserDTO>> GetAll()
        {
            var users = userManager.Users;

            var mapped = mapper.Map<IEnumerable<UserDTO>>(users);
            return Ok(mapped);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetAsync(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound();

            return Ok(mapper.Map<UserDTO>(user));
        }

        [HttpGet("by-email/{email}")]
        public async Task<ActionResult<UserDTO>> GetByEmailAsync(string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
                return NotFound();

            return Ok(mapper.Map<UserDTO>(user));
        }

        [HttpGet("by-username/{username}")]
        public async Task<ActionResult<UserDTO>> GetByUserNameAsync(string username)
        {
            var user = await userManager.FindByNameAsync(username);
            if (user == null)
                return NotFound();

            return Ok(mapper.Map<UserDTO>(user));
        }

        [HttpGet("last-registered")]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetLastRegisteredUsersAsync()
        {
            try
            {
                var lastRegisteredUsers = await userManager
                    .Users.OrderByDescending(u => u.RegistrationDate)
                    .Take(5)
                    .ToListAsync();
                return Ok(mapper.Map<IEnumerable<UserDTO>>(lastRegisteredUsers));
            }
            catch (Exception ex)
            {
                return BadRequest(
                    "Problem occured while fetching last registerd users. " + ex.Message
                );
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound();

            await userManager.DeleteAsync(user);
            return Ok(new { success = true });
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAllAsync()
        {
            var users = await userManager.Users.ToListAsync();
            foreach (var user in users)
            {
                await userManager.DeleteAsync(user);
            }
            return NoContent();
        }

        [HttpPatch]
        public async Task<IActionResult> UpdateAsync([FromBody] JsonPatchDocument<AppUser> patchDoc)
        {
            var loggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (loggedInUserId == null)
                return Unauthorized();

            var user = await userManager.FindByIdAsync(loggedInUserId);
            if (user == null)
                return Unauthorized();

            foreach (var operation in patchDoc.Operations)
            {
                if (operation.path.Equals("/username", StringComparison.OrdinalIgnoreCase))
                {
                    if (operation.op == "replace" || operation.op == "add")
                    {
                        var newUserName = operation.value as string;
                        var existingUser = await userManager.FindByNameAsync(newUserName);
                        if (existingUser != null && existingUser.Id != user.Id)
                            return BadRequest(
                                "User with this username already exists. Try another username."
                            );
                    }
                }
            }

            if (patchDoc == null)
                return BadRequest();

            patchDoc.ApplyTo(user, ModelState);
            if (!TryValidateModel(user))
                return BadRequest(ModelState);

            try
            {
                var result = await userManager.UpdateAsync(user);
                return result.Succeeded ? Ok() : BadRequest(result.Errors);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
