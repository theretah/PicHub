using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PicHub.Server.Entities;
using PicHub.Server.ViewModels;

namespace PicHub.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<AppUser> signInManager;
        private readonly UserManager<AppUser> userManager;
        private readonly IUserStore<AppUser> userStore;

        public AccountController(SignInManager<AppUser> signInManager, UserManager<AppUser> userManager, IUserStore<AppUser> userStore)
        {
            this.userStore = userStore;
            this.signInManager = signInManager;
            this.userManager = userManager;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            var result = await signInManager.PasswordSignInAsync(model.UserName, model.Password, isPersistent: false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                return Ok(new { success = true });
            }
            else
            {
                return BadRequest("Login failed");
            }
        }

        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            if (signInManager.IsSignedIn(User))
            {
                await signInManager.SignOutAsync();
                return Ok(new { success = true });
            }
            else
            {
                return BadRequest("Logout failed");
            }
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
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterViewModel registerForm)
        {
            var user = CreateUser();

            user.FullName = registerForm.FullName;
            user.UserName = registerForm.UserName;
            user.Email = registerForm.Email;
            // user.PhoneNumber = registerForm.Phone;
            user.EmailConfirmed = true;
            // user.PhoneNumberConfirmed = true;
            user.RegistrationDate = DateTime.Now;

            var result = await userManager.CreateAsync(user, registerForm.Password);
            if (result.Succeeded)
            {
                await signInManager.SignInAsync(user, isPersistent: false);
                return Ok(new { success = true });
            }
            else
            {
                return BadRequest(result.Errors);
            }
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

        [HttpGet]
        [Route("getloggedinuser")]
        public async Task<AppUser> GetLoggedInUser()
        {
            return await userManager.GetUserAsync(User);
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
                throw new InvalidOperationException($"Can't create an instance of '{nameof(IdentityUser)}'. " +
                    $"Ensure that '{nameof(IdentityUser)}' is not an abstract class and has a parameterless constructor, or alternatively " +
                    $"override the register page in /Areas/Identity/Pages/Account/Register.cshtml");
            }
        }
    }
}