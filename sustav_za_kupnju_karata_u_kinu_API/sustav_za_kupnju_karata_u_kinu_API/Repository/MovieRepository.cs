using Microsoft.EntityFrameworkCore;
using sustav_za_kupnju_karata_u_kinu_API.Data;
using sustav_za_kupnju_karata_u_kinu_API.Dtos.Cinema;
using sustav_za_kupnju_karata_u_kinu_API.Interfaces;
using sustav_za_kupnju_karata_u_kinu_API.Models;

namespace sustav_za_kupnju_karata_u_kinu_API.Repository
{
	public class MovieRepository : IMovieRepository
	{
		private readonly ApplicationDBContext _context;

		public MovieRepository(ApplicationDBContext context)
		{
			_context = context;
		}
		public async Task<Movie> CreateAsync(Movie movieModel)
		{
			await _context.Movies.AddAsync(movieModel);
			await _context.SaveChangesAsync();
			return movieModel;
		}

		public async Task<Movie?> DeleteAsync(int id)
		{
			var movieModel = await _context.Movies.FirstOrDefaultAsync(x => x.Id == id);
			if (movieModel == null)
			{
				return null;
			}
			_context.Movies.Remove(movieModel);
			await _context.SaveChangesAsync();
			return movieModel;
		}

		public async Task<List<Movie>> GetAllAsync()
		{
			return await _context.Movies.ToListAsync();
		}

		public async Task<Movie?> GetByIdAsync(int id)
		{
			return await _context.Movies.FirstOrDefaultAsync(x => x.Id == id);
		}

		public async Task<Movie?> UpdateAsync(int id, Movie movieDto)
		{
			var existingMovie = await _context.Movies.FirstOrDefaultAsync(x => x.Id == id);
			if (existingMovie == null)
			{
				return null;
			}
			existingMovie.Title = movieDto.Title;
			existingMovie.ShortDescription = movieDto.ShortDescription;
			existingMovie.Description = movieDto.Description;
			existingMovie.LengthInMinutes = movieDto.LengthInMinutes;
			existingMovie.OriginalTitle = movieDto.OriginalTitle;
			existingMovie.Genre = movieDto.Genre;
			existingMovie.Year = movieDto.Year;
			existingMovie.Country = movieDto.Country;
			existingMovie.CoverImage = movieDto.CoverImage;
			existingMovie.BackgroundImage = movieDto.BackgroundImage;

			await _context.SaveChangesAsync();

			return existingMovie;
		}
	}
}
