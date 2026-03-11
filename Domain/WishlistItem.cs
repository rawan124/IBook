namespace Domain;
public class WishlistItem
{
    public required string UserId { get; set; }
    public User User { get; set; }= null!;

    public int BookId { get; set; }
    public Book Book { get; set; }= null!;

    public bool IsRead { get; set; } = false;

    public DateTime AddedAt { get; set; } = DateTime.UtcNow;
}
