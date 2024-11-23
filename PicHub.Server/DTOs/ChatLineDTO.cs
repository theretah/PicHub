using Newtonsoft.Json;

namespace PicHub.Server.DTOs
{
    public class ChatLineDTO
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("privateChatId")]
        public string? PrivateChatId { get; set; }

        [JsonProperty("groupChatId")]
        public string? GroupChatId { get; set; }

        [JsonProperty("senderId")]
        public required string SenderId { get; set; }

        [JsonProperty("replyingToId")]
        public int? ReplyingToId { get; set; }

        [JsonProperty("content")]
        public required string Content { get; set; }

        [JsonProperty("createdAt")]
        public DateTime CreatedAt { get; set; }

        [JsonProperty("lastUpdatedAt")]
        public DateTime? LastUpdatedAt { get; set; }
    }
}
