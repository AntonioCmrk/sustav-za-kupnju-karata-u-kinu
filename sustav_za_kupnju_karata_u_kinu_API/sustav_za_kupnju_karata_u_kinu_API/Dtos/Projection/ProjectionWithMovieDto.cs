namespace sustav_za_kupnju_karata_u_kinu_API.Dtos.Projection
{
    public class ProjectionWithMovieDto
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public decimal Price { get; set; }
        public string MovieTitle { get; set; } = string.Empty;
        public string MovieCoverImage { get; set; } = string.Empty;
        public int? AuditoriumId { get; set; }
    }
}
