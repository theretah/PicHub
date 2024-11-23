using Newtonsoft.Json;

namespace PicHub.Server.DTOs
{
    public class CreateChatLineDTO
    {
        [JsonProperty("content")]
        public required string Content { get; set; }

        [JsonProperty("replyingToId")]
        public int? ReplyingToId { get; set; } = null;
    }
}
