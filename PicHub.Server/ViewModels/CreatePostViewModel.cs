using System.ComponentModel.DataAnnotations;

namespace PicHub.Server.ViewModels
{
    public class CreatePostViewModel
    {
        [MaxLength(250, ErrorMessage = "Caption must be 250 characters maximum.")]
        public string? Caption { get; set; }

        [Required]
        public required IFormFile ImageFile { get; set; }

        public bool TurnOffComments { get; set; }
    }
}