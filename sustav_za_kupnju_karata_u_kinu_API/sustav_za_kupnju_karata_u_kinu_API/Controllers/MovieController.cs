using Microsoft.AspNetCore.Mvc;
using sustav_za_kupnju_karata_u_kinu_API.Dtos;
using sustav_za_kupnju_karata_u_kinu_API.Dtos.Cinema;
using sustav_za_kupnju_karata_u_kinu_API.Interfaces;
using sustav_za_kupnju_karata_u_kinu_API.Mappers;
using sustav_za_kupnju_karata_u_kinu_API.Models;

namespace sustav_za_kupnju_karata_u_kinu_API.Controllers
{
	[Route("api/[Controller]")]
	[ApiController]
	public class MovieController : ControllerBase
	{
		private readonly IMovieRepository _movieRepo;

		public MovieController(IMovieRepository movieRepo)
		{
			_movieRepo = movieRepo;
		}

		[HttpGet]
		public async Task<IActionResult> GetAll()
		{
			var movies = await _movieRepo.GetAllAsync();
			return Ok(movies);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetById([FromRoute] int id)
		{
			var movie = await _movieRepo.GetByIdAsync(id);
			if (movie == null)
			{
				return NotFound();
			}
			return Ok(movie);
		}

		[HttpDelete]
		[Route("{id}")]
		public async Task<IActionResult> Delete([FromRoute] int id)
		{
			var movieModel = await _movieRepo.DeleteAsync(id);

			if (movieModel == null)
			{
				return NotFound();
			}
			return NoContent();
		}

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateMovieRequestDto movieDto)
        {
            var movie = new Movie
            {
                Title = movieDto.Title,
                ShortDescription = movieDto.ShortDescription,
                Description = movieDto.Description,
                LengthInMinutes = movieDto.LengthInMinutes,
                OriginalTitle = movieDto.OriginalTitle,
                Genre = movieDto.Genre,
                Year = movieDto.Year,
                Country = movieDto.Country,
                CoverImage = movieDto.CoverImage,
                BackgroundImage = movieDto.BackgroundImage
            };

            var createdMovie = await _movieRepo.CreateAsync(movie);
            return CreatedAtAction(nameof(GetById), new { id = createdMovie.Id }, createdMovie);
        }
    }
}
