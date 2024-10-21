using System.Security.Claims;
using System.Text;
using AutoMapper;
using CMSReactDotNet.Server.Data.IRepositories;
using CMSReactDotNet.Server.Data.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PicHub.Server.Data;
using PicHub.Server.DTOs;
using PicHub.Server.Entities;
using PicHub.Server.Options;
using PicHub.Server.Validation;

public partial class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder
            .Services.AddControllers()
            .AddNewtonsoftJson(o =>
                o.SerializerSettings.ReferenceLoopHandling = Newtonsoft
                    .Json
                    .ReferenceLoopHandling
                    .Ignore
            );

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(options =>
        {
            options.AddSecurityDefinition(
                "Bearer",
                new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme.",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "bearer",
                }
            );
            options.AddSecurityRequirement(
                new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer",
                            },
                        },
                        new string[] { }
                    },
                }
            );
        });

        builder.Services.AddTransient<IUnitOfWork, UnitOfWork>();
        builder.Services.AddTransient<IAppUserRepository, AppUserRepository>();
        builder.Services.AddSingleton<IMemoryCache, MemoryCache>();
        builder.Services.AddSingleton<IValidationService, ValidationService>();

        var mappingConfig = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<AppUser, UserDto>();
        });
        builder.Services.AddSingleton(mappingConfig.CreateMapper());

        builder.Services.ConfigureOptions<DatabaseOptionsSetup>();
        builder.Services.AddDbContext<PicHubContext>(
            (optionsBuilder) =>
            {
                optionsBuilder.UseSqlServer(
                    builder.Configuration.GetConnectionString("SqlServerConnection")
                );

                optionsBuilder.LogTo(Console.WriteLine);
            }
        );

        builder
            .Services.AddIdentityCore<AppUser>(options =>
            {
                options.SignIn.RequireConfirmedAccount = false;
                options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
            })
            .AddEntityFrameworkStores<PicHubContext>()
            .AddDefaultTokenProviders();

        builder
            .Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                var jwtConfigOptions = new JwtConfigurationOptions();
                builder
                    .Configuration.GetSection(JwtConfigurationOptions.Position)
                    .Bind(jwtConfigOptions);
                var secret = jwtConfigOptions.Secret;
                var issuer = jwtConfigOptions.ValidIssuer;
                var audience = jwtConfigOptions.ValidAudiences;
                if (secret is null || issuer is null || audience is null)
                {
                    throw new ApplicationException("Jwt config is not set in the configuration.");
                }

                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = issuer,
                    ValidAudience = audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret)),
                };
            });

        builder.Services.AddAuthorization();

        builder
            .Services.AddApiVersioning(setupAction =>
            {
                setupAction.ReportApiVersions = true;
                setupAction.AssumeDefaultVersionWhenUnspecified = true;
            })
            .AddMvc();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            mappingConfig.AssertConfigurationIsValid();
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        app.UseDefaultFiles();
        app.UseStaticFiles();
        app.UseHttpsRedirection();

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.MapFallbackToFile("/index.html");

        app.Run();
    }
}
