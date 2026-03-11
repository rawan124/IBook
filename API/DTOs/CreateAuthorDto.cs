 
 
 namespace API.DTOs;
public class CreateAuthorDto{
 public required string FirstName { get; set; }
 public required string LastName { get; set; }
    
    public required string CountryOfOrigin { get; set; }
    public required DateTime DateOfBirth { get; set; }
    public DateTime? DateOfDeath { get; set; }
    public required string ProfilePicture { get; set; }

    public string CreatedByUserId { get; set; }="";

  

}