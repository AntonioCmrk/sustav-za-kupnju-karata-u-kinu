using Microsoft.EntityFrameworkCore;
using sustav_za_kupnju_karata_u_kinu_API.Data;
using sustav_za_kupnju_karata_u_kinu_API.Dtos.Cinema;
using sustav_za_kupnju_karata_u_kinu_API.Dtos.Projection;
using sustav_za_kupnju_karata_u_kinu_API.Interfaces;
using sustav_za_kupnju_karata_u_kinu_API.Models;

namespace sustav_za_kupnju_karata_u_kinu_API.Repository
{
	public class ProjectionRepository : IProjectionRepository
	{
		private readonly ApplicationDBContext _context;
		public ProjectionRepository(ApplicationDBContext context)
		{
			_context = context;
		}
		public async Task<Projection> CreateAsync(Projection projectionModel)
		{
			await _context.Projections.AddAsync(projectionModel);
			await _context.SaveChangesAsync();
			return projectionModel;
		}

		public async Task<Projection?> DeleteAsync(int id)
		{
			var projectionModel = await _context.Projections.FirstOrDefaultAsync(x => x.Id == id);
			if (projectionModel == null)
			{
				return null;
			}
			_context.Projections.Remove(projectionModel);
			await _context.SaveChangesAsync();
			return projectionModel;
		}

		public async Task<List<Projection>> GetAllAsync()
		{
			return await _context.Projections
				.Include(x => x.Cinema)
				.ThenInclude(x => x.Address)
				.Include(x => x.Movie)
				.Include(x => x.Auditorium)
				.ToListAsync();
		}

		public async Task<Projection?> GetByIdAsync(int id)
		{
			return await _context.Projections.FirstOrDefaultAsync(x => x.Id == id);
		}

        public async Task<List<ProjectionWithMovieDto>> GetProjectionsByCinemaId(int cinemaId)
        {
            return await _context.Projections
                                 .Include(p => p.Movie)  
                                 .Where(p => p.CinemaId == cinemaId)
                                 .Select(p => new ProjectionWithMovieDto
                                 {
                                     Id = p.Id,
                                     DateTime = p.DateTime,
                                     Price = p.Price,
                                     MovieTitle = p.Movie.Title,
                                     MovieCoverImage = p.Movie.CoverImage,
                                     AuditoriumId = p.AuditoriumId
                                 })
                                 .ToListAsync();
        }

        public async Task<Projection?> UpdateAsync(int id, Projection projectionDto)
		{
			var existingProjection = await _context.Projections.FirstOrDefaultAsync(x => x.Id == id);
			if (existingProjection == null)
			{
				return null;
			}
			existingProjection.DateTime = projectionDto.DateTime;
			existingProjection.Price = projectionDto.Price;

			await _context.SaveChangesAsync();

			return existingProjection;
		}

        public async Task<Projection?> GetDetailsByIdAsync(int id)
        {
            return await _context.Projections
                .Include(p => p.Movie) 
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<List<Seat>> GetSeatsByAuditoriumIdAsync(int auditoriumId)
        {
            return await _context.Seats
                                 .Where(s => s.AuditoriumId == auditoriumId)
                                 .ToListAsync();
        }

        public async Task<List<int>> GetReservedSeatIdsForProjectionAsync(int projectionId)
        {
            return await _context.ReservationSeats
                                 .Where(rs => rs.ProjectionReservation.ProjectionId == projectionId)
                                 .Select(rs => rs.SeatId)
                                 .ToListAsync();
        }

    }
}
