using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using PicHub.Server.ValidationAttributes;

namespace PicHub.Server.DTOs
{
    public class UserDTO
    {
        [JsonProperty("id")]
        public required string Id { get; set; }

        [UserNameRegexValidation]
        [JsonProperty("userName")]
        public required string UserName { get; set; }

        [JsonProperty("fullName")]
        public string? FullName { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email address.")]
        [JsonProperty("email")]
        public required string Email { get; set; }

        [JsonProperty("profileImageUrl")]
        public byte[]? ProfileImageUrl { get; set; }

        [JsonProperty("registrationDate")]
        public DateTime RegistrationDate { get; set; }

        [JsonProperty("bio")]
        public string? Bio { get; set; }

        [JsonProperty("genderId")]
        public int GenderId { get; set; }

        [JsonProperty("accountCategoryId")]
        public int AccountCategoryId { get; set; }

        [JsonProperty("professionalCategoryId")]
        public int? ProfessionalCategoryId { get; set; }
    }
}
