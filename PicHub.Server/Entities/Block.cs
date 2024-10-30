namespace PicHub.Server.Entities
{
    public class Block
    {
        public required string BlockerId { get; set; }
        public AppUser? Blocker { get; set; }

        public required string BlockedId { get; set; }
        public AppUser? Blocked { get; set; }
    }
}
