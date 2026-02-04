namespace Domain;   
public class FavoriteBook
{
    public string UserId { get; set; } = null!;
    public User User { get; set; } = null!;

    public int BookId { get; set; }
    public Book Book { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
