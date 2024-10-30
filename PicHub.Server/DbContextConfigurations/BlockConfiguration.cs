using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PicHub.Server.Entities;

namespace PicHub.Server.DbContextConfigurations
{
    public class BlockConfiguration : IEntityTypeConfiguration<Block>
    {
        public void Configure(EntityTypeBuilder<Block> builder)
        {
            builder.HasKey(b => new { b.BlockedId, b.BlockerId });

            builder
                .HasOne(b => b.Blocked)
                .WithMany(blocked => blocked.BlockedUsers)
                .HasForeignKey(b => b.BlockedId)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .HasOne(b => b.Blocker)
                .WithMany()
                .HasForeignKey(b => b.BlockerId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
