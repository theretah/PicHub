using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PicHub.Server.Entities;

namespace PicHub.Server.DbContextConfigurations
{
    public class LikeConfiguration : IEntityTypeConfiguration<Like>
    {
        public void Configure(EntityTypeBuilder<Like> builder)
        {
            builder
                .HasKey(s => new { s.PostId, s.UserId });

            builder.HasOne(s => s.Post)
                .WithMany(p => p.UsersLiked)
                .HasForeignKey(p => p.PostId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(s => s.User)
                .WithMany(p => p.LikedPosts)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}