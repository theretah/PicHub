using System.ComponentModel.DataAnnotations;
using PicHub.Server.ValidationAttributes;

namespace PicHub.Server.DTOs
{
    public class RegisterDto
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
        public required string? FullName { get; set; }

        public required int AccountCategoryId { get; set; }
        public required int? ProfessionalCategoryId { get; set; }
        public required int GenderId { get; set; }
    }
}
