import {
  Button,
  Form,
  Input,
  Card,
  Row,
  Col,
  Divider,
  Typography,
  Select,
  Tag,
  Modal,
  message,
} from 'antd';
import { BookOutlined, FileTextOutlined, PictureOutlined } from '@ant-design/icons';
//import { useBookActions } from '../../lib/hooks/useBookActions';
//import type { CreateBook } from '../../types/CreateBook';
import { useEffect, useState } from 'react';
//import type { CreateBook } from '../../types/CreateBook';
import { useUploadImage } from '../../lib/hooks/useUploadImage';
import { useAuthors } from '../../lib/hooks/useAuthors';
import type { AddAuthorFormValues } from '../../types/AddAuthorFormValues';
import AuthorForm from './AuthorForm';
import type { BookFormValues } from '../../types/BookDetails';

const { Title } = Typography;
interface Props {
  initialValues?: BookFormValues;          
  onSubmit: (values: BookFormValues ) => void;
  submitText: string;
  loading?: boolean;
  hideAuthorField?: boolean;
}
const BookForm = ({ initialValues, onSubmit, submitText, loading, hideAuthorField }: Props) => {
  const [form] = Form.useForm();
  const [newAuthors, setNewAuthors] = useState<AddAuthorFormValues[]>([]);
  const [isAuthorModalOpen, setIsAuthorModalOpen]=useState(false);
  const {data: authors}=useAuthors();
  const isEditMode = !!initialValues;
    const [file, setFile] = useState<File | null>(null);
  //const [imageUrl, setImageUrl] = useState("");
  const uploadImage = useUploadImage();
    useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    //    if (initialValues.imageUrl) {
    //   setImageUrl(initialValues.imageUrl);
    // }
    }
  }, [initialValues, form]);

  const handleUpload = () => {
    if (!file) return;

    uploadImage.mutate(file, {
      onSuccess: (data) => {
        form.setFieldValue("imageUrl", data.imageUrl);
      },
    
    });
  };

  return (
    <div>
      <Card
        
        style ={{margin: 'auto'}}
        
        
      >

        <Divider />

        <Form
          layout="vertical"
          form={form}
            onFinish={(values) => {
  if (!form.getFieldValue("imageUrl")) {
    message.error("Please upload image first");
    console.log('upload image');
    return;
  }

  onSubmit({
    ...values,

       newAuthors: newAuthors.map((a) => ({
      ...a,
      dateOfBirth: a.dateOfBirth.format("YYYY-MM-DD"),
      dateOfDeath: a.dateOfDeath
        ? a.dateOfDeath.format("YYYY-MM-DD")
        : null,
    })),
  });
}}
        >
          <Title level={5}>
            <BookOutlined /> Basic Information
          </Title>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Name (if applicable)"
                name="name"
 
              >
                <Input placeholder="clean-code" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Title (public display)"
                name="title"
                rules={[{ required: true, message: 'Title is required' }]}
              >
                <Input placeholder="Clean Code: A Handbook of Agile Software Craftsmanship" />
              </Form.Item>
            </Col>
          </Row>
          { !hideAuthorField &&

          <Form.Item
  label="Authors"
  name="authorIds"
  rules={[
  {
    validator: async (_, value) => {
      if (
        (value && value.length > 0) ||
        newAuthors.length > 0
      ) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error("Select at least one author")
      );
    },
  },
]}
>
  <Select
  mode="multiple"
  placeholder="Select authors"
  options={[
    ...(authors?.map((a) => ({
      label: a.fullName,
      value: a.id,
    })) ?? []),

    
      ...(!isEditMode
    ? [
        {
          label: "+ Add New Author",
          value: "add-new",
        },
      ]
    : []),
  ]}
  onChange={(values: (number | string)[])  => {
    if (!isEditMode && values.includes("add-new")) {
      setIsAuthorModalOpen(true);

     
      form.setFieldValue(
        "authorIds",
        values.filter((v) => v !== "add-new")
      );
    }
  }}

/>
{newAuthors.map((a, index) => (
  <Tag key={index} color="blue">
    {a.firstName} {a.lastName} (New)
  </Tag>
))}
</Form.Item>
}

          <Divider />

          
          <Title level={5}>
            <FileTextOutlined /> Content
          </Title>

          <Form.Item
            label="Summary"
            name="summary"
            rules={[{ required: true, message: 'Summary is required' },
              { max: 200, message: "Maximum 200 characters allowed" }
            ]}
          >
            <Input.TextArea
              rows={2}
              maxLength={200}
              showCount
              placeholder="Short summary shown in book lists"
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Description is required' },
              { max: 500, message: "Maximum 500 characters allowed" }
            ]}
          >
            <Input.TextArea
              rows={5}
              placeholder="Full description shown on the book page"
              maxLength={500}
              showCount
            />
          </Form.Item>

          <Divider />

          
          <Title level={5}>
            <PictureOutlined /> Media
          </Title>

          <Form.Item
            label="Cover Image URL"
            name="imageUrl"
          >
           
            <input
  type="file"
  onChange={(e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }}
/>
<Button onClick={handleUpload}>
        Upload Image
      </Button>

      {form.getFieldValue("imageUrl") && (
        <img
          src={`http://localhost:5294${form.getFieldValue("imageUrl")}`}
          width={200}
        />
      )}
          </Form.Item>

         
          <Divider />

          <Form.Item style={{ marginTop: 32 }}>
            <Row justify="end" gutter={12}>
              <Col>
                <Button onClick={() => form.resetFields()} size="middle">
                  Reset
                </Button>
              </Col>
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="middle"
                  loading={loading}
                >
                  {submitText}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Card>
      <Modal
  open={isAuthorModalOpen}
  onCancel={() => setIsAuthorModalOpen(false)}
  footer={null}
  destroyOnHidden
  title="Add New Author"
>
  <AuthorForm
    submitText="Add Author"
    onSubmit={(values) => {
      setNewAuthors((prev) => [...prev, values]);
      setIsAuthorModalOpen(false);
      
    }}
  />
</Modal>
    </div>
  );
};

export default BookForm;
