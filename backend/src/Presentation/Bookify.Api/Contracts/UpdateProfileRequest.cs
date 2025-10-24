// path: backend/src/Presentation/Bookify.Api/Contracts/UpdateProfileRequest.cs
namespace Bookify.Api.Contracts;

public record UpdateProfileRequest(
    string FirstName,
    string LastName,
    DateTime? DateOfBirth, 
    string? Gender,        
    string? PhoneNumber,
    string? EmergencyContactName,
    string? EmergencyContactPhone);