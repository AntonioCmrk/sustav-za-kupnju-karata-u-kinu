using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sustav_za_kupnju_karata_u_kinu_API.Data;
using sustav_za_kupnju_karata_u_kinu_API.Dtos.Cinema;
using sustav_za_kupnju_karata_u_kinu_API.Interfaces;
using sustav_za_kupnju_karata_u_kinu_API.Mappers;
using sustav_za_kupnju_karata_u_kinu_API.Models;

namespace sustav_za_kupnju_karata_u_kinu_API.Controllers
{
	[Route("api/[Controller]")]
	[ApiController]
	public class CinemaController : ControllerBase
	{
		private readonly ICinemaRepository _cinemaRepo;

		public CinemaController(ICinemaRepository cinemaRepo)
		{
			_cinemaRepo = cinemaRepo;
		}

		[HttpGet]
		public async Task<IActionResult> GetAll()
		{
			var cinemas = await _cinemaRepo.GetAllAsync();
			var cinemasDto = cinemas.Select(s => s.ToCinemaDto());
			return Ok(cinemasDto);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetById([FromRoute] int id)
		{
			var cinema = await _cinemaRepo.GetByIdAsync(id);
			if (cinema == null)
			{
				return NotFound();
			}
			var cinemaDto = cinema.ToCinemaDto();
			return Ok(cinemaDto);
		}

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCinemaRequestDto cinemaDto)
        {
            if (cinemaDto == null)
            {
                return BadRequest("Cinema data is required.");
            }

            if (cinemaDto.AddressDto == null)
            {
                return BadRequest("Address information is required.");
            }

            var cinemaModel = new Cinema
            {
                Name = cinemaDto.Name,
                NumberOfAuditoriums = cinemaDto.NumberOfAuditoriums,
                Image = cinemaDto.Image,
                Address = new Address
                {
                    PostalCode = cinemaDto.AddressDto.PostalCode,
                    City = cinemaDto.AddressDto.City,
                    Country = cinemaDto.AddressDto.Country,
                    StreetName = cinemaDto.AddressDto.StreetName,
                    HouseNumber = cinemaDto.AddressDto.HouseNumber
                },
                Auditoriums = cinemaDto.Auditoriums.Select(a => new Auditorium
                {
                    Name = a.Name,
                    NumberOfRows = a.NumberOfRows,
                    NumberOfColumns = a.NumberOfColumns,
                    Seats = new List<Seat>()
                }).ToList()
            };

            foreach (var auditorium in cinemaModel.Auditoriums)
            {
                List<Seat> seats = new List<Seat>();
                for (int row = 1; row <= auditorium.NumberOfRows; row++)
                {
                    for (int column = 1; column <= auditorium.NumberOfColumns; column++)
                    {
                        seats.Add(new Seat
                        {
                            Row = row,
                            Column = column,
                            Auditorium = auditorium
                        });
                    }
                }
                auditorium.Seats = seats;
            }

            await _cinemaRepo.CreateAsync(cinemaModel);

            return CreatedAtAction(nameof(GetById), new { id = cinemaModel.Id }, cinemaModel);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCinemaRequestDto updateDto)
        {
            var updatedCinema = await _cinemaRepo.UpdateAsync(id, updateDto);

            if (updatedCinema == null)
            {
                return NotFound();
            }

            return Ok(updatedCinema.ToCinemaDto());
        }

        [HttpDelete("{id}")]
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
