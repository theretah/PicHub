using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PicHub.Server.Migrations
{
    /// <inheritdoc />
    public partial class PopulateAccountCategoriesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AccountCategories",
                columns: new[] { "Id", "Title" },
                values: new object[,]
                {
                    { 1, "Personal" },
                    { 2, "Business" },
                    { 3, "Creator" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AccountCategories",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "AccountCategories",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "AccountCategories",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
