namespace sustav_za_kupnju_karata_u_kinu_API.Dtos.Address
{
	public class CreateAddressRequestDto
	{
		public int PostalCode { get; set; }
		public string City { get; set; } = string.Empty;
		public string Country { get; set; } = string.Empty;
		public string StreetName { get; set; } = string.Empty;
		public int HouseNumber { get; set; }
	}
}
