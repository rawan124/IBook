import { Row, Col, Card, Typography, Button, Tag, Empty } from "antd";
import { useWishList } from "../lib/hooks/useWishList";
import { useWishListActions } from "../lib/hooks/useWishListActions";

const { Title, Text } = Typography;

const WishlistSection = () => {
  const { data: wishlist } = useWishList();
  const { RemoveFromWishlist, MarkAsRead } = useWishListActions();

  if (!wishlist?.length)
    return <Empty description="Your wishlist is empty" />;

  return (
    <Row gutter={[24, 24]}>
      {wishlist.map((book) => (
        <Col xs={24} sm={12} md={8} key={book.bookId}>
          <Card hoverable style={{ borderRadius: 16 }}>
            <Title level={5}>{book.title}</Title>
            <Text type="secondary">
              {book.authors.join(", ")}
            </Text>

            <div style={{ marginTop: 12 }}>
              <Tag color={book.isRead ? "green" : "blue"}>
                {book.isRead ? "Read" : "Unread"}
              </Tag>
            </div>

            <div style={{ marginTop: 16 }}>
              {!book.isRead && (
                <Button
                  onClick={() =>
                    MarkAsRead.mutate(book.bookId)
                  }
                >
                  Mark as Read
                </Button>
              )}
              <Button
                danger
                style={{ marginLeft: 8 }}
                onClick={() =>
                  RemoveFromWishlist.mutate(book.bookId)
                }
              >
                Remove
              </Button>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default WishlistSection;