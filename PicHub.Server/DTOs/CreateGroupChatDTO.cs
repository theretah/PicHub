using Newtonsoft.Json;

namespace PicHub.Server.DTOs
{
    public class CreateGroupChatDTO
    {
        [JsonProperty("title")]
        public required string Title { get; set; }

        [JsonProperty("isPrivate")]
        public bool IsPrivate { get; set; }

        [JsonProperty("isChannel")]
        public bool IsChannel { get; set; }
    }
}
