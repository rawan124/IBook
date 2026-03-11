import { Row, Col, Card, Typography, Button, Empty, Divider } from "antd";
import { useFavoriteBooks } from "../lib/hooks/useFavoriteBooks";
import {useFavoriteActions}  from "../lib/hooks/useFavoriteActions";

const { Title, Text } = Typography;

const FavoritesSection = () => {
  const { data: favorites } = useFavoriteBooks();
  const {  RemoveFromFavorites } = useFavoriteActions();

  if (!favorites?.length)
    return <Empty description="No favorite books yet" />;

  return (
    <Row gutter={[24, 24]}>
      {favorites.map((book) => (
        <Col xs={24} sm={12} md={8} key={book.id}>
          <Card hoverable style={{ borderRadius: 16 }}>
            <Title style={{color:" #2563EB", fontFamily: "Inter"}} level={5}>{book.title}</Title>
            
            <Text style={{color:" #2563EB", fontFamily: "Inter"}} type="secondary">
              {book.authors.map(a => `${a.fullName}`).join(", ")}
            </Text>
        <Divider/>
            <Button
              danger
              style={{ marginTop: 16 }}
              onClick={() => RemoveFromFavorites.mutate(book.id)}
            >
              Remove from Favorites
            </Button>
            
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default FavoritesSection;