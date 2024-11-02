namespace PicHub.Server.DTOs
{
    public class CreateChatLineDTO
    {
        public required string Content { get; set; }
        public int? ReplyingToId { get; set; } = null;
    }
}
