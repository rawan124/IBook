namespace API.DTOs;

public class UpdateBookDto
{
   
    //public int Id { get; set; }
    public string? Name { get; set; }
    public required string Title { get; set; }
     public required List<int> AuthorIds { get; set; }

    public List<CreateAuthorDto> NewAuthors { get; set; } = [];
    public required string Description { get; set; }

    public required string ImageUrl { get; set; }
    public required string Summary { get; set; }


}