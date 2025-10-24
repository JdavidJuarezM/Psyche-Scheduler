// path: backend/src/Presentation/Bookify.Api/Controllers/ServicesController.cs

using Bookify.Api.Contracts;
using Bookify.Domain.Entities;
using Bookify.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bookify.Api.Controllers;

[ApiController]
[Route("api/services")]
public class ServicesController : ControllerBase // <-- Verifica Herencia
{
    private readonly ApplicationDbContext _dbContext;

    public ServicesController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetServices()
    {
        var services = await _dbContext.Services.ToListAsync();
        return Ok(services);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetServiceById(Guid id)
    {
        var service = await _dbContext.Services.FindAsync(id);
        if (service is null)
        {
            return NotFound();
        }
        return Ok(service);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateService(CreateServiceRequest request)
    {
        var service = new Service(
            Guid.NewGuid(),
            request.Name,
            request.Description,
            request.Price);

        _dbContext.Services.Add(service);
        await _dbContext.SaveChangesAsync();
        return Ok(service.Id);
    }
}