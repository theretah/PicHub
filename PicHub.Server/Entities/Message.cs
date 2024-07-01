namespace PicHub.Server.Entities
{
    public class Message
    {
        public int Id { get; set; }

        public int ChatId { get; set; }
        public Chat Chat { get; set; }

        public string? Content { get; set; }
        public DateTime Date { get; set; }
    }
}