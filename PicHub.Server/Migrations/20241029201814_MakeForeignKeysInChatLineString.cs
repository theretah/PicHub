using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PicHub.Server.Migrations
{
    /// <inheritdoc />
    public partial class MakeForeignKeysInChatLineString : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChatLines_GroupChats_GroupChatId1",
                table: "ChatLines");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatLines_PrivateChats_PrivateChatId1",
                table: "ChatLines");

            migrationBuilder.DropIndex(
                name: "IX_ChatLines_GroupChatId1",
                table: "ChatLines");

            migrationBuilder.DropIndex(
                name: "IX_ChatLines_PrivateChatId1",
                table: "ChatLines");

            migrationBuilder.DropColumn(
                name: "GroupChatId1",
                table: "ChatLines");

            migrationBuilder.DropColumn(
                name: "PrivateChatId1",
                table: "ChatLines");

            migrationBuilder.AlterColumn<string>(
                name: "PrivateChatId",
                table: "ChatLines",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "GroupChatId",
                table: "ChatLines",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ChatLines_GroupChatId",
                table: "ChatLines",
                column: "GroupChatId");

            migrationBuilder.CreateIndex(
                name: "IX_ChatLines_PrivateChatId",
                table: "ChatLines",
                column: "PrivateChatId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatLines_GroupChats_GroupChatId",
                table: "ChatLines",
                column: "GroupChatId",
                principalTable: "GroupChats",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatLines_PrivateChats_PrivateChatId",
                table: "ChatLines",
                column: "PrivateChatId",
                principalTable: "PrivateChats",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChatLines_GroupChats_GroupChatId",
                table: "ChatLines");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatLines_PrivateChats_PrivateChatId",
                table: "ChatLines");

            migrationBuilder.DropIndex(
                name: "IX_ChatLines_GroupChatId",
                table: "ChatLines");

            migrationBuilder.DropIndex(
                name: "IX_ChatLines_PrivateChatId",
                table: "ChatLines");

            migrationBuilder.AlterColumn<int>(
                name: "PrivateChatId",
                table: "ChatLines",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "GroupChatId",
                table: "ChatLines",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GroupChatId1",
                table: "ChatLines",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PrivateChatId1",
                table: "ChatLines",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ChatLines_GroupChatId1",
                table: "ChatLines",
                column: "GroupChatId1");

            migrationBuilder.CreateIndex(
                name: "IX_ChatLines_PrivateChatId1",
                table: "ChatLines",
                column: "PrivateChatId1");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatLines_GroupChats_GroupChatId1",
                table: "ChatLines",
                column: "GroupChatId1",
                principalTable: "GroupChats",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatLines_PrivateChats_PrivateChatId1",
                table: "ChatLines",
                column: "PrivateChatId1",
                principalTable: "PrivateChats",
                principalColumn: "Id");
        }
    }
}
