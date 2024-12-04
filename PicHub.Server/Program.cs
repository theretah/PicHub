using System.Security.Claims;
using System.Text;
using System.Text.Json;
using AutoMapper;
using CMSReactDotNet.Server.Data.UnitOfWork;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PicHub.Server.Controllers;
using PicHub.Server.Data;
using PicHub.Server.DTOs;
using PicHub.Server.Entities;
using PicHub.Server.Extensions;
using PicHub.Server.Options;
using PicHub.Server.Validation;

public partial class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder
            .Services.AddControllers(o =>
            {
                o.Conventions.Add(
                    new RouteTokenTransformerConvention(new SlugifyParameterTransformer())
                );
                o.ModelBinderProviders.Insert(0, new SimpleTypeModelBinderProvider());
            })
            .AddJsonOptions(o =>
                o.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            )
            .AddNewtonsoftJson(o =>
            {
                o.SerializerSettings.ReferenceLoopHandling = Newtonsoft
                    .Json
                    .ReferenceLoopHandling
                    .Ignore;
                o.SerializerSettings.ContractResolver =
                    new Newtonsoft.Json.Serialization.DefaultContractResolver();
            });
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
        var mappingConfig = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<AppUser, UserDTO>();
            cfg.CreateMap<Post, PostDTO>();
            cfg.CreateMap<PrivateChat, PrivateChatDTO>();
            cfg.CreateMap<ChatLine, ChatLineDTO>();
        });
        builder.Services.AddSingleton(mappingConfig.CreateMapper());

        builder.Services.AddDbContext<PicHubContext>(
            (optionsBuilder) =>
            {
                optionsBuilder.UseSqlServer(
                    builder.Configuration.GetConnectionString("SqlServerConnection")
                );

                optionsBuilder.LogTo(Console.WriteLine);
            }
        );
        builder.Services.AddTransient<IUnitOfWork, UnitOfWork>();

        builder.Services.AddSingleton<IValidationService, ValidationService>();

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
                var jwtConfig = new JwtConfigurationOptions(builder.Configuration);
                var secret = jwtConfig.Secret;
                var issuer = jwtConfig.ValidIssuer;
                var audience = jwtConfig.ValidAudiences;
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

        app.MapGet(
            "/api/account-categories",
            async (IUnitOfWork unit) =>
            {
                return Results.Ok(await unit.AccountCategoryRepository.GetAllAsync());
            }
        );
        app.MapGet(
            "/api/professional-categories",
            async (IUnitOfWork unit) =>
            {
                return Results.Ok(await unit.ProfessionalCategoryRepository.GetAllAsync());
            }
        );

        app.Run();
    }
}
