using sustav_za_kupnju_karata_u_kinu_API.Models;

namespace sustav_za_kupnju_karata_u_kinu_API.Interfaces
{
	public interface ITokenService
	{
		string CreateToken(AppUser appUser);
	}
}
