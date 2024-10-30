using System.Reflection;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PicHub.Server.Entities;

namespace PicHub.Server.Data
{
    public sealed class PicHubContext(DbContextOptions<PicHubContext> options)
        : IdentityDbContext(options)
    {
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

        public DbSet<AppUser> AppUsers => Set<AppUser>();

        public DbSet<Gender> Genders => Set<Gender>();
        public DbSet<AccountCategory> AccountCategories => Set<AccountCategory>();
        public DbSet<ProfessionalCategory> ProfessionalCategories => Set<ProfessionalCategory>();

        public DbSet<Post> Posts => Set<Post>();
        public DbSet<Save> Saves => Set<Save>();
        public DbSet<Like> Likes => Set<Like>();

        public DbSet<Block> Blocks => Set<Block>();
        public DbSet<Seen> Seens => Set<Seen>();
        public DbSet<Follow> Follows => Set<Follow>();

        public DbSet<ChatLine> ChatLines => Set<ChatLine>();
        public DbSet<PrivateChat> PrivateChats => Set<PrivateChat>();
        public DbSet<GroupChat> GroupChats => Set<GroupChat>();

        public DbSet<GroupChatUser> GroupChatUsers => Set<GroupChatUser>();
    }
}
