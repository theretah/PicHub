using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using PicHub.Server.Data;
using PicHub.Server.Options;

namespace PicHub.IntegrationTests
{
    public class IntegrationTestsFixture : WebApplicationFactory<Program>
    {
        private const string ConnectionString =
            "Server=.;Database=PicHubIntegrationTestDb;Trusted_Connection=True;Encrypt=false;";

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                // Remove the main database context in Program.cs
                var descriptor = services.SingleOrDefault(d =>
                    d.ServiceType == typeof(DbContextOptions<PicHubContext>)
                );
                services.Remove(descriptor);

                // Replace it with a test database context
                services.AddDbContext<PicHubContext>(options =>
                {
                    options.UseSqlServer(ConnectionString);
                });

                // Initialize the test database
                var sp = services.BuildServiceProvider();
                using (var scope = sp.CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<PicHubContext>();
                    dbContext.Database.EnsureCreated();
                    Utilities.InitializeDatabase(dbContext);
                }
            });
        }

        public string GenerateToken(string userId)
        {
            using var scope = Services.CreateScope();
            var configuration = scope.ServiceProvider.GetRequiredService<IConfiguration>();
            var jwtConfig = new JwtConfigurationOptions(configuration);
            var secret = jwtConfig.Secret;
            var issuer = jwtConfig.ValidIssuer;
            var audience = jwtConfig.ValidAudiences;
            if (secret is null || issuer is null || audience is null)
            {
                throw new ApplicationException("Jwt config is not set in the configuration.");
            }

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity([new Claim(ClaimTypes.NameIdentifier, userId)]),
                Expires = DateTime.UtcNow.AddDays(1),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(
                    signingKey,
                    SecurityAlgorithms.HmacSha256
                ),
            };
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(securityToken);
        }
    }
}
