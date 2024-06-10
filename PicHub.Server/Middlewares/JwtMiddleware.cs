using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace PicHub.Server.Middlewares
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate next;
        private readonly IConfiguration configuration;

        public JwtMiddleware(RequestDelegate next, IConfiguration configuration)
        {
            this.next = next;
            this.configuration = configuration;
        }

        public async Task Invoke(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
                AttachUserToContext(context, token);

            await next(context);
        }

        private void AttachUserToContext(HttpContext context, string token)
        {
            try
            {
                var issuer = configuration["JwtConfig:ValidIssuer"];
                var audience = configuration["JwtConfig:ValidAudience"];

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(configuration["JwtConfig:Secret"]);
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    RequireSignedTokens = true,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero,
                    RequireExpirationTime = false
                };

                var principal = tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);

                var jwtToken = validatedToken as JwtSecurityToken;

                var userIdClaim = jwtToken?.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
                if (userIdClaim != null)
                {
                    context.Items["UserId"] = userIdClaim.Value;
                }
                else
                {
                    Console.WriteLine("No NameIdentifier claim found in token.");
                }
            }
            catch
            {
                throw new Exception("Jwt validation failed.");
            }
        }
    }
}