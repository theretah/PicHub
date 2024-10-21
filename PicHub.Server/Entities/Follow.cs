namespace PicHub.Server.Entities
{
    public class Follow
    {
        public required string FollowerId { get; set; }
        public AppUser? Follower { get; set; }

        public required string FollowingId { get; set; }
        public AppUser? Following { get; set; }

        public DateTime DateTime { get; set; }
    }
}
