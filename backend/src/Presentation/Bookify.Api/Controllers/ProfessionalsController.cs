// path: backend/src/Presentation/Bookify.Api/Controllers/ProfessionalsController.cs

using Bookify.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bookify.Api.Controllers;

[ApiController]
[Route("api/professionals")]
public class ProfessionalsController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;

    public ProfessionalsController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Ruta: GET /api/professionals
    [HttpGet]
    public async Task<IActionResult> GetProfessionals()
    {
        var professionals = await _dbContext.Professionals.ToListAsync();
        return Ok(professionals);
    }
}