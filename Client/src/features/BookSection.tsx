import { Typography } from "antd";
import { BookCard } from "./BookCard";
import type { Books } from "../types/Books";
type BookSectionProps = {
    title: string;
    books: Books[];
}

export function BookSection({ title, books }: BookSectionProps) {
  return (
    <>
      <Typography.Title level={4}>
        {title}
      </Typography.Title>

      <div style={{
        display: "flex",
        gap: 16,
        overflowX: "auto",
        paddingBottom: 8
      }}>
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </>
  );
}
