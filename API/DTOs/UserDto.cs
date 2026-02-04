using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class UserDto
{
    [Required]
    public string UserName { get; set; } ="";

    public bool IsActive { get; set; }
    
}