using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using PicHub.Server.ValidationAttributes;

namespace PicHub.Server.DTOs
{
    public class LoginDTO
    {
        [Required(ErrorMessage = "Username is required")]
        [UserNameRegexValidation]
        [JsonProperty("userName")]
        public required string UserName { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [PasswordRegexValidation]
        [JsonProperty("password")]
        public required string Password { get; set; }
    }
}
