namespace API.DTOs;
using System.ComponentModel.DataAnnotations;
public class CreateReviewDto
{
    public string? Content { get; set; }
    [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5.")]
    public int Rating { get; set; }
}
