using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using Moq;
using PicHub.Server.Utilities;

namespace PicHub.Tests
{
    public class JWTTokenGeneratorTests
    {
        private readonly string UserId = "UserIdentification";

        private const string Issuer = "https://localhost:4000";
        private const string Audience = "https://localhost:4000";
        private const string Secret = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";

        private Mock<IConfiguration> Config = new Mock<IConfiguration>();

        public JWTTokenGeneratorTests()
        {
            Config.SetupGet(c => c["JwtConfig:Secret"]).Returns(Secret);
            Config.SetupGet(c => c["JwtConfig:ValidIssuer"]).Returns(Issuer);
            Config.SetupGet(c => c["JwtConfig:ValidAudiences"]).Returns(Audience);
        }

        [Fact]
        public void GenerateJwtToken_ValidConfig_TokenIsNotNull()
        {
            // Act
            var token = JwtTokenGenerator.GenerateJwtToken(
                Config.Object["JwtConfig:Secret"],
                Config.Object["JwtConfig:ValidIssuer"],
                Config.Object["JwtConfig:ValidAudiences"],
                UserId);

            //Assert
            Assert.NotNull(token);
        }

        [Fact]
        public void GenerateJwtToken_ValidConfig_UserIdIsEqualToClaimNameIdentifier()
        {
            //Arrange
            var handler = new JwtSecurityTokenHandler();

            // Act
            var token = JwtTokenGenerator.GenerateJwtToken(
                    Config.Object["JwtConfig:Secret"],
                    Config.Object["JwtConfig:ValidIssuer"],
                    Config.Object["JwtConfig:ValidAudiences"],
                    UserId);
            var jwtToken = handler.ReadJwtToken(token);

            //Assert
            Assert.Equal(UserId, jwtToken.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value);
        }

        [Theory]
        [InlineData(null, Issuer, Audience)]
        [InlineData(Secret, null, Audience)]
        [InlineData(Secret, Issuer, null)]
        public void GenerateJwtToken_MissingConfig_ThrowsApplicationExceptionWithMessage(string secret, string issuer, string audience)
        {
            //Arrange
            var mockConfiguration = new Mock<IConfiguration>();
            mockConfiguration.SetupGet(config => config["JwtConfig:Secret"]).Returns(secret);
            mockConfiguration.SetupGet(config => config["JwtConfig:ValidIssuer"]).Returns(issuer);
            mockConfiguration.SetupGet(config => config["JwtConfig:ValidAudiences"]).Returns(audience);

            //Act & Assert 
            var exception = Assert.Throws<ApplicationException>(() =>
                JwtTokenGenerator.GenerateJwtToken(
                    mockConfiguration.Object["JwtConfig:Secret"],
                    mockConfiguration.Object["JwtConfig:ValidIssuer"],
                    mockConfiguration.Object["JwtConfig:ValidAudiences"],
                    UserId));
            Assert.Equal("Jwt config is not set in the configuration.", exception.Message);
        }
    }
}