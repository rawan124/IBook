namespace API.DTOs;

public class AuthorBookDto
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string? ImageUrl { get; set; }
    public DateTime PublishedDate { get; set; }
    public string Summary { get; set; } = null!;
}
