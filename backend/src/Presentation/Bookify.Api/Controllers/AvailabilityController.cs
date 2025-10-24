// path: backend/src/Presentation/Bookify.Api/Controllers/AvailabilityController.cs
using Bookify.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bookify.Api.Controllers;

[ApiController]
[Route("api/availability")]
public class AvailabilityController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;

    public AvailabilityController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Ruta: GET /api/availability/{professionalId}?date=2025-08-25
    [HttpGet("{professionalId}")]
    public async Task<IActionResult> GetAvailability(Guid professionalId, [FromQuery] DateOnly date)
    {
        // Horario laboral estándar (esto podría venir de la base de datos en el futuro)
        var workingHours = new List<TimeOnly>
        {
            new(9, 0), new(10, 0), new(11, 0), new(12, 0),
            new(14, 0), new(15, 0), new(16, 0), new(17, 0)
        };

        // Obtenemos las horas que YA están reservadas para ese día y profesional
        var bookedTimes = await _dbContext.Bookings
            .Where(b => b.ProfessionalId == professionalId && b.BookingDate.Date == date.ToDateTime(TimeOnly.MinValue))
            .Select(b => TimeOnly.FromDateTime(b.BookingDate))
            .ToListAsync();

        // Calculamos los horarios que todavía están libres
        var availableSlots = workingHours.Except(bookedTimes)
                                         .Select(t => t.ToString("HH:mm"))
                                         .ToList();

        return Ok(availableSlots);
    }
}