using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using PicHub.Server.ValidationAttributes;

namespace PicHub.Server.DTOs
{
    public class EditProfileDTO
    {
        [JsonProperty("profileImageFile")]
        public IFormFile? ProfileImageFile { get; set; }

        [MaxLength(50, ErrorMessage = "Full name must be 50 characters maximum.")]
        [JsonProperty("fullName")]
        public string? FullName { get; set; }

        [Required(ErrorMessage = "UserName is required")]
        [UserNameRegexValidation]
        [JsonProperty("userName")]
        public required string UserName { get; set; }

        [MaxLength(250, ErrorMessage = "Bio must be 250 characters maximum.")]
        [JsonProperty("bio")]
        public string? Bio { get; set; }

        [JsonProperty("genderId")]
        public int GenderId { get; set; }
    }
}
