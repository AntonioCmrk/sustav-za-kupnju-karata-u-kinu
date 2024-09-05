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
            foreach (var auditorium in cinemaModel.Auditoriums)
            {
                List<Seat> seats = new List<Seat>();
                for (int row = 1; row <= auditorium.NumberOfRows; row++)
                {
                    for (int column = 1; column <= auditorium.NumberOfColumns; column++)
                    {
                        seats.Add(new Seat
                        {
                            Row = row,
                            Column = column,
                            Auditorium = auditorium
                        });
                    }
                }
                auditorium.Seats = seats;
                auditorium.NumberOfSeats = seats.Count;
            }

            cinemaModel.NumberOfSeats = cinemaModel.Auditoriums.Sum(a => a.NumberOfSeats);

            await _context.Cinemas.AddAsync(cinemaModel);
            await _context.SaveChangesAsync();

            return cinemaModel;
        }

        public async Task<Cinema?> DeleteAsync(int id)
        {
            var cinemaModel = await _context.Cinemas
                .Include(c => c.Auditoriums)
                .ThenInclude(a => a.Seats)
                .Include(c => c.Address)
                .FirstOrDefaultAsync(x => x.Id == id);

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
            return await _context.Cinemas
                .Include(x => x.Address)
                .Include(x => x.Auditoriums)
                .ThenInclude(a => a.Seats)
                .ToListAsync();
        }

        public async Task<Cinema?> GetByIdAsync(int id)
        {
            return await _context.Cinemas
                .Include(x => x.Address)
                .Include(x => x.Auditoriums)
                .ThenInclude(a => a.Seats)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Cinema?> UpdateAsync(int id, UpdateCinemaRequestDto cinemaDto)
        {
            var existingCinema = await _context.Cinemas
                .Include(c => c.Auditoriums)
                .ThenInclude(a => a.Seats)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (existingCinema == null)
            {
                return null;
            }

            existingCinema.Name = cinemaDto.Name;
            existingCinema.NumberOfAuditoriums = cinemaDto.NumberOfAuditoriums;

            if (cinemaDto.AddressDto != null && existingCinema.Address != null)
            {
                existingCinema.Address.City = cinemaDto.AddressDto.City;
                existingCinema.Address.StreetName = cinemaDto.AddressDto.StreetName;
                existingCinema.Address.Country = cinemaDto.AddressDto.Country;
                existingCinema.Address.HouseNumber = cinemaDto.AddressDto.HouseNumber;
                existingCinema.Address.PostalCode = cinemaDto.AddressDto.PostalCode;
            }

            foreach (var auditoriumDto in cinemaDto.Auditoriums)
            {
                var existingAuditorium = existingCinema.Auditoriums.FirstOrDefault(a => a.Id == auditoriumDto.Id);
                if (existingAuditorium != null)
                {
                    existingAuditorium.Name = auditoriumDto.Name;
                    existingAuditorium.NumberOfRows = auditoriumDto.NumberOfRows;
                    existingAuditorium.NumberOfColumns = auditoriumDto.NumberOfColumns;

                    existingAuditorium.Seats.Clear();
                    List<Seat> updatedSeats = new List<Seat>();
                    for (int row = 1; row <= existingAuditorium.NumberOfRows; row++)
                    {
                        for (int column = 1; column <= existingAuditorium.NumberOfColumns; column++)
                        {
                            updatedSeats.Add(new Seat
                            {
                                Row = row,
                                Column = column,
                                AuditoriumId = existingAuditorium.Id
                            });
                        }
                    }
                    existingAuditorium.Seats = updatedSeats;
                    existingAuditorium.NumberOfSeats = updatedSeats.Count;
                }
            }

            existingCinema.NumberOfSeats = existingCinema.Auditoriums.Sum(a => a.NumberOfSeats);

            await _context.SaveChangesAsync();

            return existingCinema;
        }
	}
}
