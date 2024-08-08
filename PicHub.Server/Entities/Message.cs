using System.ComponentModel.DataAnnotations.Schema;

namespace PicHub.Server.Entities
{
    public class Message
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public required int ChatId { get; set; }
        public Chat? Chat { get; set; }

        public required string AuthorId { get; set; }

        public required string Content { get; set; }
        public DateTime DateTime { get; set; }
    }
}