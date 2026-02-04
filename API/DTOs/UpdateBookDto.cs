namespace API.DTOs;

public class UpdateBookDto
{
   
    //public int Id { get; set; }
    public required string Name { get; set; }
    public required string Title { get; set; }
    public required string Author { get; set; }
    public required string Description { get; set; }

    public required string Image { get; set; }
    public required string Summary { get; set; }


}