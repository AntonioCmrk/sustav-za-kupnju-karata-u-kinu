using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace sustav_za_kupnju_karata_u_kinu_API.Migrations
{
    /// <inheritdoc />
    public partial class ProjectReservationGivenNameAdd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a3b47942-57c3-4fe1-bf9f-ebd164b0e7e8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f79c7e73-5732-41b6-b261-8bc0666a4ed3");

            migrationBuilder.AddColumn<string>(
                name: "GivenName",
                table: "ProjectionReservations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4705a1c5-7e59-4810-8743-8e93b96be824", null, "User", "USER" },
                    { "dc759c5b-2e85-4e25-9953-0422b2dd20bf", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4705a1c5-7e59-4810-8743-8e93b96be824");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dc759c5b-2e85-4e25-9953-0422b2dd20bf");

            migrationBuilder.DropColumn(
                name: "GivenName",
                table: "ProjectionReservations");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a3b47942-57c3-4fe1-bf9f-ebd164b0e7e8", null, "User", "USER" },
                    { "f79c7e73-5732-41b6-b261-8bc0666a4ed3", null, "Admin", "ADMIN" }
                });
        }
    }
}
