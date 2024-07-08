using sustav_za_kupnju_karata_u_kinu_API.Dtos.Cinema;
using sustav_za_kupnju_karata_u_kinu_API.Models;

namespace sustav_za_kupnju_karata_u_kinu_API.Interfaces
{
	public interface ICinemaRepository
	{
		Task<List<Cinema>> GetAllAsync();
		Task<Cinema?> GetByIdAsync(int id);
		Task<Cinema> CreateAsync(Cinema cinemaModel);
		Task<Cinema?> UpdateAsync(int id, UpdateCinemaRequestDto cinemaDto);
		Task<Cinema?> DeleteAsync(int id);
	}
}
