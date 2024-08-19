using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sustav_za_kupnju_karata_u_kinu_API.Dtos.Cinema;
using sustav_za_kupnju_karata_u_kinu_API.Dtos.Projection;
using sustav_za_kupnju_karata_u_kinu_API.Interfaces;
using sustav_za_kupnju_karata_u_kinu_API.Models;
using sustav_za_kupnju_karata_u_kinu_API.Repository;

namespace sustav_za_kupnju_karata_u_kinu_API.Controllers
{
	[Route("api/[Controller]")]
	[ApiController]
	public class ProjectionController : ControllerBase
	{
		private readonly IProjectionRepository _projectionRepo;
        private readonly UserManager<AppUser> _userManager;
        public ProjectionController(IProjectionRepository projectionRepo, UserManager<AppUser> userManager) // Modify the constructor
        {
            _projectionRepo = projectionRepo;
            _userManager = userManager; 
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

        [HttpGet("{id}/details")]
        public async Task<IActionResult> GetProjectionDetails(int id)
        {
            var projection = await _projectionRepo.GetDetailsByIdAsync(id);

            if (projection == null || projection.Movie == null)
            {
                return NotFound();
            }

            var projectionDetailsDto = new ProjectionDetailsDto
            {
                ProjectionId = projection.Id,
                DateTime = projection.DateTime,
                Price = projection.Price,
                MovieTitle = projection.Movie.Title,
                Description = projection.Movie.Description,
                LengthInMinutes = projection.Movie.LengthInMinutes,
                OriginalTitle = projection.Movie.OriginalTitle,
                Genre = projection.Movie.Genre,
                Year = projection.Movie.Year,
                Country = projection.Movie.Country,
                BackgroundImage = projection.Movie.BackgroundImage
            };

            return Ok(projectionDetailsDto);
        }

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

        [HttpGet("reservations/{projectionId}")]
        public async Task<ActionResult<IEnumerable<SeatAvailabilityDto>>> GetAvailableSeats(int projectionId)
        {
            var projection = await _projectionRepo.GetByIdAsync(projectionId);
            if (projection == null)
            {
                return NotFound("Projection not found.");
            }

            var seats = await _projectionRepo.GetSeatsByAuditoriumIdAsync(projection.AuditoriumId ?? 0);
            var reservedSeatIds = await _projectionRepo.GetReservedSeatIdsForProjectionAsync(projectionId);

            var availableSeats = seats
                .Where(s => !reservedSeatIds.Contains(s.Id))
                .Select(s => new SeatAvailabilityDto
                {
                    SeatId = s.Id,
                    Row = s.Row,
                    Column = s.Column,
                    IsAvailable = true
                })
                .ToList();

            return Ok(availableSeats);
        }
        [HttpPost("reserve")]
        [Authorize] // Ensure that only logged-in users can reserve seats
        public async Task<IActionResult> ReserveSeats([FromBody] ReservationRequestDto request)
        {
            // Extract the given_name (username) from JWT
            var userName = User.Claims.First(c => c.Type == "given_name").Value;
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return Unauthorized();
            }

            // Check if all seats are available
            var reservedSeats = await _projectionRepo.GetReservedSeatsForProjectionAsync(request.ProjectionId, request.SeatIds);

            if (reservedSeats.Any())
            {
                return BadRequest("Some of the selected seats are already reserved.");
            }

            // Create a new reservation
            var reservation = new ProjectionReservation
            {
                AppUserId = user.Id,
                ProjectionId = request.ProjectionId,
                ReservationSeats = request.SeatIds.Select(seatId => new ReservationSeat
                {
                    SeatId = seatId
                }).ToList()
            };

            await _projectionRepo.AddReservationAsync(reservation);

            return Ok(new { Message = "Reservation successful", ReservationId = reservation.Id });
        }
    }
}
