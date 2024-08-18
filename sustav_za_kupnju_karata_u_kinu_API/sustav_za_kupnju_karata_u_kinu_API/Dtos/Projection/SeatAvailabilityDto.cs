namespace sustav_za_kupnju_karata_u_kinu_API.Dtos.Projection
{
    public class SeatAvailabilityDto
    {
        public int SeatId { get; set; }
        public int Row { get; set; }
        public int Column { get; set; }
        public bool IsAvailable { get; set; }
        public int NumberOfRows { get; set; }
        public int NumberOfColumns { get; set; }
    }
}
