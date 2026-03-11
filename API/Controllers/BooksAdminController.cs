using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using API.DTOs;
using AutoMapper;
namespace API.Controllers;
    using System;
using System.Globalization;
using System.Security.Claims;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
[ApiController]
[Route("api/books")]

public class BooksController(AppDbContext dbContext, IMapper mapper) : ControllerBase
{
    [Authorize(Roles ="User, SuperAdmin")]
    
    [HttpPost("createBook")]
    public async Task<IActionResult> CreateBook(CreateBookDto  bookDto)

    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        Console.WriteLine("ImageUrl" + bookDto.ImageUrl);
        var book = mapper.Map<Book>(bookDto);
        var isAdmin=User.IsInRole("SuperAdmin");
        book.CreatedByUserId = userId!;
        book.IsApproved=isAdmin;
        book.IsPublished=isAdmin;
        
    var authors = await dbContext.Authors
        .Where(a => bookDto.AuthorIds.Contains(a.Id))
        .ToListAsync();

    if (authors.Count != bookDto.AuthorIds.Count)
        return BadRequest("One or more authors not found.");
        var createdAuthors = new List<Author>();

    foreach (var newAuthorDto in bookDto.NewAuthors)
    {
        var newAuthor = mapper.Map<Author>(newAuthorDto);

        newAuthor.CreatedByUserId = userId!;
        newAuthor.IsActive = true;

        dbContext.Authors.Add(newAuthor);
        createdAuthors.Add(newAuthor);
    }

    
    book.Authors = authors
        .Concat(createdAuthors)
        .ToList();

    dbContext.Books.Add(book);

    await dbContext.SaveChangesAsync();



    

        return NoContent();
    }
    
    [Authorize(Roles ="User, SuperAdmin")]
    [HttpPut("{bookId}")]
    public async Task<IActionResult> UpdateBook(int bookId, UpdateBookDto bookDto)

    {
        var book = await dbContext.Books.FindAsync(bookId);
        if (book == null) return NotFound();

        mapper.Map(bookDto, book);
        await dbContext.SaveChangesAsync();
        return NoContent();
    }
    [Authorize(Roles ="SuperAdmin")]
    [HttpDelete("{bookId}")]
    public async Task<IActionResult> DeleteBook(int bookId)
    {
        var book = await dbContext.Books.FindAsync(bookId);
        if (book == null) return NotFound();

        dbContext.Books.Remove(book);
        await dbContext.SaveChangesAsync();
        return NoContent();
    }
    [AllowAnonymous]
    [HttpGet("{bookId}")]
    public async Task<ActionResult<BooksDto>> GetBookById(int bookId)
    {
        var book = await dbContext.Books
            .Include(b => b.Authors )
            .Include(b => b.Reviews)
            .Include(b => b.FavoritedByUsers)
             .Include(b => b.WishlistedByUsers)
            .ThenInclude(r => r.User)
            .FirstOrDefaultAsync(b => b.Id == bookId);

        if (book == null) return NotFound();

        var bookDto = mapper.Map<BooksDto>(book);
        return bookDto;
    }

    [Authorize(Roles ="User, SuperAdmin")]
    [HttpGet]
    public async Task<ActionResult<List<BooksDto>>> GetBooks()
    {
        var books = await dbContext.Books
        .Where(b => b.IsApproved && b.IsPublished)
        .Include(b => b.Authors)
        .Include(b => b.Reviews)
        .ToListAsync();
        var booksDto = mapper.Map<List<BooksDto>>(books);
        return booksDto;

        
    }
    [Authorize("SuperAdmin")]
    [HttpGet("booksForApproval")]
    public async Task<ActionResult<List<BooksDto>>> GetBooksForApproval()
    {
        var books = await dbContext.Books
            .Where(b => !b.IsApproved)
            .ToListAsync();
        var booksDto = mapper.Map<List<BooksDto>>(books);
        return booksDto;
    }

//[Authorize(Roles = "SuperAdmin, User")]
[HttpGet("allBooks")]
public async Task<ActionResult<List<BooksDto>>> GetBooks(
    [FromQuery] string? status, [FromQuery] string? search
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

      if (!string.IsNullOrWhiteSpace(search))
{
    search = search.Trim()  .Replace("%", "[%]")
                   .Replace("_", "[_]");;

    query = query.Where(b =>
        EF.Functions.Like(b.Title, $"%{search}%")
    );
}

    var booksDto = await query
    .AsNoTracking()
    .ProjectTo<BooksDto>(mapper.ConfigurationProvider)
    .ToListAsync();

    return booksDto;
    

}
[Authorize(Roles ="SuperAdmin")]
[HttpGet("published")]
public async Task<ActionResult<List<BooksDto>>> GetPublishedBooks()
{
    var books = await dbContext.Books
        .Where(b => b.IsApproved && b.IsPublished)
        .ToListAsync();

    return mapper.Map<List<BooksDto>>(books);
}


    //[Authorize(Roles ="SuperAdmin")]
    [Authorize(Roles ="SuperAdmin")]
    [HttpPost("publish/{bookId}")]
    public async Task<ActionResult>PublishBook(int bookId)
    {
        var book=await dbContext.Books.FindAsync(bookId);

        if (book==null) return NotFound();

        book.IsPublished=true;
        var notification = new Notification
        
{
    UserId = book.CreatedByUserId,
    Message = $"Your book '{book.Title}' has been approved and published!",
    IsRead = false,
    CreatedAt = DateTime.UtcNow
};

dbContext.Notifications.Add(notification);


        await dbContext.SaveChangesAsync();
        return NoContent();
    }

        [Authorize(Roles ="SuperAdmin")]
    [HttpPost("approve/{bookId}")]
    public async Task<ActionResult>Approve(int bookId)
    {
        var book=await dbContext.Books.FindAsync(bookId);

        if (book==null) return NotFound();

        book.IsApproved=true;
        await dbContext.SaveChangesAsync();
        return NoContent();
    }
    [Authorize(Roles ="SuperAdmin, User")]
    [HttpGet("user/myBooks")]
    public async Task<ActionResult> GetMyBooks()
    {
        var userId=User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Unauthorized();
        }
        var books=await dbContext.Books
        .Where(b=> b.CreatedByUserId==userId)
        .ToListAsync();

        var myBooks= mapper.Map<List<BooksDto>>(books);
       return Ok(myBooks);
    }

}