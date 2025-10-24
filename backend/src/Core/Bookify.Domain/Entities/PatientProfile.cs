// path: backend/src/Core/Bookify.Domain/Entities/PatientProfile.cs

namespace Bookify.Domain.Entities;

public class PatientProfile
{
    public Guid Id { get; init; }

    // Clave foránea para la relación uno a uno con User
    public Guid UserId { get; private set; }
    public User User { get; private set; } = null!; // Propiedad de navegación

    // Nuevos campos del perfil del paciente
    public DateTime? DateOfBirth { get; private set; }
    public string? Gender { get; private set; }
    public string? PhoneNumber { get; private set; }
    public string? EmergencyContactName { get; private set; }
    public string? EmergencyContactPhone { get; private set; }

    // Constructor para la creación
    public PatientProfile(Guid id, Guid userId)
    {
        Id = id;
        UserId = userId;
    }

    // Constructor privado para EF Core
    private PatientProfile() { }

    // Método para actualizar el perfil
    public void UpdateDetails(DateTime? dateOfBirth, string? gender, string? phoneNumber, string? emergencyContactName, string? emergencyContactPhone)
    {
        DateOfBirth = dateOfBirth;
        Gender = gender;
        PhoneNumber = phoneNumber;
        EmergencyContactName = emergencyContactName;
        EmergencyContactPhone = emergencyContactPhone;
    }
}