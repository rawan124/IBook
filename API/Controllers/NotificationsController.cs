
using Domain;

using Microsoft.AspNetCore.Mvc;
using Persistence;

using AutoMapper;
namespace API.Controllers;
using Persistance;
using System.Security.Claims;
using API.DTos;

using Microsoft.EntityFrameworkCore;
[ApiController]
[Route("api/user/notifications")]

public class NotificationsController(AppDbContext dbContext, IMapper mapper) : ControllerBase
{

[HttpGet]
public async Task<IActionResult> GetUserNotifications()
{
    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    var notifications = await dbContext.Notifications
        .Where(n => n.UserId == userId)
        .OrderByDescending(n => n.CreatedAt)
        .ToListAsync();
    var notifDto= mapper.Map<List<NotificationDto>>(notifications);
    return Ok(notifDto);
}
[HttpPut("markAsRead/{id}")]
public async Task<IActionResult> MarkAsRead(int id)
{
    var notification = await dbContext.Notifications.FindAsync(id);

    if (notification == null) return NotFound();

    notification.IsRead = true;

    await dbContext.SaveChangesAsync();

    return NoContent();
}
}