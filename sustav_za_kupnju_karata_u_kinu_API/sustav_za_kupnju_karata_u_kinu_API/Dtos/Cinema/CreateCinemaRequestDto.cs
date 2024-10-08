﻿using sustav_za_kupnju_karata_u_kinu_API.Dtos.Address;
using sustav_za_kupnju_karata_u_kinu_API.Dtos.Auditorium;
using sustav_za_kupnju_karata_u_kinu_API.Models;

namespace sustav_za_kupnju_karata_u_kinu_API.Dtos.Cinema
{
	public class CreateCinemaRequestDto
	{
		public string Name { get; set; } = string.Empty;
		public int NumberOfAuditoriums { get; set; }
		public int NumberOfSeats { get; set; }
		public string Image { get; set; } = string.Empty;
		public CreateAddressRequestDto? AddressDto { get; set; }
        public List<CreateAuditoriumRequestDto> Auditoriums { get; set; } = new List<CreateAuditoriumRequestDto>();
    }
}
