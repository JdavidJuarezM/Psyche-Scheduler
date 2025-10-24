// path: backend/src/Core/Bookify.Domain/Entities/User.cs

namespace Bookify.Domain.Entities;
using Bookify.Domain.Enums;

public class User
{
    // El constructor privado es para que EF Core lo use.
    private User() { }

    // Este es el constructor que nosotros usaremos para crear un usuario nuevo.
    public User(Guid id, string firstName, string lastName, string email, Role role)
    {
        Id = id;
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        Role = role;
    }

    public Guid Id { get; init; }

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string Email { get; private set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;
    public Role Role { get; private set; }

    // vvv AÑADE ESTE MÉTODO vvv
    public void UpdateName(string firstName, string lastName)
    {
        FirstName = firstName;
        LastName = lastName;
    }
    // ^^^ FIN DEL MÉTODO AÑADIDO ^^^
    public PatientProfile? PatientProfile { get; private set; }
}