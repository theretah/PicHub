using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration.UserSecrets;
using Microsoft.VisualBasic;
using Moq;
using PicHub.Server.Controllers;

namespace PicHub.UnitTests
{
    public class ControllersBasicTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> factory;
        private string guid = Guid.NewGuid().ToString();
        private const string userId = "asdfag-sfd-fsdsfd-asfdafsd";

        public ControllersBasicTests(WebApplicationFactory<Program> factory)
        {
            this.factory = factory;
        }

        [Theory]
        [InlineData("private-chats")]
        [InlineData($"private-chats/{userId}")]
        [InlineData($"private-chats?user-id={userId}")]
        [InlineData($"private-chats/{userId}/chat-lines")]
        [InlineData($"private-chats?user-id={userId}/chat-lines")]
        public async Task Get_NotAuthenticated_ReturnsUnauthorizedResult(string url)
        {
            var client = factory.CreateClient();
            client.BaseAddress = new Uri("https://localhost:4000/api/");

            var response = await client.GetAsync(url);

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }
    }
}
