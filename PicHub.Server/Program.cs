using CMSReactDotNet.Server.Data.IRepositories;
using CMSReactDotNet.Server.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using PicHub.Server.Data;
using PicHub.Server.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<IUnitOfWork, UnitOfWork>();

string connectionString = builder.Configuration.GetConnectionString("SqlServerConnection");
builder.Services.AddDbContext<PichubContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddDefaultIdentity<AppUser>(options =>
options.SignIn.RequireConfirmedAccount = false).AddEntityFrameworkStores<PichubContext>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
