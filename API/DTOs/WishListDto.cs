
namespace API.DTOs;
public class WishlistDto
{
    public int BookId { get; set; }

    public string Title { get; set; } = null!;
    public string? CoverImageUrl { get; set; }
    public List<string> Authors { get; set; } = [];


    public bool IsRead { get; set; }
    public DateTime AddedAt { get; set; }
}
