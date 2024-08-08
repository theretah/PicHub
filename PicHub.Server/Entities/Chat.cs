using System.ComponentModel.DataAnnotations.Schema;
namespace PicHub.Server.Entities
{
    public class Chat
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public required string SenderId { get; set; }
        public AppUser? Sender { get; set; }

        public required string RecieverId { get; set; }
        public AppUser? Reciever { get; set; }

        public IEnumerable<Message>? Messages { get; set; }
    }
}