using Microsoft.EntityFrameworkCore;
using sustav_za_kupnju_karata_u_kinu_API.Models;

namespace sustav_za_kupnju_karata_u_kinu_API.ApplicationDBContext
{
	public class ApplicationDBContext : DbContext
	{
		public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
		{

		}
		public DbSet<Address> Address { get; set; }
		public DbSet<Auditorium> Auditoriums { get; set; }
		public DbSet<Cinema> Cinemas { get; set; }
		public DbSet<Movie> Movies { get; set; }
		public DbSet<Projection> Projections { get; set; }
		public DbSet<Seat> Seats { get; set; }

	}
}
