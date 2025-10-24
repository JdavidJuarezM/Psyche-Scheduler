// path: backend/src/Core/Bookify.Domain/Entities/Booking.cs

namespace Bookify.Domain.Entities;

public class Booking
{
    public Guid Id { get; init; }
    public Guid ServiceId { get; private set; } // <-- CAMBIADO de RestaurantId
    public Guid UserId { get; private set; }
    public Guid ProfessionalId { get; private set; }
    public DateTime BookingDate { get; private set; }

    // Propiedades de navegación actualizadas
    public Service? Service { get; private set; } // <-- CAMBIADO de Restaurant
    public User? User { get; private set; }
    public Professional? Professional { get; private set; }

    public Booking(Guid id, Guid serviceId, Guid userId, Guid professionalId, DateTime bookingDate) // <-- CAMBIADO de restaurantId
    {
        Id = id;
        ServiceId = serviceId; // <-- CAMBIADO de RestaurantId
        UserId = userId;
        ProfessionalId = professionalId;
        BookingDate = bookingDate;
    }

    private Booking() { }
}