using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Moq;
using PicHub.Server.Utilities;

namespace PicHub.UnitTests
{
    public class JWTTokenGeneratorTests
    {
        private const string UserId = "UserIdentification";

        private const string Issuer = "https://localhost:4000";
        private const string Audience = "https://localhost:4000";
        private const string Secret = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";

        private readonly Mock<IConfiguration> Config = new Mock<IConfiguration>();

        public JWTTokenGeneratorTests()
        {
            Config.SetupGet(c => c["JwtConfig:Secret"]).Returns(Secret);
            Config.SetupGet(c => c["JwtConfig:ValidIssuer"]).Returns(Issuer);
            Config.SetupGet(c => c["JwtConfig:ValidAudiences"]).Returns(Audience);
        }

        [Fact]
        public void GenerateJwtToken_ValidConfig_UserIdIsEqualToClaimNameIdentifier()
        {
            //Arrange
            var handler = new JwtSecurityTokenHandler();

            // Act
            var token = GenerateJwtToken(
                Config.Object["JwtConfig:Secret"],
                Config.Object["JwtConfig:ValidIssuer"],
                Config.Object["JwtConfig:ValidAudiences"],
                UserId
            );

            //Assert
            Assert.NotNull(token);
            var jwtToken = handler.ReadJwtToken(token);
            Assert.Equal(
                UserId,
                jwtToken.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value
            );
        }

        [Theory]
        [InlineData(null, Issuer, Audience)]
        [InlineData(Secret, null, Audience)]
        [InlineData(Secret, Issuer, null)]
        public void GenerateJwtToken_MissingConfig_ThrowsApplicationExceptionWithMessage(
            string secret,
            string issuer,
            string audience
        )
        {
            // Act & Assert
            var exception = Assert.Throws<ApplicationException>(
                () => GenerateJwtToken(secret, issuer, audience, UserId)
            );
            Assert.Equal("Jwt config is not set.", exception.Message);
        }

        private static string GenerateJwtToken(
            string? secret,
            string? validIssuer,
            string? validAudience,
            string userId
        )
        {
            if (secret is null || validIssuer is null || validAudience is null)
            {
                throw new ApplicationException("Jwt config is not set.");
            }
            var claims = new[] { new Claim(ClaimTypes.NameIdentifier, userId) };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: validIssuer,
                audience: validAudience,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
