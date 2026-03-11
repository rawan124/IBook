import { Card, Typography } from "antd";
import type { Books } from "../types/Books";
import { useNavigate } from "react-router";
import type { AuthorBook } from "../types/AuthorBookType";

type BookCardProps = {
    book: Books | AuthorBook;
}
export function BookCard({ book }: BookCardProps) {
  const navigate = useNavigate();

    return (
        <Card
        
  hoverable
  onClick={() => navigate(`/books/${book.id}`)}
  style={{
  
    borderRadius: 16,
    flexShrink: 0,
    height: "100%"
  }}
  cover={
    <img
      src={`http://localhost:5294${book.imageUrl}`}
      style={{
        width: "100%",
        height: 220,
        objectFit: "contain",
        borderRadius: "16px 16px 0 0"
      }}
    />
  }
  
>
  <Typography.Paragraph strong ellipsis={{ tooltip: book.title }}
  >
    {book.title}
  </Typography.Paragraph>

  <Typography.Paragraph
  ellipsis={{
    rows: 2,
    expandable: true,
 
  }}

>
    {book.summary}
  </Typography.Paragraph>
</Card>
    )}