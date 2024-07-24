using sustav_za_kupnju_karata_u_kinu_API.Dtos.Address;
using sustav_za_kupnju_karata_u_kinu_API.Dtos.Cinema;
using sustav_za_kupnju_karata_u_kinu_API.Models;

namespace sustav_za_kupnju_karata_u_kinu_API.Mappers
{
	public static class AddressMappers
	{
		public static AddressDto ToAddressDto(this Address addressModel)
		{
			return new AddressDto
			{
				Id = addressModel.Id,
				PostalCode = addressModel.PostalCode,
				City  = addressModel.City,
				Country  = addressModel.Country,
				StreetName  = addressModel.StreetName,
				HouseNumber = addressModel.HouseNumber,
				CinemaId = addressModel.CinemaId,
		
			};
		}
		public static Address ToAddressFromCreateDTO(this CreateAddressRequestDto addressDto)
		{
			return new Address
			{
				PostalCode = addressDto.PostalCode,
				City = addressDto.City,
				Country = addressDto.Country,
				StreetName = addressDto.StreetName,
				HouseNumber = addressDto.HouseNumber,
			};
		}
	}
}
