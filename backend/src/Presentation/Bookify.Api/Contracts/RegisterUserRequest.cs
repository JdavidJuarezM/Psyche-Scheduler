// path: backend/src/Presentation/Bookify.Api/Contracts/RegisterUserRequest.cs
public record RegisterUserRequest(
    string FirstName,
    string LastName,
    string Email,
    string Password); 