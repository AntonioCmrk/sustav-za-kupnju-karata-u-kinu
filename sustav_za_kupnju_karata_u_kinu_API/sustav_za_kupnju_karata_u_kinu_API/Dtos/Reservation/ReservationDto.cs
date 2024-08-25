using sustav_za_kupnju_karata_u_kinu_API.Dtos.Seat;

namespace sustav_za_kupnju_karata_u_kinu_API.Dtos.Reservation
{
    public class ReservationDto
    {
        public int ReservationId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string CinemaName { get; set; } = string.Empty;
        public string AuditoriumName { get; set; } = string.Empty;
        public string MovieName { get; set; } = string.Empty;
        public DateTime ProjectionDateTime { get; set; } 
        public List<SeatDto> Seats { get; set; } = new List<SeatDto>();
        public DateTime ReservationTime { get; set; }
    }
}
