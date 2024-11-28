using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PicHub.Server.Entities;

namespace PicHub.Server.DbContextConfigurations
{
    public class ProfessionalCategoryConfiguration : IEntityTypeConfiguration<ProfessionalCategory>
    {
        public void Configure(EntityTypeBuilder<ProfessionalCategory> builder)
        {
            var professionalCategories = new ProfessionalCategory[20]
            {
                new ProfessionalCategory { Id = 1, Title = "Artist" },
                new ProfessionalCategory { Id = 2, Title = "Musician/band" },
                new ProfessionalCategory { Id = 3, Title = "Blogger" },
                new ProfessionalCategory { Id = 4, Title = "Clothing (Brand)" },
                new ProfessionalCategory { Id = 5, Title = "Community" },
                new ProfessionalCategory { Id = 6, Title = "Education" },
                new ProfessionalCategory { Id = 7, Title = "Entrepreneur" },
                new ProfessionalCategory { Id = 8, Title = "Health/beauty" },
                new ProfessionalCategory { Id = 9, Title = "Editor" },
                new ProfessionalCategory { Id = 10, Title = "Writer" },
                new ProfessionalCategory { Id = 11, Title = "Personal blog" },
                new ProfessionalCategory { Id = 12, Title = "Product/service" },
                new ProfessionalCategory { Id = 13, Title = "Gamer" },
                new ProfessionalCategory { Id = 14, Title = "Restaurant" },
                new ProfessionalCategory { Id = 15, Title = "Beauty, cosmetic & personal care" },
                new ProfessionalCategory { Id = 16, Title = "Grocery Store" },
                new ProfessionalCategory { Id = 17, Title = "Photographer" },
                new ProfessionalCategory { Id = 18, Title = "Shopping & retail" },
                new ProfessionalCategory { Id = 19, Title = "Video creator" },
                new ProfessionalCategory { Id = 20, Title = "Digital creator" },
            };
            builder.HasData(professionalCategories);
        }
    }
}
