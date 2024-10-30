using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PicHub.Server.Entities;

namespace PicHub.Server.DbContextConfigurations
{
    public class GroupChatUserConfiguration : IEntityTypeConfiguration<GroupChatUser>
    {
        public void Configure(EntityTypeBuilder<GroupChatUser> builder)
        {
            builder.HasKey(pcu => new { pcu.GroupChatId, pcu.UserId });

            builder
                .HasOne(gcu => gcu.AppUser)
                .WithMany(u => u.GroupChats)
                .HasForeignKey(pcu => pcu.UserId);

            builder
                .HasOne(gcu => gcu.GroupChat)
                .WithMany(pc => pc.Members)
                .HasForeignKey(gcu => gcu.GroupChatId);
        }
    }
}
