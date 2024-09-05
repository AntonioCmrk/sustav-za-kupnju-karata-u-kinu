namespace sustav_za_kupnju_karata_u_kinu_API.Dtos.Projection
{
    public class CreateProjectionRequestDto
    {
        public int? CinemaId { get; set; }
        public int? MovieId { get; set; }
        public int? AuditoriumId { get; set; }
        public DateTime DateTime { get; set; }
        public decimal Price { get; set; }
    }
}
