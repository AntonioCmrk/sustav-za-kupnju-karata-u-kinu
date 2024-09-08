using Microsoft.AspNetCore.Mvc;
using sustav_za_kupnju_karata_u_kinu_API.Interfaces;

namespace sustav_za_kupnju_karata_u_kinu_API.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class ProjectionReservationController : ControllerBase
    {
        private readonly IProjectionReservationRepository _projectionReservationRepository;

        public ProjectionReservationController(IProjectionReservationRepository projectionReservationRepository)
        {
            _projectionReservationRepository = projectionReservationRepository;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectionReservation(int id)
        {
            var result = await _projectionReservationRepository.DeleteProjectionReservation(id);

            if (!result)
            {
                return NotFound("Projection reservation not found.");
            }

            return NoContent(); 
        }
    }
}
