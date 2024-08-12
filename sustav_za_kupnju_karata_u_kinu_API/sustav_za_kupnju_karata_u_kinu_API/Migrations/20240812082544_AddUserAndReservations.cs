using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sustav_za_kupnju_karata_u_kinu_API.Migrations
{
    /// <inheritdoc />
    public partial class AddUserAndReservations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumberOfColumns",
                table: "Auditoriums",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfRows",
                table: "Auditoriums",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfColumns",
                table: "Auditoriums");

            migrationBuilder.DropColumn(
                name: "NumberOfRows",
                table: "Auditoriums");
        }
    }
}
