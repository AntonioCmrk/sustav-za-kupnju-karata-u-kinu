using Microsoft.AspNetCore.Mvc;
using sustav_za_kupnju_karata_u_kinu_API.Interfaces;

namespace sustav_za_kupnju_karata_u_kinu_API.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class AuditoriumController : ControllerBase
    {
        private readonly IAuditoriumRepository _auditoriumRepository;

        public AuditoriumController(IAuditoriumRepository auditoriumRepository)
        {
            _auditoriumRepository = auditoriumRepository;
        }

        [HttpGet("noSeatsColumns/{auditoriumId}")]
        public async Task<IActionResult> GetAuditoriumDetails(int auditoriumId)
        {
            var auditoriumDetails = await _auditoriumRepository.GetAuditoriumDetailsAsync(auditoriumId);
            if (auditoriumDetails == null)
            {
                return NotFound("Auditorium not found.");
            }
            return Ok(auditoriumDetails);
        }
        [HttpGet("cinema/{cinemaId}")]
        public async Task<IActionResult> GetAuditoriumsByCinemaId(int cinemaId)
        {
            var auditoriums = await _auditoriumRepository.GetAuditoriumsByCinemaIdAsync(cinemaId);
            if (auditoriums == null || auditoriums.Count == 0)
            {
                return NotFound("No auditoriums found for the given cinema.");
            }
            return Ok(auditoriums);
        }
    }
}