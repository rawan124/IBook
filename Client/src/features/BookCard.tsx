import { Card, Typography } from "antd";
import type { Books } from "../types/Books";

type BookCardProps = {
    book: Books;
}
export function BookCard({ book }: BookCardProps) {


    return (
        <Card
  hoverable
  style={{
    width: 160,
    borderRadius: 16,
    flexShrink: 0
  }}
  cover={
    <img
      src={book.imageUrl}
      style={{
        height: 220,
        objectFit: "cover",
        borderRadius: "16px 16px 0 0"
      }}
    />
  }
>
  <Typography.Paragraph strong ellipsis>
    {book.title}
  </Typography.Paragraph>

  <Typography.Text
    type="secondary"
    style={{ fontSize: 12 }}
  >
    {book.author}
  </Typography.Text>
</Card>
    )}