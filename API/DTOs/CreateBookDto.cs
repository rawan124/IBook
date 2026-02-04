namespace API.DTOs;
public class CreateBookDto
{
    public required string Title { get; set; }
    public required string Name { get; set; }
    public required string Author { get; set; }
    public required string Summary { get; set; }
    public required string Description { get; set; }
    public string Image { get; set; }="https://picsum.photos/200/300?2";
}
