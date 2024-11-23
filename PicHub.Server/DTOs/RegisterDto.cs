using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using PicHub.Server.ValidationAttributes;

namespace PicHub.Server.DTOs
{
    public class RegisterDTO
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        [JsonProperty("email")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Username is required")]
        [UserNameRegexValidation]
        [JsonProperty("userName")]
        public required string UserName { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [PasswordRegexValidation]
        [JsonProperty("password")]
        public required string Password { get; set; }

        [MaxLength(50)]
        [JsonProperty("fullName")]
        public string? FullName { get; set; }

        [JsonProperty("accountCategoryId")]
        public required int AccountCategoryId { get; set; } = 1;

        [JsonProperty("professionalCategoryId")]
        public int? ProfessionalCategoryId { get; set; } = null;

        [JsonProperty("genderId")]
        public required int GenderId { get; set; } = 1;
    }
}
