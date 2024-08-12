namespace sustav_za_kupnju_karata_u_kinu_API.Models
{
	public class ProjectionReservation
	{
		public int Id { get; set; }
		public int AppUserId { get; set; }
		public AppUser? AppUser { get; set; }
		public int ProjectionId { get; set; }
		public Projection? Projection { get; set; }
		public DateTime ReservationTime { get; set; } = DateTime.Now;
		public List<ReservationSeat> ReservationSeats { get; set; } = new List<ReservationSeat>();


	}
}
