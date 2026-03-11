namespace API.Controllers;
using AutoMapper;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Persistence;
using Microsoft.AspNetCore.Authorization;
using API.DTOs;
[ApiController]
[Route("api/favorites")]
[Authorize(Roles = "User, SuperAdmin")]

public class FavoriteBooksController(AppDbContext context, IMapper mapper) : ControllerBase
{
   [HttpPost("{bookId}")]
   public async Task<IActionResult> AddToFavorites(int bookId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Unauthorized();
        }

        var exists = await context.FavoriteBooks
            .AnyAsync(fb => fb.BookId == bookId && fb.UserId == userId);

        if (exists)
            return BadRequest("Book is already in your favorites.");

        var favoriteBook = new FavoriteBook
        {
            BookId = bookId,
            UserId = userId,
            CreatedAt = DateTime.UtcNow
        };

        context.FavoriteBooks.Add(favoriteBook);
        await context.SaveChangesAsync();

        return NoContent();
    
    }
    [HttpDelete("{bookId}")]
    public async Task<IActionResult> RemoveFromFavorites(int bookId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Unauthorized();
        }

        var favoriteBook = await context.FavoriteBooks
            .FirstOrDefaultAsync(fb => fb.BookId == bookId && fb.UserId == userId);

        if (favoriteBook == null)
            return NotFound("Book is not in your favorites.");

        context.FavoriteBooks.Remove(favoriteBook);
        await context.SaveChangesAsync();

        return NoContent();
    }
    [HttpGet]
    public async Task<ActionResult<List<BooksDto>>> GetFavoriteBooks()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Unauthorized();
        }

        var favoriteBooks = await context.FavoriteBooks
            .Include(fb => fb.Book)
                .ThenInclude(b => b.Authors)
            .Where(fb => fb.UserId == userId)
            .Select(fb => fb.Book)
            .ToListAsync();

        var favoriteBookDtos = mapper.Map<List<BooksDto>>(favoriteBooks);
        return Ok(favoriteBookDtos);
    }
}