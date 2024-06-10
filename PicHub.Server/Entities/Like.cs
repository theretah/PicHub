namespace PicHub.Server.Entities
{
    public class Like
    {
        public int PostId { get; set; }
        public Post Post { get; set; }

        public string UserId { get; set; }
        public AppUser User { get; set; }
    }
}