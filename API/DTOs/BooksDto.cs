namespace API.DTOs;

public class BooksDto
{
    public required int Id { get; set; }
    public required string Name { get; set; }
   
    public required string Title { get; set; }
    public required string Author { get; set; }
    public DateTime PublishedDate { get; set; }

    public required string Summary { get; set; }

    public bool IsApproved { get; set; }
    public bool IsPublished { get; set; }


}