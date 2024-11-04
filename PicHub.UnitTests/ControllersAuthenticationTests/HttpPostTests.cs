using System.Net;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit.Abstractions;

namespace PicHub.UnitTests.ControllersAuthenticationTests
{
    public class HttpPostTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> factory;
        private readonly ITestOutputHelper output;
        private readonly HttpClient client;

        private const string userId = "asdfag-sfd-fsdsfd-asfdafsd";
        private const string groupChatId = "1";
        private const string privateChatId = "1";
        private const string postId = "1";

        public HttpPostTests(WebApplicationFactory<Program> factory, ITestOutputHelper output)
        {
            this.factory = factory;
            this.output = output;
            client = factory.CreateClient();
            client.BaseAddress = new Uri("https://localhost:4000/api/");
        }

        [Theory]
        [InlineData($"blocks/{userId}", null)]
        [InlineData($"follows/{userId}", null)]
        [InlineData($"private-chats/{userId}", null)]
        [InlineData($"group-chats/{groupChatId}/members", null)]
        [InlineData($"group-chats/{groupChatId}/members/{userId}", null)]
        [InlineData($"posts/{postId}/saves", null)]
        [InlineData($"posts/{postId}/likes", null)]
        [MemberData(
            nameof(TestDataGenerator.HttpPost_GroupChats_CreateGroupChatAsync_EndpointData),
            MemberType = typeof(TestDataGenerator)
        )]
        [MemberData(
            nameof(TestDataGenerator.HttpPost_GroupChats_SendChatLineAsync_EndpointData),
            MemberType = typeof(TestDataGenerator)
        )]
        [MemberData(
            nameof(TestDataGenerator.HttpPost_PrivateChats_SendChatLineAsync_EndpointData),
            MemberType = typeof(TestDataGenerator)
        )]
        [MemberData(
            nameof(TestDataGenerator.HttpPost_Posts_CreateAsync_EndpointData),
            MemberType = typeof(TestDataGenerator)
        )]
        public async Task HttpPost_NotAuthenticated_ReturnsUnauthorizedResult(
            string url,
            HttpContent data
        )
        {
            output.WriteLine($"Testing url: {url}");
            var response = await client.PostAsync(url, data);
            output.WriteLine($"Response code: {response.StatusCode}");

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }
    }
}
