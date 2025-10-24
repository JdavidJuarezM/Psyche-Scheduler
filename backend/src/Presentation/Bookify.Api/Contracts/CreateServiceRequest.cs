// path: backend/src/Presentation/Bookify.Api/Contracts/CreateServiceRequest.cs

namespace Bookify.Api.Contracts;

// DTO actualizado para reflejar la entidad Service
public record CreateServiceRequest(
    string Name,
    string Description,
    decimal Price);