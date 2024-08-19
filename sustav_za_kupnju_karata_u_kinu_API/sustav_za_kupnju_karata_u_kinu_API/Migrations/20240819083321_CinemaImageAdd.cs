using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace sustav_za_kupnju_karata_u_kinu_API.Migrations
{
    /// <inheritdoc />
    public partial class CinemaImageAdd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c0e884f6-2713-440d-aa6b-7e92cb4a25d2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f93dab98-2260-4bc9-a016-1ff31809944b");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Cinemas",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "03ddbc87-d3b6-4b44-886d-d4b35c5e91c9", null, "User", "USER" },
                    { "5a2fda26-1173-4e31-b912-6442731e2784", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "03ddbc87-d3b6-4b44-886d-d4b35c5e91c9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5a2fda26-1173-4e31-b912-6442731e2784");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Cinemas");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "c0e884f6-2713-440d-aa6b-7e92cb4a25d2", null, "Admin", "ADMIN" },
                    { "f93dab98-2260-4bc9-a016-1ff31809944b", null, "User", "USER" }
                });
        }
    }
}
