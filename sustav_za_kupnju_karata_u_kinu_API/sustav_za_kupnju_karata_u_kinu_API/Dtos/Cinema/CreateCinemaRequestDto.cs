using sustav_za_kupnju_karata_u_kinu_API.Models;

namespace sustav_za_kupnju_karata_u_kinu_API.Dtos.Cinema
{
	public class CreateCinemaRequestDto
	{
		public string Name { get; set; } = string.Empty;
		public int NumberOfAuditoriums { get; set; }
		public int NumberOfSeats { get; set; }
		public int? AddressId { get; set; }
	}
}
