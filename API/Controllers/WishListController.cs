using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using API.DTOs;
using AutoMapper;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
namespace API.Controllers;
[ApiController]
[Route("api/wishlist")]
[Authorize(Roles = "User")]
public class WishListController(AppDbContext context, IMapper mapper) : ControllerBase
{
    [Authorize(Roles = "User")]
    [HttpPost("{bookId}")]
    public async Task<IActionResult> AddToWishlist(int bookId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Unauthorized();
        }
    

        var exists = await context.WishlistItems
            .AnyAsync(wi => wi.BookId == bookId && wi.UserId == userId);

        if (exists)
            return BadRequest("Book is already in your wishlist.");

        var wishlistItem = new WishlistItem
        {
            BookId = bookId,
            UserId = userId,
                IsRead = false,
                AddedAt = DateTime.UtcNow
        };
        

        context.WishlistItems.Add(wishlistItem);
        await context.SaveChangesAsync();

        return NoContent();
    }
    [HttpGet]
    public async Task<ActionResult<List<WishlistDto>>> GetWishlist()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Unauthorized();
        }

        var wishlistItems= await context.WishlistItems
            .Include(wi => wi.Book)
                .ThenInclude(b => b.Authors)
            .Where(wi => wi.UserId == userId)
            .ToListAsync();
    
     var wishlistDtos = mapper.Map<List<WishlistDto>>(wishlistItems);
        return Ok(wishlistDtos);
    }
    [HttpDelete("{bookId}")]
    public async Task<IActionResult> RemoveFromWishlist(int bookId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);


        var wishlistItem = await context.WishlistItems
            .FirstOrDefaultAsync(wi => wi.BookId == bookId && wi.UserId == userId);

        if (wishlistItem == null)
            return NotFound("Book not found in your wishlist.");

        context.WishlistItems.Remove(wishlistItem);
        await context.SaveChangesAsync();

        return NoContent();
    }
    [HttpPatch("{bookId}/markAsRead")]
    public async Task<IActionResult> MarkAsRead(int bookId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Unauthorized();
        }

       var wishlistItem = await context.WishlistItems
            .FirstOrDefaultAsync(wi => wi.BookId == bookId && wi.UserId == userId);

        if (wishlistItem == null)
            return NotFound("Book not found in your wishlist.");

        wishlistItem.IsRead = true;
        await context.SaveChangesAsync();

        return NoContent();
    }
}