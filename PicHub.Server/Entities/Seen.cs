namespace PicHub.Server.Entities
{
    public class Seen
    {
        public required string SeenerId { get; set; }
        public AppUser? Seener { get; set; }

        public int ChatLineId { get; set; }
        public ChatLine? ChatLine { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
