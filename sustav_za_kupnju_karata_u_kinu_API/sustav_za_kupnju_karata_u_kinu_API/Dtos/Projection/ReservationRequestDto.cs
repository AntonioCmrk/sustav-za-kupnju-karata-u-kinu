namespace sustav_za_kupnju_karata_u_kinu_API.Dtos.Projection
{
    public class ReservationRequestDto
    {
        public int ProjectionId { get; set; }
        public List<int> SeatIds { get; set; }
    }

}
