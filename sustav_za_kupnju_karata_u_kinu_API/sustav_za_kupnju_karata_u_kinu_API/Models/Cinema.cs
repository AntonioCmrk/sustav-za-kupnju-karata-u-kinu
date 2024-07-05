namespace sustav_za_kupnju_karata_u_kinu_API.Models
{
	public class Cinema
	{
		public int Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public int NumberOfAuditoriums { get; set; }
		public int NumberOfSeats { get; set; }
		public int? AddressId { get; set; }
		public Address? Address { get; set; }
		public List<Auditorium> Auditoriums { get; set; } = new List<Auditorium>();
		public List<Projection> Projections { get; set; } = new List<Projection>();
	}
}
