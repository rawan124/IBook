using System.ComponentModel.DataAnnotations;
namespace API.DTos;
public class LoginRequestDto
{
[Required]
[EmailAddress]
public string Email { get; set; }="";
[Required]
//[DataType(DataType.Password)]
public string Password { get; set; }="";
[Display(Name = "Remember Me")]
public bool RememberMe { get; set; }

public string? RefreshToken { get; set; }
}