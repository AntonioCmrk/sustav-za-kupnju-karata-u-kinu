using Microsoft.EntityFrameworkCore;
using sustav_za_kupnju_karata_u_kinu_API.Data;
using sustav_za_kupnju_karata_u_kinu_API.Dtos.Auditorium;
using sustav_za_kupnju_karata_u_kinu_API.Interfaces;

namespace sustav_za_kupnju_karata_u_kinu_API.Repository
{
    public class AuditoriumRepository : IAuditoriumRepository
    {
        private readonly ApplicationDBContext _context;
        public AuditoriumRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<AuditoriumDetailsDto> GetAuditoriumDetailsAsync(int auditoriumId)
        {
            return await _context.Auditoriums
                                 .Where(a => a.Id == auditoriumId)
                                 .Select(a => new AuditoriumDetailsDto
                                 {
                                     NumberOfRows = a.NumberOfRows,
                                     NumberOfColumns = a.NumberOfColumns
                                 })
                                 .FirstOrDefaultAsync();
        }
    }
}
