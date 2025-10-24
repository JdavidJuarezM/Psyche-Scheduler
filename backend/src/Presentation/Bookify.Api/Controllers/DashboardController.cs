// path: backend/src/Presentation/Bookify.Api/Controllers/DashboardController.cs

using Bookify.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Bookify.Api.Controllers;

[ApiController]
[Route("api/dashboard")]
[Authorize(Roles = "Psychologist")]
public class DashboardController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;

    public DashboardController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("summary")] // Ruta: GET /api/dashboard/summary
    public async Task<IActionResult> GetSummary()
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

        // Asumimos que el psicólogo logueado es el "dueño" de todos los datos por ahora.
        // En un sistema más complejo, filtraríamos por PsychologistId.

        var now = DateTime.UtcNow;

        // 1. Obtener las próximas 3 sesiones
        var upcomingBookings = await _dbContext.Bookings
            .Where(b => b.BookingDate >= now)
            .OrderBy(b => b.BookingDate)
            .Take(3)
            .Include(b => b.User) // Incluimos los datos del paciente (User)
            .Select(b => new 
            {
                b.Id,
                BookingDate = b.BookingDate,
                PatientName = b.User != null ? $"{b.User.FirstName} {b.User.LastName}" : "Paciente no encontrado"
            })
            .ToListAsync();

        // 2. Obtener los 3 pacientes más recientes
        var recentPatients = await _dbContext.Users
            .OrderByDescending(u => u.Id) // Suponiendo que IDs más nuevos son más recientes
            .Take(3)
            .Select(u => new {
                u.Id,
                u.FirstName,
                u.LastName,
                u.Email
            })
            .ToListAsync();

        // 3. Calcular estadísticas
        var totalPatients = await _dbContext.Users.CountAsync();
        var bookingsThisMonth = await _dbContext.Bookings
            .CountAsync(b => b.BookingDate.Year == now.Year && b.BookingDate.Month == now.Month);

        // 4. Crear el objeto de respuesta
        var summary = new 
        {
            UpcomingBookings = upcomingBookings,
            RecentPatients = recentPatients,
            Stats = new 
            {
                TotalPatients = totalPatients,
                BookingsThisMonth = bookingsThisMonth
            }
        };

        return Ok(summary);
    }
}