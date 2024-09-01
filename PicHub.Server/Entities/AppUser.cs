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
            int genderId,
            bool isPrivate,
            int accountCategoryId
        )
            : base(userName)
        {
            FullName = fullName;
            Email = email;
            GenderId = genderId;
            IsPrivate = isPrivate;
            RegistrationDate = DateTime.Now;
            PhoneNumber = phoneNumber;
            AccountCategoryId = accountCategoryId;
        }

        [MaxLength(50, ErrorMessage = "Full name cannot have more than 50 characters")]
        public string? FullName { get; set; }

        public byte[]? ProfileImageUrl { get; set; }
        public DateTime RegistrationDate { get; set; }
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
        public IEnumerable<Follow>? Follows { get; set; }
        public IEnumerable<Chat>? Chats { get; set; }
    }
}
