namespace Domain;

public class Book
{ 
    public int Id { get; set; }
    public  string? Name { get; set; }
    public required string Title { get; set; }
   // public required string Author { get; set; }
    public required string Description { get; set; }

    public required string ImageUrl { get; set; }
    public required string Summary { get; set; }

    public bool IsApproved { get; set; } = false;
    public bool IsPublished { get; set; } = false;

    public ICollection<FavoriteBook> FavoritedByUsers { get; set; } = [];

    public ICollection<Review> Reviews { get; set; } = [];

    public string CreatedByUserId { get; set; } = null!;
    public User CreatedByUser { get; set; } = null!;
    public ICollection<Author> Authors { get; set; } = [];

    public ICollection<WishlistItem> WishlistedByUsers { get; set; } = [];
}