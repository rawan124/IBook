namespace API.DTOs;

using System.ComponentModel.DataAnnotations;
using API.DTOs;
using Domain;
public class ReviewDto
{
    public int Id { get; set; }
    //public int BookId { get; set; }
    //public string UserId { get; set; } = null!;
    public string UserName { get; set; }= null!;
    public string? Content { get; set; } 
    [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5.")]
    public int Rating { get; set; }
    public DateTime CreatedAt { get; set; }
}