namespace Domain;
public class Notification
{
    public int Id { get; set; }

    public string UserId { get; set; }=null!;  
    public User User { get; set; } =null!;  

    public required string Message { get; set; }

    public bool IsRead { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}