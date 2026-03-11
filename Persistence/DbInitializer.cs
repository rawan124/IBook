using System;
using System.Runtime.CompilerServices;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence;

public static class DbInitializer
{
    public static async Task SeedRoles(RoleManager<IdentityRole> roleManager)
    {
        string[] roles = ["SuperAdmin", "User"];

        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }
        }
    }

    public static async Task SeedUsers(UserManager<User> userManager)
    {
        if (userManager.Users.Any()) return;

        var user = new User
        {
            UserName = "rawanbazzi@hotmail.com",
            Email = "rawanbazzi@hotmail.com"
        };

        var result = await userManager.CreateAsync(user, "Pa$$w0rd");

        if (result.Succeeded)
        {
            await userManager.AddToRoleAsync(user, "SuperAdmin");
        }
        else
        {
            foreach (var error in result.Errors)
            {
                Console.WriteLine(error.Description);
            }
        }
    }
  public static async Task SeedAuthorsAndBooks(AppDbContext context)
{
    if (context.Books.Any() || context.Authors.Any())
        return;

   
    var creatorUserId = context.Users.Select(u => u.Id).First();

 

    var lina = new Author
    {
        FirstName = "Lina",
        LastName = "Harrow",
        CountryOfOrigin = "United Kingdom",
        DateOfBirth = new DateTime(1984, 6, 12),
        ProfilePicture = "https://picsum.photos/300/300?random=1",
        CreatedByUserId = creatorUserId
    };

    var jonathan = new Author
    {
        FirstName = "Jonathan",
        LastName = "Albrecht-Morrison",
        CountryOfOrigin = "Germany",
        DateOfBirth = new DateTime(1972, 11, 3),
        ProfilePicture = "https://picsum.photos/300/300?random=2",
        CreatedByUserId = creatorUserId
    };

    var noor = new Author
    {
        FirstName = "Noor",
        LastName = "Al-Khaled",
        CountryOfOrigin = "Jordan",
        DateOfBirth = new DateTime(1990, 2, 18),
        ProfilePicture = null,
        CreatedByUserId = creatorUserId
    };

    var ethan = new Author
    {
        FirstName = "Ethan",
        LastName = "Cole",
        CountryOfOrigin = "United States",
        DateOfBirth = new DateTime(1981, 9, 25),
        ProfilePicture = "https://picsum.photos/300/300?random=3",
        CreatedByUserId = creatorUserId
    };

    var margaret = new Author
    {
        FirstName = "Margaret",
        LastName = "Wills",
        CountryOfOrigin = "Ireland",
        DateOfBirth = new DateTime(1965, 4, 8),
        ProfilePicture = "https://picsum.photos/300/300?random=4",
        CreatedByUserId = creatorUserId
    };

   

    var books = new List<Book>
    {
        new Book
        {
            Name = "Silence Hours",
            Title = "The Silence Between Hours",
            Summary = "Two strangers cross paths during a quiet winter evening.",
            Description = "A quiet, introspective novel about two strangers whose lives intersect during a single winter evening, exploring memory, timing, and emotional restraint.",
            ImageUrl = "https://picsum.photos/200/300?random=11",
            IsApproved = true,
            IsPublished = true,
            CreatedByUserId = creatorUserId,
            Authors = { lina }
        },

        new Book
        {
            Name = "If Stayed",
            Title = "If We Stayed",
            Summary = "A reflection on choices left unmade.",
            Description = "A short story exploring the emotional weight of unmade decisions and the silence that follows them.",
            ImageUrl = "https://picsum.photos/200/300?random=12",
            IsApproved = true,
            IsPublished = true,
            CreatedByUserId = creatorUserId,
            Authors = { lina }
        },

        new Book
        {
            Name = "Architecture",
            Title = "The Architecture of Forgetting",
            Summary = "A meditation on memory and the cities we abandon.",
            Description = "A philosophical exploration of memory, architecture, and the stories societies choose to preserve or erase.",
            ImageUrl = "https://picsum.photos/200/300?random=13",
            IsApproved = true,
            IsPublished = true,
            CreatedByUserId = creatorUserId,
            Authors = { jonathan }
        },

        new Book
        {
            Name = "Borders",
            Title = "Between Two Borders",
            Summary = "A journey through displacement and identity.",
            Description = "A deeply personal novel about migration, memory, and the emotional cost of living between cultures.",
            ImageUrl = "https://picsum.photos/200/300?random=14",
            IsApproved = true,
            IsPublished = true,
            CreatedByUserId = creatorUserId,
            Authors = { noor }
        },

        new Book
        {
            Name = "Last Protocol",
            Title = "The Last Protocol",
            Summary = "A single flaw in an automated world.",
            Description = "In a society governed by algorithms, one engineer discovers a system failure that could dismantle everything.",
            ImageUrl = "https://picsum.photos/200/300?random=15",
            IsApproved = true,
            IsPublished = false,
            CreatedByUserId = creatorUserId,
            Authors = { ethan }
        },

        new Book
        {
            Name = "Orchard",
            Title = "The Orchard Beyond the River",
            Summary = "Ordinary lives during extraordinary times.",
            Description = "A wartime story told through the eyes of ordinary people caught in historical upheaval.",
            ImageUrl = "https://picsum.photos/200/300?random=16",
            IsApproved = true,
            IsPublished = true,
            CreatedByUserId = creatorUserId,
            Authors = { margaret }
        },

      
        new Book
        {
            Name = "Shared Memory",
            Title = "Shared Memory",
            Summary = "Five voices reflect on memory, loss, and belonging.",
            Description = "A collaborative literary work written by multiple authors, exploring how memory and identity intersect across cultures.",
            ImageUrl = "https://picsum.photos/200/300?random=17",
            IsApproved = true,
            IsPublished = false,
            CreatedByUserId = creatorUserId,
            Authors = { lina, jonathan, noor }
        }
    };

    context.Authors.AddRange(lina, jonathan, noor, ethan, margaret);
    context.Books.AddRange(books);

    await context.SaveChangesAsync();
}

        
}

    

