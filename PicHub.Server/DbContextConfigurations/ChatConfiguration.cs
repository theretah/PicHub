using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PicHub.Server.Entities;

namespace PicHub.Server.DbContextConfigurations
{
    public class ChatConfiguration : IEntityTypeConfiguration<Chat>
    {
        public void Configure(EntityTypeBuilder<Chat> builder)
        {
            builder.HasMany(x => x.Messages)
            .WithOne(m => m.Chat)
            .HasForeignKey(m => m.ChatId)
            .IsRequired();

            builder.HasOne(c => c.Sender)
                .WithMany(sender => sender.Chats)
                .HasForeignKey(c => c.SenderId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(c => c.Reciever)
               .WithMany()
               .HasForeignKey(c => c.RecieverId)
               .OnDelete(DeleteBehavior.Restrict);
        }
    }
}