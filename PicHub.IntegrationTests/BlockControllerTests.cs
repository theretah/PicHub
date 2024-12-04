using System.Net.Http.Headers;
using System.Text.Json;
using CMSReactDotNet.Server.Data.UnitOfWork;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using PicHub.Server.Data;
using PicHub.Server.Entities;

namespace PicHub.IntegrationTests
{
    public class BlockControllerTests : IClassFixture<IntegrationTestsFixture>
    {
        private readonly IntegrationTestsFixture fixture;
        private readonly HttpClient client;

        public BlockControllerTests(IntegrationTestsFixture fixture)
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
        public async Task Create_AddsToDbAndReturnsCorrectResponse()
        {
            // Act
            var response = await client.PostAsync("/api/blocks/userIdentification2", null);

            // Assert
            response.EnsureSuccessStatusCode();

            var getBlocksResponse = await client.GetAsync("/api/blocks");
            var blocks = System.Text.Json.JsonSerializer.Deserialize<IEnumerable<Block>>(
                await getBlocksResponse.Content.ReadAsStringAsync(),
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
            );
            var block = blocks.FirstOrDefault();
            block.Should().NotBeNull();
            Assert.Equal("userIdentification", block.BlockerId);
            Assert.Equal("userIdentification2", block.BlockedId);

            // Database cleanup
            var scope = fixture.Services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<UnitOfWork>();
            await Utilities.CleanupAsync(db);
        }

        [Fact]
        public async Task Delete_DeletesFromDbAndReturnsCorrectResponse()
        {
            // Act
            var response = await client.DeleteAsync("/api/blocks/userIdentification3");

            // Assert
            response.EnsureSuccessStatusCode();

            var getBlocksResponse = await client.GetAsync("/api/blocks/userIdentification3");
            var responseContent = await getBlocksResponse.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<bool>(responseContent);
            Assert.False(result);

            // Database cleanup
            var scope = fixture.Services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<UnitOfWork>();
            await Utilities.CleanupAsync(db);
        }
    }
}
