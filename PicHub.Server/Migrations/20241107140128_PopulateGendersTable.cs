using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PicHub.Server.Migrations
{
    /// <inheritdoc />
    public partial class PopulateGendersTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChatLines_AspNetUsers_ReplyingToId",
                table: "ChatLines");

            migrationBuilder.AlterColumn<int>(
                name: "ReplyingToId",
                table: "ChatLines",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "Genders",
                columns: new[] { "Id", "Title" },
                values: new object[,]
                {
                    { 1, "Not specified" },
                    { 2, "Male" },
                    { 3, "Female" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_ChatLines_ChatLines_ReplyingToId",
                table: "ChatLines",
                column: "ReplyingToId",
                principalTable: "ChatLines",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChatLines_ChatLines_ReplyingToId",
                table: "ChatLines");

            migrationBuilder.DeleteData(
                table: "Genders",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Genders",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Genders",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.AlterColumn<string>(
                name: "ReplyingToId",
                table: "ChatLines",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatLines_AspNetUsers_ReplyingToId",
                table: "ChatLines",
                column: "ReplyingToId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
