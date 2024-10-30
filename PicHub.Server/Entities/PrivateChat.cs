namespace PicHub.Server.Entities
{
    public class PrivateChat : Chat
    {
        public override IEnumerable<ChatLine>? ChatLines { get; set; }

        public required string User1Id { get; set; }
        public AppUser? User1 { get; set; }

        public required string User2Id { get; set; }
        public AppUser? User2 { get; set; }
    }
}
