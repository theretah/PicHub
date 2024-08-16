using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace PicHub.Server.Entities
{
    public class AppUser : IdentityUser
    {
        [MaxLength(50, ErrorMessage = "Full name cannot have more than 50 characters")]
        public string? FullName { get; set; }

        public byte[]? ProfileImageUrl { get; set; }
        public DateTime RegistrationDate { get; set; }
        public int Gender { get; set; }

        [MaxLength(250, ErrorMessage = "Bio cannot have more than 250 characters")]
        public string? Bio { get; set; }

        [MaxLength(80, ErrorMessage = "website cannot have more than 80 characters")]
        public string? Website { get; set; }

        public IEnumerable<Post>? CreatedPosts { get; set; }
        public IEnumerable<Save>? SavedPosts { get; set; }
        public IEnumerable<Like>? LikedPosts { get; set; }
        public IEnumerable<Follow>? Follows { get; set; }
        public IEnumerable<Chat>? Chats { get; set; }
    }
}