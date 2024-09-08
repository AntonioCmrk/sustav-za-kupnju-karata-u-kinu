namespace sustav_za_kupnju_karata_u_kinu_API.Interfaces
{
    public interface IProjectionReservationRepository
    {
        Task<bool> DeleteProjectionReservation(int projectionReservationId);
    }
}
