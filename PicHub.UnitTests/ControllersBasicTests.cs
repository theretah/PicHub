using System.Net;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using PicHub.Server.DTOs;

namespace PicHub.UnitTests
{
    public class ControllersBasicTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> factory;
        private readonly HttpClient client;
        private const string userId = "asdfag-sfd-fsdsfd-asfdafsd";
        private const string groupChatId = "1";
        private const string postId = "1";

        public ControllersBasicTests(WebApplicationFactory<Program> factory)
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

        [Theory]
        [InlineData($"group-chats/{groupChatId}/members")]
        [InlineData($"group-chats/{groupChatId}/members/{userId}")]
        public async Task HttpPost_NotAuthenticated_ReturnsUnauthorizedResult(string url)
        {
            var response = await client.PostAsync(url, null);

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task HttpPost_SendChatLineAsync_NotAuthenticated_ReturnsUnauthorizedResult()
        {
            var dto = new CreateChatLineDTO { Content = "a", ReplyingToId = null };
            var json = JsonSerializer.Serialize(dto);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await client.PostAsync("group-chats/1/chat-lines", data);

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task HttpPost_CreateAsync_NotAuthenticated_ReturnsUnauthorizedResult()
        {
            var dto = new CreateGroupChatDTO
            {
                Title = "a",
                IsPrivate = false,
                IsChannel = false,
            };
            var json = JsonSerializer.Serialize(dto);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await client.PostAsync("group-chats", data);

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }
    }
}
