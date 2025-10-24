// path: backend/src/Presentation/Bookify.Api/Controllers/UsersController.cs

using Bookify.Api.Contracts;
using Bookify.Domain.Entities;
using Bookify.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Bookify.Api.Controllers;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IConfiguration _configuration;

    public UsersController(ApplicationDbContext dbContext, IConfiguration configuration)
    {
        _dbContext = dbContext;
        _configuration = configuration;
    }

    [HttpPost("register-psychologist")]
    public async Task<IActionResult> Register(RegisterUserRequest request)
    {
        var user = new User(
            Guid.NewGuid(),
            request.FirstName,
            request.LastName,
            request.Email,
            Domain.Enums.Role.Psychologist);

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();
        return Ok(user.Id);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

        if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            return Unauthorized();
        }

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            Issuer = _configuration["Jwt:Issuer"],
            Audience = _configuration["Jwt:Audience"],
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);

        return Ok(new { Token = tokenString });
    }

    [HttpGet("profile")]
    [Authorize]
    public async Task<IActionResult> GetProfile()
    {
        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
        {
            return Unauthorized();
        }

        // Usamos Include para traer el perfil del paciente en la misma consulta
        var user = await _dbContext.Users
            .Include(u => u.PatientProfile)
            .FirstOrDefaultAsync(u => u.Id == userId);
            
        if (user is null) return NotFound();
        
        // vvv LÓGICA AÑADIDA PARA CALCULAR EL PROGRESO vvv
        int totalFields = 3; // Total de campos opcionales (Fecha Nacimiento, Género, Teléfono)
        int completedFields = 0;
        if (user.PatientProfile != null)
        {
            if (user.PatientProfile.DateOfBirth.HasValue) completedFields++;
            if (!string.IsNullOrEmpty(user.PatientProfile.Gender)) completedFields++;
            if (!string.IsNullOrEmpty(user.PatientProfile.PhoneNumber)) completedFields++;
        }
    
        double completionPercentage = totalFields > 0 ? ((double)completedFields / totalFields) * 100 : 100;
        // ^^^ FIN DE LA LÓGICA AÑADIDA ^^^

        var userProfile = new
        {
            user.Id,
            user.FirstName,
            user.LastName,
            user.Email,
            Role = user.Role.ToString(),
            user.PatientProfile?.DateOfBirth,
            user.PatientProfile?.Gender,
            user.PatientProfile?.PhoneNumber,
            user.PatientProfile?.EmergencyContactName,
            user.PatientProfile?.EmergencyContactPhone,
            ProfileCompletionPercentage = (int)completionPercentage // <-- Devolvemos el porcentaje a la API
        };

        return Ok(userProfile);
    }

    [HttpPut("profile")]
    [Authorize]
    public async Task<IActionResult> UpdateProfile(UpdateProfileRequest request)
    {
        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
        {
            return Unauthorized();
        }

        var user = await _dbContext.Users.FindAsync(userId);
        if (user is null) return NotFound();

        user.UpdateName(request.FirstName, request.LastName);

        var patientProfile = await _dbContext.PatientProfiles.FirstOrDefaultAsync(p => p.UserId == userId);
        if (patientProfile is null)
        {
            patientProfile = new PatientProfile(Guid.NewGuid(), userId);
            _dbContext.PatientProfiles.Add(patientProfile);
        }

        patientProfile.UpdateDetails(
            request.DateOfBirth,
            request.Gender,
            request.PhoneNumber,
            request.EmergencyContactName,
            request.EmergencyContactPhone
        );

        await _dbContext.SaveChangesAsync();

        return Ok();
    }
}