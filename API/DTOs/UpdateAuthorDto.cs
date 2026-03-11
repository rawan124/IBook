 
 
 namespace API.DTOs;
public class UpdateAuthorDto{
 
    public required string FirstName {get; set;}

    
 public required string LastName { get; set; }
    public required string CountryOfOrigin { get; set; }
    public required DateTime DateOfBirth { get; set; }
    public DateTime? DateOfDeath { get; set; }
    public required string ProfilePicture { get; set; }



}