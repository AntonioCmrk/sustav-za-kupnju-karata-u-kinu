namespace sustav_za_kupnju_karata_u_kinu_API.Models
{
	public class Seat
	{
		public int Id { get; set; }
		public int Row { get; set; }
		public int Column { get; set; }
		public int? AuditoriumId { get; set; }
		public Auditorium? Auditorium { get; set; }
	}
}
