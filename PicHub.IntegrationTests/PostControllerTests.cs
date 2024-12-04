using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using CMSReactDotNet.Server.Data.UnitOfWork;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using PicHub.Server.Data;
using PicHub.Server.Entities;
using PicHub.Server.Utilities;
using Xunit.Abstractions;

namespace PicHub.IntegrationTests
{
    public class PostControllerTests : IClassFixture<IntegrationTestsFixture>
    {
        private readonly IntegrationTestsFixture fixture;
        private readonly ITestOutputHelper testOutputHelper;
        private readonly HttpClient client;

        public PostControllerTests(
            IntegrationTestsFixture fixture,
            ITestOutputHelper testOutputHelper
        )
        {
            this.fixture = fixture;
            this.testOutputHelper = testOutputHelper;
            client = fixture.CreateClient();
            client.BaseAddress = new Uri("https://localhost:4000");
            var token = fixture.GenerateToken("userIdentification");
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
                "bearer",
                token
            );
        }

        [Fact]
        public async Task Update_UpdatesAndReturnsCorrectResponse()
        {
            // Arrange
            int postId = 1;
            var patchDoc = new JsonPatchDocument<Post>();
            patchDoc.Replace(p => p.Caption, "New Caption");
            var json = JsonConvert.SerializeObject(patchDoc);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            // Act
            var response = await client.PatchAsync($"/api/posts/{postId}", data);

            // Assert
            response.EnsureSuccessStatusCode();
            var updatedPostResponse = await client.GetAsync($"/api/posts/{postId}");
            var updatedPost = System.Text.Json.JsonSerializer.Deserialize<Post>(
                await updatedPostResponse.Content.ReadAsStringAsync(),
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
            );
            Assert.NotNull(updatedPost);
            Assert.Equal("New Caption", updatedPost.Caption);

            // Database cleanup
            var scope = fixture.Services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<UnitOfWork>();
            await Utilities.CleanupAsync(db);
        }

        [Fact]
        public async Task Create_AddsToDbAndReturnsCorrectResponse()
        {
            // Arrange
            var base64String = ImageUtilities.SamplePngBytes();
            var imageContent = Convert.FromBase64String(base64String);
            using var memoryStream = new MemoryStream(imageContent);
            var imageFile = new FormFile(
                memoryStream,
                0,
                memoryStream.Length,
                "ImageFile",
                "testImage.png"
            )
            {
                Headers = new HeaderDictionary(),
                ContentType = "image/png",
            };

            var content = new MultipartFormDataContent
            {
                { new StreamContent(imageFile.OpenReadStream()), "ImageFile", imageFile.FileName },
                { new StringContent("Some caption"), "Caption" },
                { new StringContent("true"), "CommentsAllowed" },
            };

            // Act
            var response = await client.PostAsync("/api/posts", content);

            // Assert
            response.EnsureSuccessStatusCode();
            var responseContent = await response.Content.ReadAsStringAsync();
            testOutputHelper.WriteLine($"Response string: {responseContent}");

            var postCreatedRes = System.Text.Json.JsonSerializer.Deserialize<Post>(
                responseContent,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
            );
            Assert.NotNull(postCreatedRes);
            var entity = await client.GetAsync($"/api/posts/{postCreatedRes.Id}");
            Assert.NotNull(entity);
            Assert.Equal("Some caption", postCreatedRes.Caption);
            Assert.True(postCreatedRes.CommentsAllowed);

            // Database cleanup
            var scope = fixture.Services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<UnitOfWork>();
            await Utilities.CleanupAsync(db);
        }
    }
}
