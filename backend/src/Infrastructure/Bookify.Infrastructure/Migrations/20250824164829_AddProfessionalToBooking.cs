using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bookify.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddProfessionalToBooking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ProfessionalId",
                table: "Bookings",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_ProfessionalId",
                table: "Bookings",
                column: "ProfessionalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Professionals_ProfessionalId",
                table: "Bookings",
                column: "ProfessionalId",
                principalTable: "Professionals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Professionals_ProfessionalId",
                table: "Bookings");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_ProfessionalId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "ProfessionalId",
                table: "Bookings");
        }
    }
}
