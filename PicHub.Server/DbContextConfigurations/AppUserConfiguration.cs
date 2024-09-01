using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PicHub.Server.Entities;

namespace PicHub.Server.DbContextConfigurations
{
    public class AppUserConfiguration : IEntityTypeConfiguration<AppUser>
    {
        public void Configure(EntityTypeBuilder<AppUser> builder)
        {
            builder
                .HasMany(u => u.CreatedPosts)
                .WithOne(p => p.Author)
                .HasForeignKey(p => p.AuthorId)
                .IsRequired();

            builder
                .HasOne(u => u.Gender)
                .WithMany(g => g.Users)
                .HasForeignKey(u => u.GenderId)
                .IsRequired();

            builder
                .HasOne(u => u.ProfessionalCategory)
                .WithMany(g => g.Users)
                .HasForeignKey(u => u.ProfessionalCategoryId)
                .IsRequired(false);

            builder
                .HasOne(u => u.AccountCategory)
                .WithMany(g => g.Users)
                .HasForeignKey(u => u.AccountCategoryId)
                .IsRequired();
        }
    }
}
