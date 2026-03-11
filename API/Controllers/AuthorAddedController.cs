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
[Route("api/authors")]

public class AuthorAddedController(AppDbContext context, IMapper mapper): ControllerBase
{
        [Authorize(Roles = "User, SuperAdmin")]
    [HttpPost]
    public async Task<IActionResult> AddAuthor(CreateAuthorDto authorDto)
    {
    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
      var author= mapper.Map<Author>(authorDto);
      author.CreatedByUserId = userId!;
      context.Authors.Add(author);
        await context.SaveChangesAsync();
        return NoContent();
    }
    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetAuthors()
    {
        var authors = await context.Authors
            .
        ToListAsync();
        var authorsDto = mapper.Map<List<AuthorDto>>(authors);
        return Ok(authorsDto);
    }
    [AllowAnonymous]
    [HttpGet("{authorId}")]
    public async Task<IActionResult> GetAuthorById(int authorId)
    {
        var author = await context.Authors.FindAsync(authorId);
        if (author == null) return NotFound();
        var authorDto = mapper.Map<AuthorDto>(author);
        return Ok(authorDto);
    }
    [Authorize(Roles = "User, SuperAdmin")]
    [HttpPut("{authorId}")]
    public async Task<IActionResult> UpdateAuthor(int authorId, UpdateAuthorDto authorDto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var author = await context.Authors.FindAsync(authorId);
        if (author == null) return NotFound();
            if (author.CreatedByUserId != userId) return Forbid();
        
        mapper.Map(authorDto, author);
        await context.SaveChangesAsync();
        return NoContent();
    }
    [Authorize(Roles = "SuperAdmin")]
    [HttpDelete("{authorId}")]
    public async Task<IActionResult> DeleteAuthor(int authorId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var author = await context.Authors.FindAsync(authorId);
        if (author == null) return NotFound();
        if (author.CreatedByUserId != userId) return Forbid();
        context.Authors.Remove(author);
        await context.SaveChangesAsync();
        return NoContent();
    }
    [Authorize(Roles = "User, SuperAdmin")]
    [HttpPost("{authorId}/activate")]
    public async Task<IActionResult> ActivateAuthor(int authorId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var author = await context.Authors.FindAsync(authorId);
        if (author == null) return NotFound();
        if (author.CreatedByUserId != userId) return Forbid();
        author.IsActive = true;
        await context.SaveChangesAsync();
        return NoContent();
    }
    [Authorize(Roles = "User, SuperAdmin")]
    [HttpPost("{authorId}/deactivate")]
    public async Task<IActionResult> DeactivateAuthor(int authorId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var author = await context.Authors.FindAsync(authorId);
        if (author == null) return NotFound();
        if (author.CreatedByUserId != userId) return Forbid();
        author.IsActive = false;
        await context.SaveChangesAsync();
        return NoContent();
    }
    [AllowAnonymous]

    [HttpGet("{authorId}/books")]
public async Task<IActionResult> GetAuthorBooks(int authorId)
{
    var books = await context.Books
            .Where(b =>
            b.IsPublished &&
            b.Authors.Any(a => a.Id == authorId && a.IsActive))
        .ToListAsync();

    if (!books.Any())
        return NotFound();

    var booksDto = mapper.Map<List<AuthorBookDto>>(books);
    return Ok(booksDto);
}
[Authorize(Roles = "User, SuperAdmin")]

    [HttpPost("{authorId}/assignBook")]
    public async Task<IActionResult> AddBookToAuthor(int authorId, AssignExisitingBook dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var author = await context.Authors
        .Include(a => a.Books)
        .FirstOrDefaultAsync(a => a.Id == authorId);

        if (author == null) return NotFound();
        //if (author.CreatedByUserId != userId) return Forbid();

        var books = await context.Books
        .Where(b => dto.BooksIds.Contains(b.Id))
        .ToListAsync();

        foreach (var book in books)
        {
            if (!author.Books.Any(b => b.Id == book.Id))

            {
           
                book.Authors.Add(author);
            }
        }
        Console.WriteLine(context.ChangeTracker.DebugView.LongView);
        await context.SaveChangesAsync();
        return NoContent();
      
            
      
    }
    [Authorize(Roles = "User, SuperAdmin")]
    [HttpPost("{authorId}/createBook")]
public async Task<IActionResult> CreateBookForAuthor(int authorId, AssignBookdto dto)
{
    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    if (userId == null) return Unauthorized();

    var author = await context.Authors
        .FirstOrDefaultAsync(a => a.Id == authorId);

    if (author == null) return NotFound();

    var book = mapper.Map<Book>(dto);

    book.CreatedByUserId = userId;

    var isAdmin = User.IsInRole("Admin");

    book.IsApproved = isAdmin;
    book.IsPublished = isAdmin;
    
    book.Authors.Add(author);

    context.Books.Add(book);
    await context.SaveChangesAsync();

    return Ok();
}

}