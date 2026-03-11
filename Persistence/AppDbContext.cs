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
    public DbSet<Author> Authors { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<Notification> Notifications {get; set;}
public DbSet<WishlistItem> WishlistItems { get; set; }
      protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<FavoriteBook>()
            .HasKey(fb => new { fb.UserId, fb.BookId });
        builder.Entity<WishlistItem>()
            .HasKey(wi => new { wi.UserId, wi.BookId });

           builder.ApplyConfigurationsFromAssembly(
        typeof(AppDbContext).Assembly
    );
        
    }

    
}