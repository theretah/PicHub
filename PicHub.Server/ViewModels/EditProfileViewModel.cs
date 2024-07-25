using System.ComponentModel.DataAnnotations;
using PicHub.Server.ValidationAttributes;

namespace PicHub.Server.ViewModels
{
    public class EditProfileViewModel
    {
        public IFormFile? ProfileImageFile { get; set; }

        [MaxLength(50, ErrorMessage = "Full name must be 50 characters maximum.")]
        public string? FullName { get; set; }

        [Required(ErrorMessage = "Username is required")]
        [UserNameRegexValidation]
        public string UserName { get; set; }

        [MaxLength(250, ErrorMessage = "Bio must be 250 characters maximum.")]
        public string? Bio { get; set; }

        public int Gender { get; set; }
    }
}