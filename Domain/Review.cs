namespace Domain;

public class Review
{
    public int Id { get; set; }
    public int BookId { get; set; }
    public Book Book { get; set; } = null!;
    public required string UserId { get; set; }
    public User User { get; set; } = null!;
    public string? Content { get; set; } 
    public int Rating { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}