using System.ComponentModel.DataAnnotations;
using PicHub.Server.ValidationAttributes;

namespace PicHub.Server.DTOs
{
    public class LoginDTO
    {
        [Required(ErrorMessage = "Username is required")]
        [UserNameRegexValidation]
        public required string UserName { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [PasswordRegexValidation]
        public required string Password { get; set; }
    }
}
