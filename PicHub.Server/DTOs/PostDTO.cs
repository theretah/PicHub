using Newtonsoft.Json;

namespace PicHub.Server.DTOs
{
    public class PostDTO
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("photoContent")]
        public required byte[] PhotoContent { get; set; }

        [JsonProperty("caption")]
        public string? Caption { get; set; }

        [JsonProperty("commentsAllowed")]
        public bool CommentsAllowed { get; set; }

        [JsonProperty("createDate")]
        public DateTime CreateDate { get; set; }

        [JsonProperty("authorId")]
        public required string AuthorId { get; set; }
    }
}
