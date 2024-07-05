namespace sustav_za_kupnju_karata_u_kinu_API.Models
{
	public class Movie
	{
		public int Id { get; set; }
		public string Title { get; set; } = string.Empty;
		public string ShortDescription { get; set; } = string.Empty;
		public string Description { get; set; } = string.Empty;
		public int LengthInMinutes { get; set; }
		public string OriginalTitle { get; set; } = string.Empty;
		public string Genre { get; set; } = string.Empty;
		public int Year { get; set; }
		public string Country { get; set; } = string.Empty;
		public string CoverImage { get; set; } = string.Empty;
		public string BackgroundImage { get; set; } = string.Empty;
		public List<Projection> Projections { get; set; } = new List<Projection>();

	}
}
