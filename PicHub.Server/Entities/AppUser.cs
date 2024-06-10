using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace PicHub.Server.Entities
{
    public class AppUser : IdentityUser
    {
        public string FullName { get; set; }
        public byte[] ProfileImageUrl { get; set; }
        public DateTime RegistrationDate { get; set; }
        public int Gender { get; set; }
        public string Bio { get; set; }

        public IEnumerable<Post> CreatedPosts { get; set; }
        public IEnumerable<Save> SavedPosts { get; set; }
        public IEnumerable<Like> LikedPosts { get; set; }
    }
}