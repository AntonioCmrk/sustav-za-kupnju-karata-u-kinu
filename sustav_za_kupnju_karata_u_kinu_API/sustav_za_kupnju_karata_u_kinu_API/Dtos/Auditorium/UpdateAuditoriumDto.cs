﻿namespace sustav_za_kupnju_karata_u_kinu_API.Dtos.Auditorium
{
    public class UpdateAuditoriumDto
    {
        public int Id { get; set; } 
        public string Name { get; set; } = string.Empty;
        public int NumberOfRows { get; set; }
        public int NumberOfColumns { get; set; }
    }
}
