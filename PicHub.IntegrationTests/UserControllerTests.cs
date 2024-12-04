using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using CMSReactDotNet.Server.Data.UnitOfWork;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using PicHub.Server.Data;
using PicHub.Server.Entities;

namespace PicHub.IntegrationTests
{
    public class UserControllerTests : IClassFixture<IntegrationTestsFixture>
    {
        private readonly IntegrationTestsFixture fixture;
        private readonly HttpClient client;

        public UserControllerTests(IntegrationTestsFixture fixture)
        {
            this.fixture = fixture;
            client = fixture.CreateClient();
            client.BaseAddress = new Uri("https://localhost:4000");
            var token = fixture.GenerateToken("userIdentification");
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
                "bearer",
                token
            );
        }

        [Fact]
        public async Task Update_NewUserName_UpdatesUserName()
        {
            // Arrange
            var patchDoc = new JsonPatchDocument<AppUser>();
            patchDoc.Replace(p => p.UserName, "new_username");
            var json = JsonConvert.SerializeObject(patchDoc);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            // Act
            var response = await client.PatchAsync("/api/users", data);

            // Assert
            response.EnsureSuccessStatusCode();
            var updatedUserResponse = await client.GetAsync("/api/auth/loggedInUser");
            var updatedUser = System.Text.Json.JsonSerializer.Deserialize<AppUser>(
                await updatedUserResponse.Content.ReadAsStringAsync(),
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
            );
            Assert.NotNull(updatedUser);
            Assert.Equal("new_username", updatedUser.UserName);

            // Database cleanup
            var scope = fixture.Services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<UnitOfWork>();
            await Utilities.CleanupAsync(db);
        }
    }
}
