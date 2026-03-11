using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;

public class ReviewConfiguration : IEntityTypeConfiguration<Review>
{
    public void Configure(EntityTypeBuilder<Review> builder)
{

    builder.ToTable("Reviews", table =>
    {
        
        table.HasCheckConstraint(
            "CK_Reviews_Rating_Range",
            "[Rating] >= 1 AND [Rating] <= 5"
        );
    });

    builder.HasKey(r => r.Id);

    builder
        .HasOne(r => r.User)
        .WithMany(u => u.Reviews)
        .HasForeignKey(r => r.UserId)
        .IsRequired();

    builder
        .HasOne(r => r.Book)
        .WithMany(b => b.Reviews)
        .HasForeignKey(r => r.BookId)
        .IsRequired();

    builder
        .HasIndex(r => new { r.UserId, r.BookId })
        .IsUnique();

    builder.Property(r => r.Content).IsRequired(false);
    builder.Property(r => r.Rating).IsRequired();
    builder.Property(r => r.CreatedAt).IsRequired();
}
}