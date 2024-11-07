using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PicHub.Server.Entities;

namespace PicHub.Server.DbContextConfigurations
{
    public class AccountCategoryConfiguration : IEntityTypeConfiguration<AccountCategory>
    {
        public void Configure(EntityTypeBuilder<AccountCategory> builder)
        {
            var accountCategories = new AccountCategory[3]
            {
                new AccountCategory { Id = 1, Title = "Personal" },
                new AccountCategory { Id = 2, Title = "Business" },
                new AccountCategory { Id = 3, Title = "Creator" },
            };
            builder.HasData(accountCategories);
        }
    }
}
