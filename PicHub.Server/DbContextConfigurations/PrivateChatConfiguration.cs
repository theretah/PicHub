using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PicHub.Server.Entities;

namespace PicHub.Server.DbContextConfigurations
{
    public class PrivateChatConfiguration : IEntityTypeConfiguration<PrivateChat>
    {
        public void Configure(EntityTypeBuilder<PrivateChat> builder)
        {
            builder
                .HasOne(c => c.User1)
                .WithMany(u => u.PrivateChats)
                .HasForeignKey(c => c.User1Id)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .HasOne(c => c.User2)
                .WithMany()
                .HasForeignKey(c => c.User2Id)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
