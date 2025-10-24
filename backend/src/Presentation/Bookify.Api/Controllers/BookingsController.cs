// path: backend/src/Presentation/Bookify.Api/Controllers/BookingsController.cs

using Bookify.Api.Contracts;
using Bookify.Domain.Entities;
using Bookify.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Bookify.Api.Controllers;

[ApiController]
[Route("api/bookings")]
[Authorize]
public class BookingsController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;

    public BookingsController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost]
    public async Task<IActionResult> CreateBooking(CreateBookingRequest request)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

        var booking = new Booking(
            Guid.NewGuid(),
            request.ServiceId, // <-- CAMBIADO de request.RestaurantId
            userId,
            request.ProfessionalId,
            request.BookingDate);

        _dbContext.Bookings.Add(booking);
        await _dbContext.SaveChangesAsync();

        return Ok(booking.Id);
    }

    [HttpGet("my-bookings")]
    public async Task<IActionResult> GetMyBookings()
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

        var bookings = await _dbContext.Bookings
            .Where(b => b.UserId == userId)
            .Select(b => new 
            {
                b.Id,
                // CAMBIADO para usar la propiedad Service y renombrado a ServiceName
                ServiceName = b.Service != null ? b.Service.Name : "Servicio no encontrado",
                ProfessionalName = b.Professional != null ? b.Professional.Name : "Profesional no encontrado",
                b.BookingDate
            })
            .ToListAsync();

        return Ok(bookings);
    }
}