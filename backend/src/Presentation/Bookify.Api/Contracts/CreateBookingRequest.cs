// path: backend/src/Presentation/Bookify.Api/Contracts/CreateBookingRequest.cs
namespace Bookify.Api.Contracts;

public record CreateBookingRequest(
    Guid ServiceId,
    Guid ProfessionalId, // <-- AÑADE ESTA LÍNEA
    DateTime BookingDate);