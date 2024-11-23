using Newtonsoft.Json;

namespace PicHub.Server.Controllers
{
    public class PrivateChatDTO
    {
        [JsonProperty("id")]
        public required string Id { get; set; }

        [JsonProperty("user1Id")]
        public required string User1Id { get; set; }

        [JsonProperty("user2Id")]
        public required string User2Id { get; set; }

        [JsonProperty("createdAt")]
        public DateTime CreatedAt { get; set; }
    }
}
