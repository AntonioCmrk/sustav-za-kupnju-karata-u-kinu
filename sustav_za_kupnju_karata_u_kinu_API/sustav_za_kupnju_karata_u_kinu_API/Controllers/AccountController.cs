using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sustav_za_kupnju_karata_u_kinu_API.Dtos.Account;
using sustav_za_kupnju_karata_u_kinu_API.Interfaces;
using sustav_za_kupnju_karata_u_kinu_API.Models;

namespace sustav_za_kupnju_karata_u_kinu_API.Controllers
{
	[Route("api/[Controller]")]
	[ApiController]
	public class AccountController : ControllerBase
	{
		private readonly UserManager<AppUser> _userManager;
		private readonly ITokenService _tokenService;
		private readonly SignInManager<AppUser> _signInManager;
		public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager)
		{
			_userManager = userManager;
			_tokenService = tokenService;
			_signInManager = signInManager;
		}

		[HttpPost("login")]
		public async Task<IActionResult> Login(LoginDto loginDto)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

			if (user == null) return Unauthorized("Username not found and/or password incorrect");

			var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

			if (!result.Succeeded) return Unauthorized("Username not found and/or password incorrect");

			var role = await _userManager.GetRolesAsync(user);

			if (role == null) return Unauthorized("Something went wrong during login!");

			return Ok(
				new NewUserDto
				{
					UserName = user.UserName,
					Email = user.Email,
					Token = _tokenService.CreateToken(user, role[0])
				}
			);
		}

		[HttpPost("register")]
		public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return BadRequest(ModelState);

				}

				var appUser = new AppUser
				{
					UserName = registerDto.Username,
					Email = registerDto.Email,
				};

				var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

				if (createdUser.Succeeded)
				{
					var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
					if (roleResult.Succeeded)
					{
						return Ok(
							new NewUserDto
							{
								UserName = appUser.UserName,
								Email = appUser.Email,
								Token = _tokenService.CreateToken(appUser, "User")
							}
							);
					}
					else
					{
						return StatusCode(500, roleResult.Errors);
					}
				}
				else
				{
					return StatusCode(500, createdUser.Errors);
				}

			}

			catch (Exception e)
			{
				return StatusCode(500, e);
			}
		}
	}
}
