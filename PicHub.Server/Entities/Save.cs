namespace PicHub.Server.Entities
{
    public class Save
    {
        public required int PostId { get; set; }
        public Post? Post { get; set; }

        public required string UserId { get; set; }
        public AppUser? User { get; set; }

        public DateTime DateTime { get; set; } = DateTime.Now;
    }
}
