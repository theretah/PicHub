using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace PicHub.Server.Entities
{
    public class AppUser : IdentityUser
    {
        public AppUser(
            string userName,
            string fullName,
            string email,
            string phoneNumber,
            bool isPrivate,
            int genderId,
            int? professionalCategoryId,
            int accountCategoryId
        )
            : base(userName)
        {
            FullName = fullName;
            Email = email;
            PhoneNumber = phoneNumber;
            IsPrivate = isPrivate;
            GenderId = genderId;
            AccountCategoryId = accountCategoryId;
            ProfessionalCategoryId = professionalCategoryId;
        }

        [MaxLength(50, ErrorMessage = "Full name cannot have more than 50 characters")]
        public string? FullName { get; set; }

        public byte[]? ProfileImageUrl { get; set; }
        public DateTime RegistrationDate { get; set; } = DateTime.Now;
        public bool IsPrivate { get; set; }

        [MaxLength(250, ErrorMessage = "Bio cannot have more than 250 characters")]
        public string? Bio { get; set; }

        [MaxLength(80, ErrorMessage = "Website cannot have more than 80 characters")]
        public string? Website { get; set; }

        public int GenderId { get; set; }
        public Gender? Gender { get; set; }

        public int AccountCategoryId { get; set; }
        public AccountCategory? AccountCategory { get; set; }

        public int? ProfessionalCategoryId { get; set; }
        public ProfessionalCategory? ProfessionalCategory { get; set; }

        public IEnumerable<Post>? CreatedPosts { get; set; }

        public IEnumerable<Save>? SavedPosts { get; set; }
        public IEnumerable<Like>? LikedPosts { get; set; }
        public IEnumerable<Seen>? SeenChatLines { get; set; }

        public IEnumerable<Follow>? Followers { get; set; }
        public IEnumerable<Follow>? Followings { get; set; }
        public IEnumerable<Block>? BlockedUsers { get; set; }

        public IEnumerable<PrivateChat>? PrivateChats { get; set; }
        public IEnumerable<GroupChatUser>? GroupChats { get; set; }
    }
}
