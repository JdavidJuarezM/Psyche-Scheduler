namespace Bookify.Domain.Entities;

public class Service // <-- Renombrado
{
    public Guid Id { get; init; }
    public string Name { get; private set; } = string.Empty; // Ej: "Terapia Individual"
    public string Description { get; private set; } = string.Empty; // Ej: "Sesión de 50 minutos..."
    public decimal Price { get; private set; } // Precio de la sesión

    // ... (Constructores actualizados)
    public Service(Guid id, string name, string description, decimal price)
    {
        Id = id;
        Name = name;
        Description = description;
        Price = price;
    }
    private Service() { }
}