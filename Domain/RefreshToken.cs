namespace Domain;
public class RefreshToken
{
    public int Id { get; set; }

    public required string Token { get; set; }
    public required string JwtId { get; set; }

    public required string UserId { get; set; }
    public required User User { get; set; }

    public DateTime ExpiryDate { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}
