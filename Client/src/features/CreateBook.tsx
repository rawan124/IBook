import { Typography, Card } from "antd";
import BookForm from "../app/components/BookForm";
import { useBookActions } from "../lib/hooks/useBookActions";
import { useAuth } from "../lib/hooks/useAuth";
import type { CreateBook } from "../types/CreateBook";

const { Title } = Typography;

const CreateBookPage = () => {
 
  const { createBook } = useBookActions();
  const {user}=useAuth();



  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '48px 16px',
        minHeight: '100vh',
      }}
    >
      <Card
        style={{ width: 820 , padding: 32}}
        variant="borderless"
        
        
      >
        <Title level={3}> 
          {user?.role === "SuperAdmin" ? "Create New Book As Admin" : "Create New Book as User"}
          
        </Title>
         <BookForm
         

               onSubmit={
                
                (values) => {
                   createBook.mutate(values as CreateBook); 
                  }}
        submitText="Create Book"
        loading={createBook.isPending}
          />
      
      </Card>
    </div>
  );
};

export default CreateBookPage;
