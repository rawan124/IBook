namespace API.Controllers;

using AutoMapper;
using System;
using Microsoft.EntityFrameworkCore;
using Domain;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using API.DTOs;
using Microsoft.AspNetCore.Identity;

[ApiController]
[Route("api/users")]
[Authorize(Roles = "User")]

public class UserController(AppDbContext dbContext, IMapper mapper, UserManager<User> userManager) : ControllerBase
{
    [HttpPost("addBook")]
 public async Task<ActionResult> AddBook(CreateBookDto bookDto)
    {
        var user = await userManager.GetUserAsync(User);

        if (user == null) return Unauthorized();

        var book = mapper.Map<Book>(bookDto);
        book.CreatedByUserId = user.Id;
        dbContext.Books.Add(book);
        await dbContext.SaveChangesAsync();
        return NoContent();
    }
}