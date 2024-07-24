﻿using sustav_za_kupnju_karata_u_kinu_API.Dtos.Cinema;
using sustav_za_kupnju_karata_u_kinu_API.Models;
using System.Runtime.CompilerServices;

namespace sustav_za_kupnju_karata_u_kinu_API.Mappers
{
	public static class CinemaMappers
	{
		public static CinemaDto ToCinemaDto(this Cinema cinemaModel)
		{
			return new CinemaDto
			{
				Id = cinemaModel.Id,
				Name = cinemaModel.Name,
				NumberOfAuditoriums = cinemaModel.NumberOfAuditoriums,
				NumberOfSeats = cinemaModel.NumberOfSeats,
				AddressDto = cinemaModel.Address?.ToAddressDto(),
			};
		}
		public static Cinema ToCinemaFromCreateDTO(this CreateCinemaRequestDto cinemaDto)
		{
			return new Cinema
			{
				Name = cinemaDto.Name,
				NumberOfAuditoriums = cinemaDto.NumberOfAuditoriums,
				NumberOfSeats = cinemaDto.NumberOfSeats,
				Address = cinemaDto.AddressDto?.ToAddressFromCreateDTO(),

			};
		}
	}
}

