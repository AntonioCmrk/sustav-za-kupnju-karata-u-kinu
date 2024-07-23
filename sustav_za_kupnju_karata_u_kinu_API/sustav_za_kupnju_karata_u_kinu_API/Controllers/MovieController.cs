using Microsoft.AspNetCore.Mvc;
using sustav_za_kupnju_karata_u_kinu_API.Dtos.Cinema;
using sustav_za_kupnju_karata_u_kinu_API.Interfaces;
using sustav_za_kupnju_karata_u_kinu_API.Mappers;

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

		//[HttpPost]
		//public async Task<IActionResult> Create([FromBody] CreateCinemaRequestDto movieDto)
		//{
		//	var movieModel = movieDto.ToCinemaFromCreateDTO();
		//	await _movieRepo.CreateAsync(movieModel);
		//	return CreatedAtAction(nameof(GetById), new { id = movieModel.Id }, movieModel.ToCinemaDto());
		//}

		//[HttpPut]
		//[Route("{id}")]
		//public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCinemaRequestDto updateDto)
		//{
		//	var movieModel = await _movieRepo.UpdateAsync(id, updateDto);
		//	if (movieModel == null)
		//	{
		//		return NotFound();
		//	}
		//	return Ok(movieModel.ToCinemaDto());
		//}

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
	}
}
