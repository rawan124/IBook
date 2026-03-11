using System.ComponentModel.DataAnnotations;

namespace API.DTOs;
public class CreateBookDto
{
    public required string Title { get; set; }
    public string? Name { get; set; }
    public required List<int> AuthorIds { get; set; }

    public List<CreateAuthorDto> NewAuthors { get; set; } = [];
        [Required(ErrorMessage = "Summary is required")]
    [MaxLength(200, ErrorMessage = "Summary cannot exceed 200 characters")]
    public required string Summary { get; set; }
    [Required(ErrorMessage = "Description is required")]
    [MaxLength(500, ErrorMessage = "Description cannot exceed 500 characters")]
    public required string Description { get; set; }
    public required string ImageUrl {get; set; }
}
