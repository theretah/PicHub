using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace PicHub.Server.DTOs
{
    public class CreateEditPostDTO
    {
        [MaxLength(250, ErrorMessage = "Caption must be 250 characters maximum.")]
        [JsonProperty("caption")]
        public string? Caption { get; set; }

        [Required]
        [JsonProperty("imageFile")]
        public required IFormFile ImageFile { get; set; }

        [JsonProperty("commentsAllowed")]
        public bool CommentsAllowed { get; set; }
    }
}
