using System.ComponentModel.DataAnnotations;

namespace sustav_za_kupnju_karata_u_kinu_API.Dtos.Account
{
	public class LoginDto
	{
		[Required]
		public string Username { get; set; }
		[Required]
		public string Password { get; set; }
	}
}
