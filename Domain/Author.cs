namespace Domain;
public class Author
{
    public int Id { get; set; }
  
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    
    public required string CountryOfOrigin { get; set; }
    public required DateTime DateOfBirth { get; set; }
    public DateTime? DateOfDeath { get; set; }
    public  string? ProfilePicture { get; set; }

    public required string CreatedByUserId { get; set; }

    public bool IsActive { get; set; } = true;

    public ICollection<Book> Books { get; set; } = [];
}