using Microsoft.AspNetCore.Mvc;
using sustav_za_kupnju_karata_u_kinu_API.Dtos.Cinema;
using sustav_za_kupnju_karata_u_kinu_API.Interfaces;
using sustav_za_kupnju_karata_u_kinu_API.Repository;

namespace sustav_za_kupnju_karata_u_kinu_API.Controllers
{
	[Route("api/[Controller]")]
	[ApiController]
	public class ProjectionController : ControllerBase
	{
		private readonly IProjectionRepository _projectionRepo;

		public ProjectionController(IProjectionRepository projectionRepo)
		{
			_projectionRepo = projectionRepo;
		}

		[HttpGet]
		public async Task<IActionResult> GetAll()
		{
			var projections = await _projectionRepo.GetAllAsync();
			return Ok(projections);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetById([FromRoute] int id)
		{
			var projection = await _projectionRepo.GetByIdAsync(id);
			if (projection == null)
			{
				return NotFound();
			}
			return Ok(projection);
		}

        [HttpGet("{cinemaId}/projections")]
        public async Task<IActionResult> GetProjections(int cinemaId)
        {
            var projections = await _projectionRepo.GetProjectionsByCinemaId(cinemaId);
            return Ok(projections);
        }

        //[HttpPost]
        //public async Task<IActionResult> Create([FromBody] CreateCinemaRequestDto projectionDto)
        //{
        //	var projectionModel = projectionDto.ToCinemaFromCreateDTO();
        //	await _projectionRepo.CreateAsync(projectionModel);
        //	return CreatedAtAction(nameof(GetById), new { id = projectionModel.Id }, projectionModel.ToCinemaDto());
        //}

        //[HttpPut]
        //[Route("{id}")]
        //public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCinemaRequestDto updateDto)
        //{
        //	var projectionModel = await _projectionRepo.UpdateAsync(id, updateDto);
        //	if (projectionModel == null)
        //	{
        //		return NotFound();
        //	}
        //	return Ok(projectionModel.ToCinemaDto());
        //}

        [HttpDelete]
		[Route("{id}")]
		public async Task<IActionResult> Delete([FromRoute] int id)
		{
			var projectionModel = await _projectionRepo.DeleteAsync(id);

			if (projectionModel == null)
			{
				return NotFound();
			}
			return NoContent();
		}
	}
}
