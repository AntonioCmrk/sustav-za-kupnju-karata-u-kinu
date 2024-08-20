using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace sustav_za_kupnju_karata_u_kinu_API.Migrations
{
    /// <inheritdoc />
    public partial class cinemaImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "03ddbc87-d3b6-4b44-886d-d4b35c5e91c9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5a2fda26-1173-4e31-b912-6442731e2784");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1b39d5b5-488d-4e7f-a5e5-e382c5103cd5", null, "User", "USER" },
                    { "8f4d0f08-a577-4e97-a2bd-be97003b6a27", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1b39d5b5-488d-4e7f-a5e5-e382c5103cd5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8f4d0f08-a577-4e97-a2bd-be97003b6a27");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "03ddbc87-d3b6-4b44-886d-d4b35c5e91c9", null, "User", "USER" },
                    { "5a2fda26-1173-4e31-b912-6442731e2784", null, "Admin", "ADMIN" }
                });
        }
    }
}
