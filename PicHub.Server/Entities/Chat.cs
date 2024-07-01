namespace PicHub.Server.Entities
{
    public class Chat
    {
        public int Id { get; set; }

        public string SenderId { get; set; }
        public AppUser Sender { get; set; }

        public string RecieverId { get; set; }
        public AppUser Reciever { get; set; }

        public IEnumerable<Message> Messages { get; set; }
    }
}