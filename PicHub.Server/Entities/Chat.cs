using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace PicHub.Server.Entities
{
    public class Chat
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string SenderId { get; set; }
        public AppUser? Sender { get; set; }

        public string RecieverId { get; set; }
        public AppUser? Reciever { get; set; }

        public IEnumerable<Message> Messages { get; set; }
    }
}