using sustav_za_kupnju_karata_u_kinu_API.Dtos.Reservation;
using sustav_za_kupnju_karata_u_kinu_API.Models;

namespace sustav_za_kupnju_karata_u_kinu_API.Interfaces
{
    public interface IReservationService
    {
        Task<string> SaveReservationToBlockchainAsync(ProjectionReservation reservation);
        Task<List<ReservationDto>> GetReservationsByUsernameAsync(string userName);
    }
}
