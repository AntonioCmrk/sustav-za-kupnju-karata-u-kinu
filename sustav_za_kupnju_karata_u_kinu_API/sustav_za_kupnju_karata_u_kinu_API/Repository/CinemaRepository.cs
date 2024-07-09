using Microsoft.EntityFrameworkCore;
using sustav_za_kupnju_karata_u_kinu_API.Data;
using sustav_za_kupnju_karata_u_kinu_API.Dtos.Cinema;
using sustav_za_kupnju_karata_u_kinu_API.Interfaces;
using sustav_za_kupnju_karata_u_kinu_API.Models;

namespace sustav_za_kupnju_karata_u_kinu_API.Repository
{
	public class CinemaRepository : ICinemaRepository
	{
		private readonly ApplicationDBContext _context;

		public CinemaRepository(ApplicationDBContext context)
		{
			_context = context;
		}

		public async Task<Cinema> CreateAsync(Cinema cinemaModel)
		{
			await _context.Cinemas.AddAsync(cinemaModel);
			await _context.SaveChangesAsync();
			return cinemaModel;
		}

		public async Task<Cinema?> DeleteAsync(int id)
		{
			var cinemaModel = await _context.Cinemas.FirstOrDefaultAsync(x => x.Id == id);
			if (cinemaModel == null)
			{
				return null;
			}
			_context.Cinemas.Remove(cinemaModel);
			await _context.SaveChangesAsync();
			return cinemaModel;
		}

		public async Task<List<Cinema>> GetAllAsync()
		{
			return await _context.Cinemas.Include(x => x.Address).ToListAsync();
		}

		public async Task<Cinema?> GetByIdAsync(int id)
		{
			return await _context.Cinemas.Include(x => x.Address).FirstOrDefaultAsync(x => x.Id == id);
		}

		public async Task<Cinema?> UpdateAsync(int id, UpdateCinemaRequestDto cinemaDto)
		{
			var existingCinema = await _context.Cinemas.FirstOrDefaultAsync(x => x.Id == id);
			if (existingCinema == null)
			{
				return null;
			}
			existingCinema.Name = cinemaDto.Name;
			existingCinema.NumberOfAuditoriums = cinemaDto.NumberOfAuditoriums;
			existingCinema.NumberOfSeats = cinemaDto.NumberOfSeats;

			await _context.SaveChangesAsync();

			return existingCinema;
		}
	}
}
