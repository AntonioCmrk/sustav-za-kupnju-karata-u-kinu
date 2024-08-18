using Microsoft.AspNetCore.Mvc;

namespace sustav_za_kupnju_karata_u_kinu_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImageController : ControllerBase
    {
        private readonly IWebHostEnvironment _hostEnvironment;

        public ImageController(IWebHostEnvironment hostEnvironment)
        {
            _hostEnvironment = hostEnvironment;
        }

        [HttpGet("{filename}")]
        public async Task<IActionResult> GetImage(string filename)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "images", filename);

            if (!System.IO.File.Exists(imagePath))
            {
                return NotFound();
            }

            var memoryStream = new MemoryStream();
            await using (var stream = new FileStream(imagePath, FileMode.Open))
            {
                await stream.CopyToAsync(memoryStream);
            }
            memoryStream.Position = 0;
            return File(memoryStream, "image/jpeg");
        }
    }
}