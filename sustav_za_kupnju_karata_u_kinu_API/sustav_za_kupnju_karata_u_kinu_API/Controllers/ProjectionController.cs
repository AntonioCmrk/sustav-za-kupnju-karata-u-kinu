using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sustav_za_kupnju_karata_u_kinu_API.Dtos.Cinema;
using sustav_za_kupnju_karata_u_kinu_API.Dtos.Projection;
using sustav_za_kupnju_karata_u_kinu_API.Interfaces;
using sustav_za_kupnju_karata_u_kinu_API.Models;
using sustav_za_kupnju_karata_u_kinu_API.Repository;
using System.Security.Claims;

namespace sustav_za_kupnju_karata_u_kinu_API.Controllers
{
	[Route("api/[Controller]")]
	[ApiController]
	public class ProjectionController : ControllerBase
	{
		private readonly IProjectionRepository _projectionRepo;
		private readonly UserManager<AppUser> _userManager;
        public ProjectionController(IProjectionRepository projectionRepo, UserManager<AppUser> userManager)
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

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateProjectionRequestDto createProjectionDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var projection = new Projection
            {
                CinemaId = createProjectionDto.CinemaId,
                MovieId = createProjectionDto.MovieId,
                AuditoriumId = createProjectionDto.AuditoriumId,
                DateTime = createProjectionDto.DateTime,
                Price = createProjectionDto.Price
            };

            try
            {
                var createdProjection = await _projectionRepo.CreateAsync(projection);
                return CreatedAtAction(nameof(GetById), new { id = createdProjection.Id }, createdProjection);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
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
			var allSeatsWithAvailability = seats
				.Select(s => new SeatAvailabilityDto
				{
					SeatId = s.Id,
					Row = s.Row,
					Column = s.Column,
					IsAvailable = !reservedSeatIds.Contains(s.Id)
				})
				.ToList();

			return Ok(allSeatsWithAvailability);
		}
        [HttpPost("reserve")]
        [Authorize]
        public async Task<IActionResult> ReserveSeats([FromBody] ReservationRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var nameid = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            var user = await _userManager.FindByIdAsync(nameid);

            if (user == null)
            {
                return Unauthorized();
            }

            try
            {
                var reservedSeats = await _projectionRepo.GetReservedSeatsForProjectionAsync(request.ProjectionId, request.SeatIds);
                if (reservedSeats.Any())
                {
                    return BadRequest("Some of the selected seats are already reserved.");
                }

                var reservation = new ProjectionReservation
                {
                    AppUserId = user.Id,
                    GivenName = user.UserName,
                    ProjectionId = request.ProjectionId,
                    ReservationSeats = request.SeatIds.Select(seatId => new ReservationSeat { SeatId = seatId }).ToList(),
                    ReservationTime = DateTime.Now
                };

                await _projectionRepo.AddReservationAsync(reservation);

                var projection = await _projectionRepo.GetProjectionWithDetailsAsync(request.ProjectionId);
                if (projection == null)
                {
                    return StatusCode(500, "Projection not found.");
                }

                var cinemaName = projection.Cinema?.Name ?? "Unknown Cinema";
                var auditoriumName = projection.Auditorium?.Name ?? "Unknown Auditorium";
                var movieName = projection.Movie?.Title ?? "Unknown Movie";
                var projectionDateTime = projection.DateTime;
                var seatDetails = reservation.ReservationSeats.Select(rs => new
                {
                    Row = rs.Seat?.Row ?? 0,
                    Column = rs.Seat?.Column ?? 0
                }).ToList();
                var reservationTime = reservation.ReservationTime;

                var response = new
                {
                    ReservationId = reservation.Id,
                    UserId = user.Id,
                    UserName = user.UserName,
                    CinemaName = cinemaName,
                    AuditoriumName = auditoriumName,
                    MovieName = movieName,
                    ProjectionDateTime = projectionDateTime,
                    Seats = seatDetails,
                    ReservationTime = reservationTime,
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
    }
}



