namespace sustav_za_kupnju_karata_u_kinu_API.Dtos.Cinema
{
	public class UpdateCinemaRequestDto
	{
		public string Name { get; set; } = string.Empty;
		public int NumberOfAuditoriums { get; set; }
		public int NumberOfSeats { get; set; }

	}
}
