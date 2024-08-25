//using Microsoft.AspNetCore.Mvc;
//using sustav_za_kupnju_karata_u_kinu_API.Models;
//using sustav_za_kupnju_karata_u_kinu_API.Services;

//namespace sustav_za_kupnju_karata_u_kinu_API.Controllers
//{
//    [Route("api/[Controller]")]
//    [ApiController]
//    public class ReservationsController : ControllerBase
//    {
//        private readonly ReservationService _blockchainService;

//        public ReservationsController(ReservationService blockchainService)
//        {
//            _blockchainService = blockchainService;
//        }

//        [HttpPost("create")]
//        public async Task<IActionResult> CreateReservation([FromBody] ProjectionReservation reservation)
//        {
//            string userAddress = "0x54D6C3eDf1925c229eEAAe4590f52507D8c7f8CC";
//            string transactionHash = await _blockchainService.CreateReservationAsync(userAddress, reservation);

//            return Ok(new { TransactionHash = transactionHash });
//        }

//        [HttpGet("{username}")]
//        public async Task<IActionResult> GetReservations(string username)
//        {
//            var reservations = await _blockchainService.GetReservationsByUsernameAsync(username);
//            return Ok(reservations);
//        }
//    }
//}