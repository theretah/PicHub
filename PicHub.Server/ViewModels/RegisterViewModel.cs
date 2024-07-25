using System.ComponentModel.DataAnnotations;
using PicHub.Server.ValidationAttributes;

namespace PicHub.Server.ViewModels
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Username is required")]
        [UserNameRegexValidation]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [PasswordRegexValidation]
        public string Password { get; set; }

        [MaxLength(50)]
        public string? FullName { get; set; }
    }
}