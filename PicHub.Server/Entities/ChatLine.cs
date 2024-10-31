namespace PicHub.Server.Entities
{
    public class ChatLine
    {
        public int Id { get; set; }

        public string? PrivateChatId { get; set; }
        public PrivateChat? PrivateChat { get; set; }

        public string? GroupChatId { get; set; }
        public GroupChat? GroupChat { get; set; }

        public required string SenderId { get; set; }
        public AppUser? Sender { get; set; }

        public int? ReplyingToId { get; set; }
        public ChatLine? ReplyingTo { get; set; }

        public required string Content { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? LastUpdatedAt { get; set; }

        public IEnumerable<Seen>? UsersSeens { get; set; }
    }
}
