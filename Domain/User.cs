using System;
using Microsoft.AspNetCore.Identity;
namespace Domain;

public class User: IdentityUser
{

    public string? Nickname { get; set; }

    public ICollection<FavoriteBook> FavoriteBooks { get; set; } = [];

    // Optional Property: To access books added by the user
    public ICollection<Book> AddedBooks { get; set; } = [];

}