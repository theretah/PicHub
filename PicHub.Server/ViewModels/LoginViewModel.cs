using System.ComponentModel.DataAnnotations;
using PicHub.Server.ValidationAttributes;

namespace PicHub.Server.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Username is required")]
        [UserNameRegexValidation]
        public required string UserName { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [PasswordRegexValidation]
        public required string Password { get; set; }
    }
}