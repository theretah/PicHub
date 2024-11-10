using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.JsonPatch.Operations;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using PicHub.Server.Data;
using PicHub.Server.Entities;

namespace PicHub.IntegrationTests
{
    public class PostControllerTests : IClassFixture<IntegrationTestsFixture>
    {
        private readonly IntegrationTestsFixture fixture;
        private readonly HttpClient client;

        public PostControllerTests(IntegrationTestsFixture fixture)
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
        public async Task Update_NewCaption_UpdatesCaptionField()
        {
            // Arrange
            int postId = 1;
            var patchDoc = new JsonPatchDocument<Post>();
            patchDoc.Replace(p => p.Caption, "New Caption");
            var json = JsonConvert.SerializeObject(patchDoc);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            // Act
            var actionResult = await client.PatchAsync($"/api/posts/{postId}", data);

            // Assert
            Assert.Equal(HttpStatusCode.OK, actionResult.StatusCode);
            var updatedPostResponse = await client.GetAsync($"/api/posts/{postId}");
            var updatedPost = System.Text.Json.JsonSerializer.Deserialize<Post>(
                await updatedPostResponse.Content.ReadAsStringAsync(),
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
            );
            Assert.NotNull(updatedPost);
            Assert.Equal("New Caption", updatedPost.Caption);

            // Database cleanup
            var scope = fixture.Services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<PicHubContext>();
            Utilities.Cleanup(db);
        }
    }
}
