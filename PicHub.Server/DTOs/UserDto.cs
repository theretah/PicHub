using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PicHub.Server.DTOs
{
    public class UserDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public byte[]? ProfileImageUrl { get; set; }
        public DateTime RegistrationDate { get; set; }
        public int Gender { get; set; }
        public string? Bio { get; set; }
        public int FollowersCount { get; set; }
        public int FollowingsCount { get; set; }
    }
}