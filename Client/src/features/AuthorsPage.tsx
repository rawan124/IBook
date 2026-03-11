import { Row, Col, Spin, Button, Modal, Flex } from "antd";
import { useAuthors } from "../lib/hooks/useAuthors";
import AuthorCard from "./AuthorCard";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useAuthorActions } from "../lib/hooks/useAuthorActions";

import AuthorForm from "../app/components/AuthorForm";
import Title from "antd/es/typography/Title";
export default function AuthorsPage() {
  const { data: authors, isLoading } = useAuthors(); 
  const [isModalOpen,setIsModalOpen]=useState(false);
  const { addAuthor } = useAuthorActions();
   
  if (isLoading) return <Spin />;

  return (
    <div style={{ padding: "64px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <Flex
      justify="space-between"
      align="center"
      wrap="wrap"
      gap={16}
      style={{ marginBottom: 32 }}
    >
      <Title level={2}style={{margin: 0}}>
        Browse Authors
      </Title>
      
      
         <Button type="primary" icon={<PlusOutlined />} onClick={()=> setIsModalOpen(true)}>
          Add author
        </Button>
        </Flex>
    <Row gutter={[16, 16]}>
      {authors?.map(author => (
        <Col key={author.id} xs={24} sm={12} md={8} lg={6}>
          <AuthorCard
            id={author.id}
            fullName={author.fullName}
            country={author.country}
            isActive={author.isActive}
          />
        </Col>
       
      ))}
    </Row>
  
        <Modal
  title="Add Author"
  open={isModalOpen}
  onCancel={() => setIsModalOpen(false)}
  footer={null}
>
   
  <AuthorForm
  onSubmit={(values) => addAuthor.mutate(values, {
    onSuccess: () => {
      setIsModalOpen(false)
    }
  })}
  submitText="Create Author"
/>
</Modal>
        
    </div>
  );
}
