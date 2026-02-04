using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using API.DTos;
using Application.Auth;
using Application.Interfaces;
using API.DTOs;
namespace API.Controllers;
[ApiController]
[Route("/api/auth")]
public class AuthController(   UserManager<User> userManager,
        RoleManager<IdentityRole> roleManager,
        AppDbContext dbContext,
        IOptions<AuthOptions> authOptions,
        IEmailSender emailSender,
        SignInManager<User> signin) : ControllerBase
{



  

  
    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(LoginRequestDto request)
    {
        var user = await userManager.FindByEmailAsync(request.Email);
        if (user == null)
            return Unauthorized("Invalid credentials");

        var passwordValid =
            await signin.CheckPasswordSignInAsync(user, request.Password, false);
        if (passwordValid.IsLockedOut)
            return Unauthorized("User account is locked");
        if (!passwordValid.Succeeded)
            return Unauthorized("Invalid credentials");

        

        var (token, refreshToken) =
            await GenerateJwtAndRefreshTokenAsync(user, request.RefreshToken);

        return Ok(new
        {
            accessToken = token,
            refreshToken
        });
    }

    [HttpPost("refresh")]
    [AllowAnonymous]
    public async Task<IActionResult> Refresh(RefreshTokenRequestDto request)
    {
        var storedToken = await dbContext.RefreshTokens
            .FirstOrDefaultAsync(x =>
                x.Token == request.RefreshToken &&
                x.ExpiryDate > DateTime.UtcNow);

        if (storedToken == null)
            return Unauthorized("Invalid refresh token");

        var user = await userManager.FindByIdAsync(storedToken.UserId);
        if (user == null)
            return Unauthorized();

        var (token, refreshToken) =
            await GenerateJwtAndRefreshTokenAsync(user, request.RefreshToken);

        return Ok(new
        {
            accessToken = token,
            refreshToken
        });
    }


    private async Task<(string token, string refreshToken)>
        GenerateJwtAndRefreshTokenAsync(User user, string? existingRefreshToken)
    {
        var roles = await userManager.GetRolesAsync(user);
        var userRole = roles.FirstOrDefault() ?? "user";

        var role = await roleManager.FindByNameAsync(userRole);
        var roleClaims = role != null
            ? await roleManager.GetClaimsAsync(role)
            : [];

        var token = await GenerateJwtToken(user, authOptions.Value, userRole, roleClaims);

        var refreshToken = await GenerateRefreshTokenAsync(
            token,
            user,
            existingRefreshToken);

        return (token, refreshToken);
    }

    private async Task<string> GenerateRefreshTokenAsync(
        string token,
        User user,
        string? existingRefreshToken)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var jwtToken = tokenHandler.ReadJwtToken(token);
        var jti = jwtToken.Id;

        var refreshToken = new RefreshToken
        {
            Token = Guid.NewGuid().ToString(),
            JwtId = jti,
            UserId = user.Id,
            User= user,
            ExpiryDate = DateTime.UtcNow.AddDays(7),
            CreatedAtUtc = DateTime.UtcNow
        };

        if (!string.IsNullOrEmpty(existingRefreshToken))
        {
            var oldToken = await dbContext.RefreshTokens
                .FirstOrDefaultAsync(x => x.Token == existingRefreshToken);

            if (oldToken != null)
                dbContext.RefreshTokens.Remove(oldToken);
        }

        await dbContext.RefreshTokens.AddAsync(refreshToken);
        await dbContext.SaveChangesAsync();

        return refreshToken.Token;
    }

    private async Task<string> GenerateJwtToken(
        User user,
        AuthOptions options,
        string role,
        IEnumerable<Claim> roleClaims)
    {
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id),
            new(JwtRegisteredClaimNames.Email, user.Email!),
            //new(ClaimTypes.Role, role),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };
        var roles = await userManager.GetRolesAsync(user);
    claims.AddRange(
        roles.Select(role => new Claim(ClaimTypes.Role, role))
    );
        

        claims.AddRange(roleClaims);
        if (string.IsNullOrWhiteSpace(options.Key))
{
    throw new Exception("JWT Key is missing or empty. Check AuthOptions binding.");
}

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(options.Key));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: options.Issuer,
            audience: options.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(30),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
    [HttpPost("forgot-password")]
public async Task<IActionResult> ForgotPassword(
    ForgotPasswordDto dto)
{
    var user = await userManager.FindByEmailAsync(dto.Email);

 
    if (user == null)
        return Unauthorized();

    var resetToken =
        await userManager.GeneratePasswordResetTokenAsync(user);

    await emailSender.SendEmailAsync(
        user.Email!,
        "Reset your password",
        $"Your reset code is:\n\n{resetToken}"
    );

    return Ok();
}
[HttpPost("reset-password")]
public async Task<IActionResult> ResetPassword(ResetPasswordDto dto)
{
    var user = await userManager.FindByEmailAsync(dto.Email);

    if (user == null)
        return BadRequest("Invalid request");

    var result = await userManager.ResetPasswordAsync(
        user,
        dto.Token,
        dto.NewPassword
    );

    if (!result.Succeeded)
        return BadRequest(result.Errors);

    return Ok("Password reset successfully");
}


}
