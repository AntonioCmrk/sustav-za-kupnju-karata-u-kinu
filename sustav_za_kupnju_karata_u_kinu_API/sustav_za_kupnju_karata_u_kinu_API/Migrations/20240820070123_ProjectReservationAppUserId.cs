using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace sustav_za_kupnju_karata_u_kinu_API.Migrations
{
    /// <inheritdoc />
    public partial class ProjectReservationAppUserId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectionReservations_AspNetUsers_AppUserId1",
                table: "ProjectionReservations");

            migrationBuilder.DropIndex(
                name: "IX_ProjectionReservations_AppUserId1",
                table: "ProjectionReservations");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1b39d5b5-488d-4e7f-a5e5-e382c5103cd5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8f4d0f08-a577-4e97-a2bd-be97003b6a27");

            migrationBuilder.DropColumn(
                name: "AppUserId1",
                table: "ProjectionReservations");

            migrationBuilder.AlterColumn<string>(
                name: "AppUserId",
                table: "ProjectionReservations",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a3b47942-57c3-4fe1-bf9f-ebd164b0e7e8", null, "User", "USER" },
                    { "f79c7e73-5732-41b6-b261-8bc0666a4ed3", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectionReservations_AppUserId",
                table: "ProjectionReservations",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectionReservations_AspNetUsers_AppUserId",
                table: "ProjectionReservations",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectionReservations_AspNetUsers_AppUserId",
                table: "ProjectionReservations");

            migrationBuilder.DropIndex(
                name: "IX_ProjectionReservations_AppUserId",
                table: "ProjectionReservations");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a3b47942-57c3-4fe1-bf9f-ebd164b0e7e8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f79c7e73-5732-41b6-b261-8bc0666a4ed3");

            migrationBuilder.AlterColumn<int>(
                name: "AppUserId",
                table: "ProjectionReservations",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId1",
                table: "ProjectionReservations",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1b39d5b5-488d-4e7f-a5e5-e382c5103cd5", null, "User", "USER" },
                    { "8f4d0f08-a577-4e97-a2bd-be97003b6a27", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectionReservations_AppUserId1",
                table: "ProjectionReservations",
                column: "AppUserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectionReservations_AspNetUsers_AppUserId1",
                table: "ProjectionReservations",
                column: "AppUserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
