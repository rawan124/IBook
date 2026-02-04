import { Typography, Card } from "antd";
import BookForm from "../app/components/BookForm";
import { useBookActions } from "../lib/hooks/useBookActions";

const { Title, Text } = Typography;

const CreateBookPage = () => {
 
  const { createBook } = useBookActions();

  // const onFinish = (values: CreateBook) => {
  //   createBook.mutate(values);
  // };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '48px 16px',
        //background: '#f5f7fa',
        background: '#ffb8c4',
        minHeight: '100vh',
      }}
    >
      <Card
        style={{ width: 820 , padding: 32}}
        
        
      >
        <Title level={3}> 
          Create New Book
        </Title>
        <Text type="secondary">
          This book will be created as an admin entry
        </Text>
         <BookForm

               onSubmit={(values) => createBook.mutate(values)}
        submitText="Create Book"
        loading={createBook.isPending}
          />
      
      </Card>
    </div>
  );
};

export default CreateBookPage;
