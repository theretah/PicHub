using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PicHub.Server.Entities;

namespace PicHub.Server.DbContextConfigurations
{
    public class GenderConfiguration : IEntityTypeConfiguration<Gender>
    {
        public void Configure(EntityTypeBuilder<Gender> builder)
        {
            var genders = new Gender[3]
            {
                new Gender { Id = 1, Title = "Not specified" },
                new Gender { Id = 2, Title = "Male" },
                new Gender { Id = 3, Title = "Female" },
            };
            builder.HasData(genders);
        }
    }
}
