using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace sustav_za_kupnju_karata_u_kinu_API.Dtos.Account
{
    public class RegisterDto
    {
        [Required]
        public string? Username { get; set; }
        [Required]
        [EmailAddress]
        public string? Email { get; set;}
        [Required]
        public string? Password { get; set; }
        
    }
}
