using Microsoft.AspNetCore.Mvc;

namespace FrontEnd.Server.Controllers;

public record LoginRequest(string Email, string Password);
public record LoginResponse(bool Success, string? Token, string? Message);

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    [HttpPost("login")]
    public ActionResult<LoginResponse> Login([FromBody] LoginRequest req)
    {
        // Demo-only logic. Replace with your real user store.
        if (string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrWhiteSpace(req.Password))
            return BadRequest(new LoginResponse(false, null, "Email and Password are required."));

        // Fake user check
        if (req.Email.Equals("demo@site.com", StringComparison.OrdinalIgnoreCase) &&
            req.Password == "Pass@123")
        {
            // Return a pretend JWT
            var token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
            return Ok(new LoginResponse(true, token, null));
        }

        return Unauthorized(new LoginResponse(false, null, "Invalid email or password."));
    }
}
