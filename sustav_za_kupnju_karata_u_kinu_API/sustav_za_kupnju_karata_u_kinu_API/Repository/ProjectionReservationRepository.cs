using Microsoft.EntityFrameworkCore;
using sustav_za_kupnju_karata_u_kinu_API.Data;
using sustav_za_kupnju_karata_u_kinu_API.Interfaces;

namespace sustav_za_kupnju_karata_u_kinu_API.Repository
{
    public class ProjectionReservationRepository : IProjectionReservationRepository
    {
        private readonly ApplicationDBContext _context;

        public ProjectionReservationRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<bool> DeleteProjectionReservation(int projectionReservationId)
        {
            var projectionReservation = await _context.ProjectionReservations
                                                      .Include(pr => pr.ReservationSeats)
                                                      .FirstOrDefaultAsync(pr => pr.Id == projectionReservationId);

            if (projectionReservation == null)
            {
                return false;
            }


            _context.ReservationSeats.RemoveRange(projectionReservation.ReservationSeats);
            _context.ProjectionReservations.Remove(projectionReservation);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}