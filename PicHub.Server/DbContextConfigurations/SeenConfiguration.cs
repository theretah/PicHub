using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PicHub.Server.Entities;

namespace PicHub.Server.DbContextConfigurations
{
    public class SeenConfiguration : IEntityTypeConfiguration<Seen>
    {
        public void Configure(EntityTypeBuilder<Seen> builder)
        {
            builder.HasKey(s => new { s.ChatLineId, s.SeenerId });

            builder
                .HasOne(s => s.ChatLine)
                .WithMany(cl => cl.UsersSeens)
                .HasForeignKey(s => s.ChatLineId)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .HasOne(s => s.Seener)
                .WithMany(u => u.SeenChatLines)
                .HasForeignKey(s => s.SeenerId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
