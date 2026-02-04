using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using API.DTOs;
using AutoMapper;
namespace API.Controllers;
    using System;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
[ApiController]
[Route("api/books")]
[Authorize(Roles ="SuperAdmin")]
public class BooksController(AppDbContext dbContext, IMapper mapper) : ControllerBase
{
    
    [HttpPost("createBook")]
    public async Task<IActionResult> CreateBook(CreateBookDto  bookDto)

    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        
        var book = mapper.Map<Book>(bookDto);
        book.CreatedByUserId = userId!;
        book.IsApproved=true;
        book.IsPublished=true;
        dbContext.Books.Add(book);
        await dbContext.SaveChangesAsync();

        return NoContent();
    }
    //[Authorize(Roles ="SuperAdmin")]
    [HttpPut("{bookId}")]
    public async Task<IActionResult> UpdateBook(int bookId, UpdateBookDto bookDto)

    {
        var book = await dbContext.Books.FindAsync(bookId);
        if (book == null) return NotFound();

        mapper.Map(bookDto, book);
        await dbContext.SaveChangesAsync();
        return NoContent();
    }
    //[Authorize(Roles ="SuperAdmin")]
    [HttpDelete("{bookId}")]
    public async Task<IActionResult> DeleteBook(int bookId)
    {
        var book = await dbContext.Books.FindAsync(bookId);
        if (book == null) return NotFound();

        dbContext.Books.Remove(book);
        await dbContext.SaveChangesAsync();
        return NoContent();
    }

    //[Authorize(Roles ="SuperAdmin")]
    [HttpGet]
    public async Task<ActionResult<List<BooksDto>>> GetBooks()
    {
        var books = await dbContext.Books
        .Where(b => b.IsApproved && b.IsPublished)
        .ToListAsync();
        var booksDto = mapper.Map<List<BooksDto>>(books);
        return booksDto;

        
    }
    [HttpGet("booksForApproval")]
    public async Task<ActionResult<List<BooksDto>>> GetBooksForApproval()
    {
        var books = await dbContext.Books
            .Where(b => !b.IsApproved)
            .ToListAsync();
        var booksDto = mapper.Map<List<BooksDto>>(books);
        return booksDto;
    }

    [Authorize(Roles = "SuperAdmin")]
[HttpGet("allBooks")]
public async Task<ActionResult<List<BooksDto>>> GetBooks(
    [FromQuery] string? status
)
{
    var query = dbContext.Books.AsQueryable();

    if (!string.IsNullOrEmpty(status))
    {
        switch (status)
        {
            case "PendingApproval":
                query = query.Where(b => !b.IsApproved);
                break;

            case "Draft":
                query = query.Where(b => b.IsApproved && !b.IsPublished);
                break;

            case "Published":
                query = query.Where(b => b.IsApproved && b.IsPublished);
                break;
        }
    }

    var books = await query.ToListAsync();
    return mapper.Map<List<BooksDto>>(books);
}
[AllowAnonymous]
[HttpGet("published")]
public async Task<ActionResult<List<BooksDto>>> GetPublishedBooks()
{
    var books = await dbContext.Books
        .Where(b => b.IsApproved && b.IsPublished)
        .ToListAsync();

    return mapper.Map<List<BooksDto>>(books);
}


    //[Authorize(Roles ="SuperAdmin")]
    [HttpPost("publish/{bookId}")]
    public async Task<ActionResult>PublishBook(int bookId)
    {
        var book=await dbContext.Books.FindAsync(bookId);

        if (book==null) return NotFound();

        book.IsPublished=true;
        await dbContext.SaveChangesAsync();
        return NoContent();
    }

        //[Authorize(Roles ="SuperAdmin")]
    [HttpPost("approve/{bookId}")]
    public async Task<ActionResult>Approve(int bookId)
    {
        var book=await dbContext.Books.FindAsync(bookId);

        if (book==null) return NotFound();

        book.IsApproved=true;
        await dbContext.SaveChangesAsync();
        return NoContent();
    }
}