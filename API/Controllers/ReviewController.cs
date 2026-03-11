namespace API.Controllers;

using API.DTOs;
using AutoMapper;
using Domain;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using API.DTos;
[ApiController]
[Route("api/reviews")]

public class ReviewController(AppDbContext context, IMapper mapper) : ControllerBase
{
    [HttpGet("{bookId}")]
    public async Task<IActionResult> GetReviewsForBook(int bookId)
    {
        var reviews = await context.Reviews
         .Where(r => r.BookId == bookId)
         .Include(r => r.User)
         .ToListAsync();
        var reviewsDto = mapper.Map<List<ReviewDto>>(reviews);
        return Ok(reviewsDto);
    }
    [HttpGet("byid/{reviewId}")]
    public async Task<IActionResult> GetReviewById(int reviewId)
    {
        var review = await context.Reviews
            .Include(r => r.User)
            .FirstOrDefaultAsync(r => r.Id == reviewId);

        if (review == null)
            return NotFound();

        var reviewDto = mapper.Map<ReviewDto>(review);
        return Ok(reviewDto);
    }
    [Authorize(Roles = "User")]

    [HttpPost("{bookId}")]
    public async Task<IActionResult> AddReview(int bookId, CreateReviewDto reviewDto)
    {

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Unauthorized();
        }
        var exists = await context.Reviews
     .AnyAsync(r => r.BookId == bookId && r.UserId == userId);

        if (exists)
            return BadRequest("You already reviewed this book.");

        var review = mapper.Map<Review>(reviewDto);
        review.BookId = bookId;
        review.UserId = userId!;
        review.CreatedAt = DateTime.UtcNow;
        context.Reviews.Add(review);
        await context.SaveChangesAsync();
        return NoContent();

    }
    [Authorize(Roles = "User")]
    [HttpDelete("{reviewId}")]
    public async Task<IActionResult> DeleteReview(int reviewId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Unauthorized();
        }

        var review = await context.Reviews.FindAsync(reviewId);

        if (review == null)
        {
            return NotFound();
        }

        if (review.UserId != userId)
        {
            return Forbid();
        }

        context.Reviews.Remove(review);
        await context.SaveChangesAsync();

        return NoContent();
    }

    [Authorize(Roles = "User")]
    [HttpPut("{reviewId}")]
    public async Task<IActionResult> UpdateReview(int reviewId, CreateReviewDto reviewDto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
        {
            return Unauthorized();
        }
        var review = await context.Reviews.FindAsync(reviewId);
        if (review == null)
        {
            return NotFound();
        }
        if (review.UserId != userId)
        {
            return Forbid();
        }
        mapper.Map(reviewDto, review);
        await context.SaveChangesAsync();
        return NoContent();

    }
}