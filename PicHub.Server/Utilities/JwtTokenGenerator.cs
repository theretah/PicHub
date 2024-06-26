using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using PicHub.Server.Entities;

namespace PicHub.Server.Utilities
{
    public class JwtTokenGenerator
    {
        public static string GenerateJwtToken(UserManager<AppUser> userManager, IConfiguration configuration, string userName)
        {
            var user = userManager.FindByNameAsync(userName).Result;
            var secret = configuration["JwtConfig:Secret"];
            var issuer = configuration["JwtConfig:ValidIssuer"];
            var audience = configuration["JwtConfig:ValidAudience"];
            if (secret is null || issuer is null || audience is null)
            {
                throw new ApplicationException("Jwt config is not set.");
            }
            var claims = new[]
            {
                // new Claim(JwtRegisteredClaimNames.Sub, userName),
                // new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                // new Claim(ClaimTypes.Name, userName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}