using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PicHub.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddTitleAndBioColumnToGroupChatField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Bio",
                table: "GroupChats",
                type: "nvarchar(250)",
                maxLength: 250,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "GroupChats",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Bio",
                table: "GroupChats");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "GroupChats");
        }
    }
}
