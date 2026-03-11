import { Row, Col, Typography, Card, Divider, Form, Avatar, Button, Modal, Popconfirm, Switch, Flex, Select } from "antd";
import { useParams } from "react-router";
import { useAuthorDetails } from "../lib/hooks/useAuthorDetails";
import { useAuthorBooks } from "../lib/hooks/useAuthorBooks";
import { BookCard } from "../features/BookCard";
import { useState } from "react";
import BookForm from "../app/components/BookForm";
import { useBookActions } from "../lib/hooks/useBookActions";
import { useAuth } from "../lib/hooks/useAuth";
import AuthorForm from "../app/components/AuthorForm";
import { useAuthorActions } from "../lib/hooks/useAuthorActions";
import dayjs from "dayjs";
import { useAdminBooks } from "../lib/hooks/useAdminBooks";
import type { AssignBookdto } from "../types/AssignBookdto";
const { Title, Text } = Typography;

export default function AuthorDetailsPage() {
  const { id } = useParams();
  const authorId = Number(id);
  const {user }= useAuth();
  const { data: author, isLoading: authorLoading } =
    useAuthorDetails(authorId);
  const canEdit = author?.createdByUserId===user?.id;
  const { data: books, isLoading: booksLoading } =
    useAuthorBooks(authorId);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen]=useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const {AssignBook, assignExistingBooks}=useBookActions();
  const {updateAuthor, activateAuthor, deactivateAuthor}= useAuthorActions();
  const { data: allBooks } = useAdminBooks('Published');
  if (authorLoading || !author) return null;


  

 
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px 48px" }}>
      
      <Card
        variant="borderless"
        style={{
         
          marginBottom: 32,
        }}
      >
        <Row gutter={[32, 32]} align="middle">
          <Col>
            {author.profilePicture ? (
              <Avatar
                src={`http://localhost:5294${author.profilePicture}`}
                size={120}
              />
            ) : (
              <Avatar size={120}>
                {author.fullName.charAt(0)}
              </Avatar>
            )}
          </Col>

          <Col flex="auto">
            <Title level={2} style={{ marginBottom: 0 }}>
              {author.fullName}
            </Title>

            <Text type="secondary">
              {author.countryOfOrigin}
            </Text>

            <div style={{ marginTop: 8 }}>
              <Text>
                Born {new Date(author.dateOfBirth).getFullYear()}
                {author.dateOfDeath && (
                  <> – {new Date(author.dateOfDeath).getFullYear()}</>
                )}
              </Text>
            </div>
             <Flex
      justify="space-between"
      align="center"
      wrap="wrap"
      gap={16}
      style={{ marginBottom: 32 }}
    >
            { canEdit && 
            <Button onClick={()=> setIsUpdateModalOpen(true)}>
              Edit
              </Button>
            }
            {canEdit && (<Popconfirm
    title={
      author.isActive
        ? "Deactivate this author?"
        : "Activate this author?"
    }
    onConfirm={() =>
      {
      if (author.isActive) {
        deactivateAuthor.mutate(authorId);
      } else {
        activateAuthor.mutate(authorId);
      }
    }}
    okText="Yes"
    cancelText="No"
  >
    <Switch
      checked={author.isActive}
      loading={activateAuthor.isPending}
      checkedChildren="Active"
      unCheckedChildren="Inactive"
    />
  </Popconfirm>)
 
            }
             </Flex>
              
            
          </Col>
        </Row>
      </Card>

      

      <Divider />


   
      <section>
        <Title level={4}>
          Books by {author.fullName}
        </Title>
        <div>
         <Button type='primary' onClick={()=> setIsCreateModalOpen(true)}>
              Assign a book
            </Button>
          <Button onClick={() => setIsAssignModalOpen(true)}>
  Assign Existing Book
</Button>
</div> 
 <Divider />
        {booksLoading ? null : books && books.length > 0 ? (
          <Row gutter={[24, 24]}>
            {books.map((book) => (
              <Col xs={24} sm={12} md={8} key={book.id}>
                <BookCard book={book} />
              </Col>
            ))}
          </Row>
        ) : (
          <Text type="secondary">
            No books available for this author yet.
          </Text>
        )}
      </section>
      
      <Modal
  title={`Create Book for ${author.fullName}`}
  open={isCreateModalOpen}
  onCancel={() => setIsCreateModalOpen(false)}
  footer={null}
  destroyOnHidden
>
  <BookForm
    hideAuthorField  
    onSubmit={(values) => {
      AssignBook.mutate(
        {
          authorId,
          bookData: values as AssignBookdto,
        },
        {
          onSuccess: () => {
            setIsCreateModalOpen(false);
          },
        }
      );
    }}
    submitText="Submit for Approval"
    loading={AssignBook.isPending}
  />
</Modal>
<Modal
   title="Update Author"
  open={isUpdateModalOpen}
  onCancel={() => setIsUpdateModalOpen(false)}
  footer={null}
>
   
  <AuthorForm  initialValues={{
    firstName: author.firstName,
    lastName: author.lastName,
    countryOfOrigin: author.countryOfOrigin,
    profilePicture: author.profilePicture,
    dateOfBirth: dayjs(author.dateOfBirth),
    dateOfDeath: author.dateOfDeath
      ? dayjs(author.dateOfDeath)
      : undefined,
  }}
  onSubmit={(values) => updateAuthor.mutate({id: authorId, values:values }, {
    onSuccess: () => {
      setIsUpdateModalOpen(false)
    }
  })}
  submitText="Update Author"
/>
</Modal>
<Modal
  title="Assign Existing Books"
  open={isAssignModalOpen}
  onCancel={() => setIsAssignModalOpen(false)}
  footer={null}
>
  <Form
    layout="vertical"
    onFinish={(values) => {
      assignExistingBooks.mutate(
        { authorId, booksIds: values.booksIds },
        {
          onSuccess: () => {
            setIsAssignModalOpen(false);
          },
        }
      );
    }}
  //    onFinish={(values) => {
  //   console.log("FORM SUBMITTED", values);
  // }}
  >
    <Form.Item
      label="Select Books"
      name="booksIds"
      rules={[{ required: true, message: "Select at least one book" }]}
    >
      <Select
        mode="multiple"
        options={allBooks?.map((b) => ({
          label: b.title,
          value: b.id,
        }))}
      />
    </Form.Item>
     <Form.Item>
    <Button
      type="primary"
      htmlType="submit"
      loading={assignExistingBooks.isPending}
      block
    >
      Assign
    </Button>
     </Form.Item>
  </Form>
</Modal>
    </div>
    
  );
}
