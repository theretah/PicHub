using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PicHub.Server.Migrations
{
    /// <inheritdoc />
    public partial class RemoveFollowCountsFromUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FollowersCount",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "FollowingsCount",
                table: "AspNetUsers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FollowersCount",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FollowingsCount",
                table: "AspNetUsers",
                type: "int",
                nullable: true);
        }
    }
}
