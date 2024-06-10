namespace PicHub.Server.Entities
{
    public class Save
    {
        public int PostId { get; set; }
        public Post Post { get; set; }

        public string UserId { get; set; }
        public AppUser User { get; set; }
    }
}