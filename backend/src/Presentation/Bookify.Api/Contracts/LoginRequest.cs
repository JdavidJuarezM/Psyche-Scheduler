// path: backend/src/Presentation/Bookify.Api/Contracts/LoginRequest.cs
namespace Bookify.Api.Contracts;
public record LoginRequest(string Email, string Password);