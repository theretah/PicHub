namespace PicHub.Server.Entities
{
    public class GroupChatUser
    {
        public required string GroupChatId { get; set; }
        public GroupChat? GroupChat { get; set; }

        public required string UserId { get; set; }
        public AppUser? AppUser { get; set; }
    }
}
