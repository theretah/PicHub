using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PicHub.Server.Entities
{
    public class Post
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public required byte[] PhotoContent { get; set; }

        [MaxLength(250, ErrorMessage = "Caption must be 250 characters maximum.")]
        public string? Caption { get; set; }

        public bool CommentsAllowed { get; set; }
        public DateTime CreateDate { get; set; }

        public required string AuthorId { get; set; }
        public AppUser? Author { get; set; }

        public IEnumerable<Save>? UsersSaved { get; set; }
        public IEnumerable<Like>? UsersLiked { get; set; }
    }
}