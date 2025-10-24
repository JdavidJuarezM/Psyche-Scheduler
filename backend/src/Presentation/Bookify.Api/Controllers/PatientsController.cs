// path: backend/src/Presentation/Bookify.Api/Controllers/PatientsController.cs

using Bookify.Api.Contracts;
using Bookify.Domain.Entities;
using Bookify.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace Bookify.Api.Controllers;

[ApiController]
[Route("api/patients")]
public class PatientsController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;

    public PatientsController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost("register")] // Ruta: POST /api/patients/register
    public async Task<IActionResult> RegisterPatient(RegisterUserRequest request)
    {
        // Por ahora, un "Paciente" es un tipo de "Usuario".
        // La lógica para crear el usuario es la misma.
        var user = new User(
            Guid.NewGuid(),
            request.FirstName,
            request.LastName,
            request.Email
            ,Domain.Enums.Role.Patient); // Aseguramos que el rol sea "Patient"

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();

        return Ok(user.Id);
    }
}