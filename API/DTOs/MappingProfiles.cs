using AutoMapper;
using Domain;
using API.DTOs;
namespace API.DTOs;
public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<CreateBookDto, Book>();
        CreateMap<Book, BooksDto>();
        CreateMap<UpdateBookDto, Book>();
    }
}
