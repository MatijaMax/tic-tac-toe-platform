using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TicTacToeInfrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GameRecords",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Player1 = table.Column<string>(type: "text", nullable: false),
                    Player2 = table.Column<string>(type: "text", nullable: false),
                    Winner = table.Column<string>(type: "text", nullable: false),
                    WinPoints = table.Column<int>(type: "integer", nullable: false),
                    LossPoints = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameRecords", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Surname = table.Column<string>(type: "text", nullable: false),
                    Username = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Password = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Points = table.Column<int>(type: "integer", nullable: false),
                    Streak = table.Column<int>(type: "integer", nullable: false),
                    InQueue = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GameRecords");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
