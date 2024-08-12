﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using sustav_za_kupnju_karata_u_kinu_API.Data;

#nullable disable

namespace sustav_za_kupnju_karata_u_kinu_API.Migrations
{
    [DbContext(typeof(ApplicationDBContext))]
    [Migration("20240812082544_AddUserAndReservations")]
    partial class AddUserAndReservations
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("sustav_za_kupnju_karata_u_kinu_API.Models.Address", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("CinemaId")
                        .HasColumnType("int");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("HouseNumber")
                        .HasColumnType("int");

                    b.Property<int>("PostalCode")
                        .HasColumnType("int");

                    b.Property<string>("StreetName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CinemaId")
                        .IsUnique()
                        .HasFilter("[CinemaId] IS NOT NULL");

                    b.ToTable("Address");
                });

            modelBuilder.Entity("sustav_za_kupnju_karata_u_kinu_API.Models.Auditorium", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("CinemaId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NumberOfColumns")
                        .HasColumnType("int");

                    b.Property<int>("NumberOfRows")
                        .HasColumnType("int");

                    b.Property<int>("NumberOfSeats")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CinemaId");

                    b.ToTable("Auditoriums");
                });

            modelBuilder.Entity("sustav_za_kupnju_karata_u_kinu_API.Models.Cinema", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NumberOfAuditoriums")
                        .HasColumnType("int");

                    b.Property<int>("NumberOfSeats")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Cinemas");
                });

            modelBuilder.Entity("sustav_za_kupnju_karata_u_kinu_API.Models.Movie", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("BackgroundImage")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CoverImage")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Genre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("LengthInMinutes")
                        .HasColumnType("int");

                    b.Property<string>("OriginalTitle")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ShortDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Year")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Movies");
                });

            modelBuilder.Entity("sustav_za_kupnju_karata_u_kinu_API.Models.Projection", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AuditoriumId")
                        .HasColumnType("int");

                    b.Property<int?>("CinemaId")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime2");

                    b.Property<int?>("MovieId")
                        .HasColumnType("int");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(3,2)");

                    b.HasKey("Id");

                    b.HasIndex("AuditoriumId");

                    b.HasIndex("CinemaId");

                    b.HasIndex("MovieId");

                    b.ToTable("Projections");
                });

            modelBuilder.Entity("sustav_za_kupnju_karata_u_kinu_API.Models.Seat", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AuditoriumId")
                        .HasColumnType("int");

                    b.Property<int>("Column")
                        .HasColumnType("int");

                    b.Property<int>("Row")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AuditoriumId");

                    b.ToTable("Seats");
                });

            modelBuilder.Entity("sustav_za_kupnju_karata_u_kinu_API.Models.Address", b =>
                {
                    b.HasOne("sustav_za_kupnju_karata_u_kinu_API.Models.Cinema", "Cinema")
                        .WithOne("Address")
                        .HasForeignKey("sustav_za_kupnju_karata_u_kinu_API.Models.Address", "CinemaId");

                    b.Navigation("Cinema");
                });

            modelBuilder.Entity("sustav_za_kupnju_karata_u_kinu_API.Models.Auditorium", b =>
                {
                    b.HasOne("sustav_za_kupnju_karata_u_kinu_API.Models.Cinema", "Cinema")
                        .WithMany("Auditoriums")
                        .HasForeignKey("CinemaId");

                    b.Navigation("Cinema");
                });

            modelBuilder.Entity("sustav_za_kupnju_karata_u_kinu_API.Models.Projection", b =>
                {
                    b.HasOne("sustav_za_kupnju_karata_u_kinu_API.Models.Auditorium", "Auditorium")
                        .WithMany("Projections")
                        .HasForeignKey("AuditoriumId");

                    b.HasOne("sustav_za_kupnju_karata_u_kinu_API.Models.Cinema", "Cinema")
                        .WithMany("Projections")
                        .HasForeignKey("CinemaId");

                    b.HasOne("sustav_za_kupnju_karata_u_kinu_API.Models.Movie", "Movie")
                        .WithMany("Projections")
                        .HasForeignKey("MovieId");

                    b.Navigation("Auditorium");

                    b.Navigation("Cinema");

                    b.Navigation("Movie");
                });

            modelBuilder.Entity("sustav_za_kupnju_karata_u_kinu_API.Models.Seat", b =>
                {
                    b.HasOne("sustav_za_kupnju_karata_u_kinu_API.Models.Auditorium", "Auditorium")
                        .WithMany("Seats")
                        .HasForeignKey("AuditoriumId");

                    b.Navigation("Auditorium");
                });

            modelBuilder.Entity("sustav_za_kupnju_karata_u_kinu_API.Models.Auditorium", b =>
                {
                    b.Navigation("Projections");

                    b.Navigation("Seats");
                });

            modelBuilder.Entity("sustav_za_kupnju_karata_u_kinu_API.Models.Cinema", b =>
                {
                    b.Navigation("Address");

                    b.Navigation("Auditoriums");

                    b.Navigation("Projections");
                });

            modelBuilder.Entity("sustav_za_kupnju_karata_u_kinu_API.Models.Movie", b =>
                {
                    b.Navigation("Projections");
                });
#pragma warning restore 612, 618
        }
    }
}
