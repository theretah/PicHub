using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using PicHub.Server.Data;
using PicHub.Server.DTOs;
using PicHub.Server.Entities;

namespace PicHub.IntegrationTests
{
    public class AuthControllerTests(IntegrationTestsFixture factory)
        : IClassFixture<IntegrationTestsFixture>
    {
        [Fact]
        public async Task Register_ReturnsSuccessAndCorrectContentType()
        {
            // Arrange
            var client = factory.CreateClient();
            client.BaseAddress = new Uri("https://localhost:4000");
            var username = "username1";
            var password = "Password@1234";
            var registerDto = new RegisterDTO
            {
                UserName = username,
                Email = "user1@gmail.com",
                FullName = "",
                Password = password,
                AccountCategoryId = 1,
                ProfessionalCategoryId = null,
                GenderId = 1,
            };
            var json = JsonSerializer.Serialize(registerDto);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            // Act
            var response = await client.PostAsync("/api/auth/register", data);

            // Assert
            response.EnsureSuccessStatusCode();
            response.Content.Headers.ContentType.Should().NotBeNull();
            response
                .Content.Headers.ContentType.ToString()
                .Should()
                .Be("application/json; charset=utf-8");
            var responseContent = await response.Content.ReadAsStringAsync();
            var registerResponse = JsonSerializer.Deserialize<LoginDTO>(
                responseContent,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
            );
            registerResponse.UserName.Should().Be(username);
            registerResponse.Password.Should().Be(password);

            // Database Cleanup
            var scope = factory.Services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<PicHubContext>();
            Utilities.Cleanup(db);
        }
    }
}
