using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using CMSReactDotNet.Server.Data.UnitOfWork;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using PicHub.Server.Data;
using PicHub.Server.DTOs;

namespace PicHub.IntegrationTests
{
    public class AuthControllerTests : IClassFixture<IntegrationTestsFixture>
    {
        private readonly IntegrationTestsFixture fixture;
        private readonly HttpClient client;

        public AuthControllerTests(IntegrationTestsFixture fixture)
        {
            this.fixture = fixture;
            client = fixture.CreateClient();
            client.BaseAddress = new Uri("https://localhost:4000");
        }

        [Fact]
        public async Task Register_LoginsAndReturnsSuccessAndCorrectContentType()
        {
            // Arrange
            var username = "registered_user";
            var password = "Password@1234";
            var registerDto = new RegisterDTO
            {
                UserName = username,
                Email = "registered_user@gmail.com",
                FullName = "Registered User",
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
            registerResponse.Should().NotBeNull();
            registerResponse.UserName.Should().Be(username);
            registerResponse.Password.Should().Be(password);

            var loginJson = JsonSerializer.Serialize(registerResponse);
            var loginData = new StringContent(loginJson, Encoding.UTF8, "application/json");
            var loginReponse = await client.PostAsync("/api/auth/login", loginData);
            loginReponse.Should().NotBeNull();

            // Database Cleanup
            var scope = fixture.Services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();
            await Utilities.CleanupAsync(db);
        }

        [Fact]
        public async Task DeleteAccount_DeletesUserAndReturnsCorrectResponse()
        {
            // Arrange
            var token = fixture.GenerateToken("userIdentification");
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
                "bearer",
                token
            );

            // Act
            var response = await client.DeleteAsync("/api/auth");

            // Assert
            response.EnsureSuccessStatusCode();
            var deletedUserResponse = await client.GetAsync("/api/users/userIdentication");
            Assert.Equal(HttpStatusCode.NotFound, deletedUserResponse.StatusCode);

            // Database Cleanup
            var scope = fixture.Services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();
            await Utilities.CleanupAsync(db);
        }
    }
}
