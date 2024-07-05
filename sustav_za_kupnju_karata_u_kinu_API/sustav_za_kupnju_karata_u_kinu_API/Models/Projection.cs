namespace sustav_za_kupnju_karata_u_kinu_API.Models
{
	public class Projection
	{
		public int Id { get; set; }
		public int? CinemaId { get; set; }
		public Cinema? Cinema { get; set; }
		public int? MovieId { get; set; }
		public Movie? Movie { get; set; }
		public int? AuditoriumId { get; set; }
		public Auditorium? Auditorium { get; set; }
		public DateTime DateTime { get; set; }
		public decimal Price { get; set; }
	}
}
