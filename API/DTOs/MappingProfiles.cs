using AutoMapper;
using Domain;

using API.DTos;
namespace API.DTOs;
public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<CreateBookDto, Book>();
        CreateMap<Book, CreateBookDto>();
        CreateMap<Book, BooksDto>();
        CreateMap<Book, AuthorBookDto>();
        CreateMap<Book, AssignBookdto>();
        CreateMap<AssignBookdto, Book>();
        CreateMap<UpdateBookDto, Book>();
        CreateMap<AuthorDto, Author>();
        CreateMap<CreateAuthorDto, Author>();
        CreateMap<Author, AuthorDto>();
        CreateMap<Review, ReviewDto>();
        CreateMap<CreateReviewDto, Review>();
        CreateMap<Notification,NotificationDto>();
            CreateMap<Review, ReviewDto>()
            .ForMember(
                dest => dest.UserName,
                opt => opt.MapFrom(src => src.User.UserName)
            );
       // CreateMap<User, UserSummaryDto>();
        CreateMap<Author, AuthorDto>()
    .ForMember(
        d => d.FullName,
        o => o.MapFrom(a => $"{a.FirstName} {a.LastName}")
    );

CreateMap<Author, AuthorDto>()
    .ForMember(
        d => d.FullName,
        o => o.MapFrom(a => $"{a.FirstName} {a.LastName}")
    );
CreateMap<UpdateAuthorDto, Author>();
    CreateMap<Book, BooksDto>()
    .ForMember(d => d.WishlistedCount,
        o => o.MapFrom(s => s.WishlistedByUsers.Count()))
    .ForMember(d => d.FavoritedCount,
        o => o.MapFrom(s => s.FavoritedByUsers.Count()));

    CreateMap<WishlistItem, WishlistDto>()
    .ForMember(dest => dest.Title,
        opt => opt.MapFrom(src => src.Book.Title))
    .ForMember(dest => dest.CoverImageUrl,
        opt => opt.MapFrom(src => src.Book.ImageUrl))
    .ForMember(dest => dest.Authors,
        opt => opt.MapFrom(src =>
            src.Book.Authors.Select(a => $"{a.FirstName} {a.LastName}")));





    }
}
