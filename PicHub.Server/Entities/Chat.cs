using System.ComponentModel.DataAnnotations.Schema;

namespace PicHub.Server.Entities
{
    public abstract class Chat
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public required string Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public abstract IEnumerable<ChatLine>? ChatLines { get; set; }
    }
}
