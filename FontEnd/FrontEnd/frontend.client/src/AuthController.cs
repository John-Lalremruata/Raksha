using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        // Fake validation (replace with DB check later)
        if (request.Email == "test@example.com" && request.Password == "1234")
        {
            return Ok(new { token = "fake-jwt-token-12345" });
        }

        return Unauthorized("Invalid credentials");
    }
}

public class LoginRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
}
