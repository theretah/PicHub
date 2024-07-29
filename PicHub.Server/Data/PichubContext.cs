using System.Reflection;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PicHub.Server.Entities;

namespace PicHub.Server.Data
{

    public class PicHubContext(DbContextOptions<PicHubContext> options) : IdentityDbContext(options)
    {
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
        public DbSet<AppUser> AppUsers => Set<AppUser>();
        public DbSet<Post> Posts => Set<Post>();
        public DbSet<Save> Saves => Set<Save>();
        public DbSet<Like> Likes => Set<Like>();
        public DbSet<Follow> Follows => Set<Follow>();
        public DbSet<Chat> Chats => Set<Chat>();
        public DbSet<Message> Messages => Set<Message>();
    }
}