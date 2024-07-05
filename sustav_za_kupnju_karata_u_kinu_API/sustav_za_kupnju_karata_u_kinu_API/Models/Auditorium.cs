namespace sustav_za_kupnju_karata_u_kinu_API.Models
{
	public class Auditorium
	{
		public int Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public int? CinemaId { get; set; }
		public Cinema? Cinema { get; set; }
		public int NumberOfSeats { get; set; }
		public List<Projection> Projections { get; set; } = new List<Projection>();
		public List<Seat> Seats { get; set; } = new List<Seat>();
	}
}
