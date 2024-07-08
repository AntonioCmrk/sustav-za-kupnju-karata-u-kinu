using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sustav_za_kupnju_karata_u_kinu_API.Data;
using sustav_za_kupnju_karata_u_kinu_API.Dtos.Cinema;
using sustav_za_kupnju_karata_u_kinu_API.Interfaces;
using sustav_za_kupnju_karata_u_kinu_API.Mappers;

namespace sustav_za_kupnju_karata_u_kinu_API.Controllers
{
	[Route("api/cinema")]
	[ApiController]
	public class CinemaController : ControllerBase
	{
		private readonly ICinemaRepository _cinemaRepo;
		private readonly ApplicationDBContext _context;
		public CinemaController(ApplicationDBContext context, ICinemaRepository cinemaRepo)
		{
			_cinemaRepo = cinemaRepo;
			_context = context;
		}

		[HttpGet]
		public async Task<IActionResult> GetAll()
		{
			var cinemas = await _cinemaRepo.GetAllAsync();
			var cinemaDto = cinemas.Select(s => s.ToCinemaDto());
			return Ok(cinemas);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetById([FromRoute] int id)
		{
			var cinema = await _cinemaRepo.GetByIdAsync(id);
			if (cinema == null)
			{
				return NotFound();
			}
			return Ok(cinema.ToCinemaDto());
		}

		[HttpPost]
		public async Task<IActionResult> Create([FromBody] CreateCinemaRequestDto cinemaDto)
		{
			var cinemaModel = cinemaDto.ToCinemaFromCreateDTO();
			await _cinemaRepo.CreateAsync(cinemaModel);
			return CreatedAtAction(nameof(GetById), new { id = cinemaModel.Id }, cinemaModel.ToCinemaDto());
		}

		[HttpPut]
		[Route("{id}")]
		public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCinemaRequestDto updateDto)
		{
			var cinemaModel = await _cinemaRepo.UpdateAsync(id, updateDto);
			if (cinemaModel == null)
			{
				return NotFound();
			}
			return Ok(cinemaModel.ToCinemaDto());
		}

		[HttpDelete]
		[Route("{id}")]
		public async Task<IActionResult> Delete([FromRoute] int id)
		{
			var cinemaModel = await _cinemaRepo.DeleteAsync(id);

			if (cinemaModel == null)
			{
				return NotFound();
			}
			return NoContent();
		}
	}
}
