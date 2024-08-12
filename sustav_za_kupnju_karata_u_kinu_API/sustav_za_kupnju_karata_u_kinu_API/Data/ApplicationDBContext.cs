using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using sustav_za_kupnju_karata_u_kinu_API.Models;

namespace sustav_za_kupnju_karata_u_kinu_API.Data
{
	public class ApplicationDBContext : IdentityDbContext<AppUser>
	{
		public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
		{

		}
		public DbSet<Address> Address { get; set; }
		public DbSet<Auditorium> Auditoriums { get; set; }
		public DbSet<Cinema> Cinemas { get; set; }
		public DbSet<Movie> Movies { get; set; }
		public DbSet<Projection> Projections { get; set; }
		public DbSet<ProjectionReservation> ProjectionReservations { get; set; }
		public DbSet<ReservationSeat> ReservationSeats { get; set; }
		public DbSet<Seat> Seats { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
			List<IdentityRole> roles = new List<IdentityRole>
			{
				new IdentityRole
				{
					Name = "Admin",
					NormalizedName = "ADMIN"
				},
				new IdentityRole
				{
					Name = "User",
					NormalizedName = "USER"
				}
			}; 
			builder.Entity<IdentityRole>().HasData(roles);
        }

    }
}
