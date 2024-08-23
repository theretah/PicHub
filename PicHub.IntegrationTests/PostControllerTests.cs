using Microsoft.AspNetCore.Mvc.Testing;

namespace PicHub.IntegrationTests
{
    public class PostControllerTests(WebApplicationFactory<Program> factory)
        : IClassFixture<WebApplicationFactory<Program>>
    {
        [Fact]
        public async Task GetAll_ReturnsSuccessAndCorrectCotnentType()
        {
            // Arrange
            var client = factory.CreateClient();

            // Act
            var response = await client.GetAsync("/api/post/getAll");

            // Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal(
                "application/json; charset=utf-8",
                response.Content.Headers.ContentType.ToString()
            );
        }
    }
}
