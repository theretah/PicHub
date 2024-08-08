using System.ComponentModel.DataAnnotations;
using PicHub.Server.ValidationAttributes;

namespace PicHub.Server.ViewModels
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Username is required")]
        [UserNameRegexValidation]
        public required string UserName { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [PasswordRegexValidation]
        public required string Password { get; set; }

        [MaxLength(50)]
        public string? FullName { get; set; }
    }
}