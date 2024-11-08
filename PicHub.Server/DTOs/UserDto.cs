using System.ComponentModel.DataAnnotations;
using PicHub.Server.ValidationAttributes;

namespace PicHub.Server.DTOs
{
    public class UserDTO
    {
        public required string Id { get; set; }

        [UserNameRegexValidation]
        public required string UserName { get; set; }

        public string? FullName { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public required string Email { get; set; }

        public byte[]? ProfileImageUrl { get; set; }
        public DateTime RegistrationDate { get; set; }
        public string? Bio { get; set; }
        public int GenderId { get; set; }
        public int AccountCategoryId { get; set; }
        public int? ProfessionalCategoryId { get; set; }
    }
}
