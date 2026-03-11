using System;
using API.DTos;
using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
    [ApiController]
    [Route("api")]
public class AccountController(SignInManager<User> signInManager, UserManager<User> userManager): ControllerBase
{
    

    [Authorize]
    [HttpGet("currentUser")]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var user=await userManager.GetUserAsync(User);
        if (user==null) return Unauthorized();
        return new  UserDto
        {
            UserName=user.UserName!,
            IsActive = !user.LockoutEnd.HasValue || user.LockoutEnd < DateTimeOffset.UtcNow

        };
    }
[Authorize(Roles = "SuperAdmin")]
[HttpGet("users")]
public ActionResult<IEnumerable<UserDto>> GetAllUsers()
{
    var users = userManager.Users
        .Select(u => new UserDto
        {
            UserName = u.UserName!,
            IsActive = !u.LockoutEnd.HasValue || u.LockoutEnd < DateTimeOffset.UtcNow
        })
        .ToList();

    return users;
}
[Authorize]
[HttpPut("me/deactivate")]
public async Task<IActionResult> DeactivateUser()
{
    var user = await userManager.GetUserAsync(User);
    if (user == null) return NotFound();

    await userManager.SetLockoutEnabledAsync(user, true);
    await userManager.SetLockoutEndDateAsync(
        user,
        DateTimeOffset.MaxValue
    );

    return NoContent();
}
//[Authorize(Roles = "Admin")]
[HttpPut("users/{userId}/activate")]
public async Task<IActionResult> ActivateUser(string userId)
{
    var user = await userManager.FindByIdAsync(userId);
    if (user == null) return NotFound();

    await userManager.SetLockoutEndDateAsync(user, null);

    return NoContent();
}


   [AllowAnonymous]
   [HttpPost("register")]
   public async Task<ActionResult> RegisterUser(RegisterDto registerDto)
    {
        var user = new User
        {
            UserName=registerDto.UserName,
            Email=registerDto.Email
        };
        var result= await signInManager.UserManager.CreateAsync(user, registerDto.Password);

        if (result.Succeeded) {
        await signInManager.UserManager.AddToRoleAsync(user, "User");
        return Ok();
        }
        return BadRequest(result.Errors.Select(e => e.Description));
    }
    [Authorize(Roles = "User")]
    [HttpPut("manage/info")]
    public async Task<ActionResult> UpdateUserInfo(UpdateUserInfoDto updateDto)
    {
        var user=await userManager.GetUserAsync(User);
        

        if (user==null) return Unauthorized();

        if (!string.IsNullOrEmpty(updateDto.NewEmail))
        {
            
            var emailResult=await userManager.SetEmailAsync(user, updateDto.NewEmail);
            if (!emailResult.Succeeded) return BadRequest(emailResult.Errors);
            
        
        }
        if (!string.IsNullOrEmpty(updateDto.NewUserName))
        {
            var userNameResult=await userManager.SetUserNameAsync(user, updateDto.NewUserName);
            if (!userNameResult.Succeeded) return BadRequest(userNameResult.Errors);
            
        }
        if (!string.IsNullOrEmpty(updateDto.NewPassword))
        {
            if (string.IsNullOrEmpty(updateDto.OldPassword))
            {
                return BadRequest("Old password is required to set a new password.");
            }

            var passwordResult=await userManager.ChangePasswordAsync(user, updateDto.OldPassword, updateDto.NewPassword);
            if (!passwordResult.Succeeded) return BadRequest(passwordResult.Errors);
            
        }
        return NoContent();


    }
    [Authorize]
    [HttpDelete("delete")]
    public async Task<ActionResult> DeleteAccount()
    {
        var user=await userManager.GetUserAsync(User);
        if (user==null) return Unauthorized();
        var result=await userManager.DeleteAsync(user);
        if (result.Succeeded) return NoContent();
        return BadRequest(result.Errors);
    }
    [Authorize(Roles = "SuperAdmin, User")]
    [HttpPost("upload")]
public async Task<IActionResult> UploadImage(IFormFile image)
{
    if (image == null || image.Length == 0)
        return BadRequest("No image uploaded.");

    var uploadsFolder = Path.Combine(
        Directory.GetCurrentDirectory(),
        "wwwroot/images"
    );

    if (!Directory.Exists(uploadsFolder))
        Directory.CreateDirectory(uploadsFolder);

    var uniqueFileName =
        Guid.NewGuid().ToString() + "_" + image.FileName;

    var filePath = Path.Combine(uploadsFolder, uniqueFileName);

    using (var stream = new FileStream(filePath, FileMode.Create))
    {
        await image.CopyToAsync(stream);
    }

    var imageUrl = $"/images/{uniqueFileName}";

    return Ok(new { imageUrl });
}
   
}
