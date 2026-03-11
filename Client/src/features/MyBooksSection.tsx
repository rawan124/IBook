import { Row, Col, Card, Typography, Tag, Empty } from "antd";
import { useMyBooks } from "../lib/hooks/useAdminBooks";

const { Title } = Typography;

const MyBooksSection = () => {
  const { data: books } = useMyBooks();

  if (!books?.length)
    return <Empty description="You haven't created any books yet" />;

  return (
    <Row gutter={[24, 24]}>
      {books.map((book) => (
        <Col xs={24} sm={12} md={8} key={book.id}>
          <Card hoverable style={{ borderRadius: 16 }}>
            <Title level={5}>{book.title}</Title>

            <div style={{ marginTop: 12 }}>
              <Tag color={book.isApproved ? "green" : "orange"}>
                {book.isApproved
                  ? "Approved"
                  : "Pending Approval"}
              </Tag>

              <Tag color={book.isPublished ? "blue" : "default"}>
                {book.isPublished
                  ? "Published"
                  : "Not Published"}
              </Tag>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
   
  );
};

export default MyBooksSection;