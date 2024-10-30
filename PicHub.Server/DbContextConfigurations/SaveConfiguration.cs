using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PicHub.Server.Entities;

namespace PicHub.Server.DbContextConfigurations
{
    public class SaveConfiguration : IEntityTypeConfiguration<Save>
    {
        public void Configure(EntityTypeBuilder<Save> builder)
        {
            builder.HasKey(s => new { s.PostId, s.UserId });

            builder
                .HasOne(s => s.Post)
                .WithMany(p => p.UsersSaved)
                .HasForeignKey(p => p.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            // OnDelete must be handled in action methods.
            builder
                .HasOne(s => s.User)
                .WithMany(p => p.SavedPosts)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
