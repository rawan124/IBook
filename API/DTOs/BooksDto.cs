using Domain;

namespace API.DTOs;

public class BooksDto
{
    public required int Id { get; set; }
    public string? Name { get; set; }
    public required string Description { get; set; }
    public required string ImageUrl { get; set; }
    public required string Title { get; set; }
   //public required string Author { get; set; }
    public List<AuthorDto> Authors { get; set; } = [];

    public List<ReviewDto> Reviews { get; set; } = [];
    public DateTime PublishedDate { get; set; }

    public required string Summary { get; set; }

    public bool IsApproved { get; set; }
    public bool IsPublished { get; set; }

    public int FavoritedCount { get; set; }
    public int WishlistedCount { get; set; }

    public required string CreatedByUserId { get; set; }


}