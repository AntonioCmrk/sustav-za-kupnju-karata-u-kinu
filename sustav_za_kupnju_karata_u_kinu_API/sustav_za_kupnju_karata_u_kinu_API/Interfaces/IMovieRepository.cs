using sustav_za_kupnju_karata_u_kinu_API.Models;

namespace sustav_za_kupnju_karata_u_kinu_API.Interfaces
{
	public interface IMovieRepository
	{
		Task<List<Movie>> GetAllAsync();
		Task<Movie?> GetByIdAsync(int id);
		Task<Movie> CreateAsync(Movie movieModel);
		Task<Movie?> UpdateAsync(int id, Movie movieDto);
		Task<Movie?> DeleteAsync(int id);
	}
}
