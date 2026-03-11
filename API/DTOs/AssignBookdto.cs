namespace API.DTOs;
public class AssignBookdto
{
    public required string Title { get; set; }
    public string? Name { get; set; }
    
    public required string Summary { get; set; }
    public required string Description { get; set; }
    public required string ImageUrl { get; set; }
}
