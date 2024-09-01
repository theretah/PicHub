using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PicHub.Server.Migrations
{
    /// <inheritdoc />
    public partial class PopulateGendersAndAccountCategoriesAndProfessionalCategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                "INSERT INTO Genders VALUES (1, 'Not specified'), (2, 'Male'), (3, 'Female')"
            );

            migrationBuilder.Sql(
                "INSERT INTO AccountCategories VALUES (1, 'Personal') ,(2, 'Business'), (3, 'Creator')"
            );

            migrationBuilder.Sql(
                "INSERT INTO ProfessionalCategories VALUES (1, 'Artist'), (2, 'Musician/band'), (3, 'Blogger'), (4, 'Clothing (Brand)'), (5, 'Community'), (6, 'Education'), (7, 'Entrepreneur'), (8, 'Health/beauty'), (9, 'Editor'), (10, 'Writer'), (11, 'Personal blog'), (12, 'Prodict/service'), (13, 'Gamer'), (14, 'Restaurant'), (15, 'Beauty, cosmetic & personal care'), (16, 'Grocery Store'), (17, 'Photographer'), (18, 'Shopping & retail'), (19, 'Video creator'), (20, 'Digital creator')"
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Genders");
            migrationBuilder.Sql("DELETE FROM AccountCategories");
            migrationBuilder.Sql("DELETE FROM ProfessionalCategories");
        }
    }
}
