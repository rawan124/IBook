import { Row, Col, Typography, Spin, Flex, Button, Empty } from "antd";
import { BookCard } from "./BookCard";
import { useAdminBooks } from "../lib/hooks/useAdminBooks";
import { useNavigate } from "react-router";
import { PlusOutlined } from "@ant-design/icons";
import { useAuth } from "../lib/hooks/useAuth";
import { useState } from "react";
import SearchBar from "../app/components/SearchBar";
const { Title } = Typography;

export default function BookSection() {
  
  const [search, setSearch] = useState('');
  const { data: books, isLoading } = useAdminBooks('Published', search);
  const navigate = useNavigate();
  const {user} = useAuth();

  if (isLoading) {
    return <Spin />;
  }

  return (
  <div style={{ padding: "64px 24px", maxWidth: 1200, margin: "0 auto" }}>
    
    
    <Flex
      justify="space-between"
      align="center"
      wrap="wrap"
      gap={16}
      style={{ marginBottom: 32 }}
    >
      <Title level={2} style={{ margin: 0 }}>
        Browse Books
      </Title>

      <SearchBar onSearch={setSearch} />

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() =>
          user ? navigate("/create-book") : navigate("/login")
        }
      >
        Add New Book
      </Button>
    </Flex>

    {isLoading ? (
      <Flex justify="center" style={{ marginTop: 80 }}>
        <Spin size="large" />
      </Flex>
    ) : books?.length === 0 ? (
      <Empty
        description="No books found"
        style={{ marginTop: 80 }}
      />
    ) : (
      <Row gutter={[24, 24]}>
        {books?.map((book) => (
          <Col xs={24} sm={12} md={8} lg={6} key={book.id}>
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
    )}
  </div>

);
}