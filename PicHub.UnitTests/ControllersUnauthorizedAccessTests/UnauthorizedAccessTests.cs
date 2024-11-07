using System.Net;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit.Abstractions;

namespace PicHub.UnitTests.ControllersUnauthorizedAccessTests
{
    public class UnauthorizedAccessTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly ITestOutputHelper testOutputHelper;
        private readonly HttpClient client;

        private const string userId = "asdfag-sfd-fsdsfd-asfdafsd";
        private const string groupChatId = "1";
        private const string chatLineId = "1";
        private const string privateChatId = "1";
        private const string postId = "1";

        public UnauthorizedAccessTests(
            WebApplicationFactory<Program> factory,
            ITestOutputHelper testOutputHelper
        )
        {
            this.testOutputHelper = testOutputHelper;
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
            testOutputHelper.WriteLine($"Testing authentication on POST url: {url}");
            var response = await client.PostAsync(url, data);
            testOutputHelper.WriteLine($"Response code: {response.StatusCode}");

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Theory]
        [InlineData($"blocks/{userId}")]
        [InlineData($"chat-lines/{chatLineId}")]
        [InlineData($"follows/{userId}")]
        [InlineData($"group-chats/{groupChatId}")]
        [InlineData($"group-chats/{groupChatId}/members")]
        [InlineData($"group-chats/{groupChatId}/members/{userId}")]
        [InlineData($"posts/{postId}")]
        [InlineData($"posts/{postId}/likes")]
        [InlineData($"posts/{postId}/saves")]
        [InlineData($"private-chats/{privateChatId}")]
        public async Task HttpDelete_NotAuthenticated_ReturnsUnauthorizedResult(string url)
        {
            testOutputHelper.WriteLine($"Testing authentication on DELETE url: {url}");
            var response = await client.DeleteAsync(url);
            testOutputHelper.WriteLine($"Response code: {response.StatusCode}");

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Theory]
        [MemberData(
            nameof(TestDataGenerator.HttpPut_Users_EditProfileAsync_EndpointData),
            MemberType = typeof(TestDataGenerator)
        )]
        [MemberData(
            nameof(TestDataGenerator.HttpPut_ChatLines_EditChatLineAsync_EndpointData),
            MemberType = typeof(TestDataGenerator)
        )]
        public async Task HttpPut_NotAuthenticated_ReturnsUnauthorizedResult(
            string url,
            HttpContent data
        )
        {
            testOutputHelper.WriteLine($"Testing authentication on PUT url: {url}");
            var response = await client.PutAsync(url, data);
            testOutputHelper.WriteLine($"Response code: {response.StatusCode}");

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Theory]
        [MemberData(
            nameof(TestDataGenerator.HttpPatch_Users_EditProfileAsync_EndpointData),
            MemberType = typeof(TestDataGenerator)
        )]
        public async Task HttpPatch_NotAuthenticated_ReturnsUnauthorizedResult(
            string url,
            HttpContent data
        )
        {
            testOutputHelper.WriteLine($"Testing authentication on PATCH url: {url}");
            var response = await client.PatchAsync(url, data);
            testOutputHelper.WriteLine($"Response code: {response.StatusCode}");

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }
    }
}
