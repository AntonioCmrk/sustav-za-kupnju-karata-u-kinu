using Microsoft.AspNetCore.Mvc;
using sustav_za_kupnju_karata_u_kinu_API.Data;
using sustav_za_kupnju_karata_u_kinu_API.Dtos.Cinema;
using sustav_za_kupnju_karata_u_kinu_API.Mappers;

namespace sustav_za_kupnju_karata_u_kinu_API.Controllers
{
	[Route("api/cinema")]
	[ApiController]
	public class CinemaController : ControllerBase
	{
		private readonly ApplicationDBContext _context;
		public CinemaController(ApplicationDBContext context)
		{
			_context = context;
		}

		[HttpGet]
		public IActionResult GetAll()
		{
			var cinemas = _context.Cinemas.ToList().Select(s => s.ToCinemaDto());
			return Ok(cinemas);
		}

		[HttpGet("{id}")]
		public IActionResult GetById([FromRoute] int id)
		{
			var cinema = _context.Cinemas.Find(id);
			if (cinema == null)
			{
				return NotFound();
			}
			return Ok(cinema.ToCinemaDto());
		}

		[HttpPost]
		public IActionResult Create([FromBody] CreateCinemaRequestDto cinemaDto)
		{
			var cinemaModel = cinemaDto.ToCinemaFromCreateDTO();
			_context.Cinemas.Add(cinemaModel);
			_context.SaveChanges();
			return CreatedAtAction(nameof(GetById), new { id = cinemaModel.Id }, cinemaModel.ToCinemaDto());
		}
	}
}
