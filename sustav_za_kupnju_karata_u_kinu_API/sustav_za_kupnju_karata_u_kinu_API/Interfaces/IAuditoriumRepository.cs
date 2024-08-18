using sustav_za_kupnju_karata_u_kinu_API.Dtos.Auditorium;

namespace sustav_za_kupnju_karata_u_kinu_API.Interfaces
{
    public interface IAuditoriumRepository
    {
        Task<AuditoriumDetailsDto> GetAuditoriumDetailsAsync(int auditoriumId);
    }
}
