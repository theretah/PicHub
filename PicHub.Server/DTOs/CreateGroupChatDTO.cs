namespace PicHub.Server.DTOs
{
    public class CreateGroupChatDTO
    {
        public required string Title { get; set; }
        public bool IsPrivate { get; set; }
        public bool IsChannel { get; set; }
    }
}
