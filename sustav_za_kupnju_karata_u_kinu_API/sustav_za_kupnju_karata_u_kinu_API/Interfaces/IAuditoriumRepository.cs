using sustav_za_kupnju_karata_u_kinu_API.Dtos.Auditorium;
using sustav_za_kupnju_karata_u_kinu_API.Models;

namespace sustav_za_kupnju_karata_u_kinu_API.Interfaces
{
    public interface IAuditoriumRepository
    {
        Task<AuditoriumDetailsDto> GetAuditoriumDetailsAsync(int auditoriumId);
        Task<List<Auditorium>> GetAuditoriumsByCinemaIdAsync(int cinemaId);
    }
}
