namespace sustav_za_kupnju_karata_u_kinu_API.Models
{
	public class ReservationSeat
	{
		public int Id { get; set; }
		public int ProjectionReservationId { get; set; }
		public ProjectionReservation? ProjectionReservation { get; set; }
		public int SeatId { get; set; }
		public Seat? Seat { get; set; }

	}
}
