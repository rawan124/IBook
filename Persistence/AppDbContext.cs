using System;

namespace Persistence;

using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    public DbSet<Book> Books { get; set; }
    public DbSet<FavoriteBook> FavoriteBooks { get; set; }

      protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<FavoriteBook>()
            .HasKey(fb => new { fb.UserId, fb.BookId });
    }

    
}