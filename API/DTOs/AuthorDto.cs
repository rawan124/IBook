 
 
 namespace API.DTOs;
public class AuthorDto{
    public int Id { get; set; }
 public required string FullName { get; set; }
    public required string FirstName {get; set;}

    
 public required string LastName { get; set; }
    public required string CountryOfOrigin { get; set; }
    public required DateTime DateOfBirth { get; set; }
    public DateTime? DateOfDeath { get; set; }
    public required string ProfilePicture { get; set; }

    public required string CreatedByUserId { get; set; }

    public bool IsActive { get; set; }

}