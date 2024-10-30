using System.ComponentModel.DataAnnotations;

namespace PicHub.Server.Entities
{
    public class GroupChat : Chat
    {
        public override IEnumerable<ChatLine>? ChatLines { get; set; }
        public IEnumerable<GroupChatUser>? Members { get; set; }

        [MaxLength(50)]
        public required string Title { get; set; }

        [MaxLength(250)]
        public string? Bio { get; set; }

        public required string OwnerId { get; set; }
        public bool IsDisabled { get; set; }
        public bool IsChannel { get; set; }
        public bool IsPrivate { get; set; }
    }
}
