// path: backend/src/Core/Bookify.Domain/Entities/Professional.cs

namespace Bookify.Domain.Entities;

public class Professional
{
    public Guid Id { get; init; }
    public string Name { get; set; } = string.Empty;
    public string Specialty { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string AvatarUrl { get; set; } = string.Empty;
}