using System.ComponentModel.DataAnnotations;
using PicHub.Server.ValidationAttributes;

namespace PicHub.Server.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Username is required")]
        [UserNameRegexValidation]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [PasswordRegexValidation]
        public string Password { get; set; }
    }
}