using sustav_za_kupnju_karata_u_kinu_API.Dtos.Address;
using sustav_za_kupnju_karata_u_kinu_API.Dtos.Auditorium;

namespace sustav_za_kupnju_karata_u_kinu_API.Dtos.Cinema
{
    public class UpdateCinemaRequestDto
    {
        public string Name { get; set; } = string.Empty;
        public int NumberOfAuditoriums { get; set; }
        public int NumberOfSeats { get; set; }

        public UpdateAddressDto? AddressDto { get; set; }

        public List<UpdateAuditoriumDto>? Auditoriums { get; set; }
    }
}
