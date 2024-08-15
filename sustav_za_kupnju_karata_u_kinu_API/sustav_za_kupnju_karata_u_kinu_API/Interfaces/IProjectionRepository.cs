﻿using Microsoft.EntityFrameworkCore;
using sustav_za_kupnju_karata_u_kinu_API.Dtos.Cinema;
using sustav_za_kupnju_karata_u_kinu_API.Dtos.Projection;
using sustav_za_kupnju_karata_u_kinu_API.Models;

namespace sustav_za_kupnju_karata_u_kinu_API.Interfaces
{
	public interface IProjectionRepository
	{

		Task<List<Projection>> GetAllAsync();
		Task<Projection?> GetByIdAsync(int id);
		Task<Projection> CreateAsync(Projection projectionModel);
		Task<Projection?> UpdateAsync(int id, Projection proojectionDto);
		Task<Projection?> DeleteAsync(int id);
        Task<List<ProjectionWithMovieDto>> GetProjectionsByCinemaId(int cinemaId);
    }
}

