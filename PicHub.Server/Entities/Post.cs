using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PicHub.Server.Entities
{
    public class Post
    {
        public int Id { get; set; }
        public byte[] PhotoContent { get; set; }
        public string? Caption { get; set; }
        public bool CommentsAllowed { get; set; }
        public DateTime CreateDate { get; set; }

        public AppUser Author { get; set; }
        public string AuthorId { get; set; }

        public IEnumerable<Save> UsersSaved { get; set; }
        public IEnumerable<Like> UsersLiked { get; set; }
    }
}