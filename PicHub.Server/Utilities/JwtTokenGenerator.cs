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
        public static string GenerateJwtToken(string? secret, string? validIssuer, string? validAudience, string userId)
        {
            if (secret is null || validIssuer is null || validAudience is null)
            {
                throw new ApplicationException($"Jwt config is not set. Secret: {secret != null}, Issuer: {validIssuer != null}, Audience: {validAudience != null}.");
            }
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userId),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: validIssuer,
                audience: validAudience,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}