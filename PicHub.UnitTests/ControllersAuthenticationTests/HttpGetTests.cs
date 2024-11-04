using System.Net;
using Microsoft.AspNetCore.Mvc.Testing;

namespace PicHub.UnitTests.ControllersAuthenticationTests
{
    public class HttpGetTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> factory;
        private readonly HttpClient client;

        private const string userId = "asdfag-sfd-fsdsfd-asfdafsd";
        private const string groupChatId = "1";
        private const string postId = "1";

        public HttpGetTests(WebApplicationFactory<Program> factory)
        {
            this.factory = factory;
            client = factory.CreateClient();
            client.BaseAddress = new Uri("https://localhost:4000/api/");
        }

        [Theory]
        [InlineData("auth")]
        [InlineData("blocks")]
        [InlineData($"follows/is-followed/{userId}")]
        [InlineData("group-chats")]
        [InlineData($"group-chats/{groupChatId}")]
        [InlineData($"group-chats/{groupChatId}/chat-lines")]
        [InlineData("private-chats")]
        [InlineData($"private-chats/{userId}")]
        [InlineData($"private-chats/{userId}/chat-lines")]
        [InlineData($"posts/{postId}/saves")]
        [InlineData($"posts/{postId}/likes")]
        [InlineData($"posts/likes")]
        [InlineData($"posts/saves")]
        public async Task HttpGet_NotAuthenticated_ReturnsUnauthorizedResult(string url)
        {
            var response = await client.GetAsync(url);

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }
    }
}
