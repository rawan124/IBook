import {
  Button,
  Form,
  Input,
  Card,
  Row,
  Col,
  Divider,
  Typography,
} from 'antd';
import { BookOutlined, FileTextOutlined, PictureOutlined } from '@ant-design/icons';
//import { useBookActions } from '../../lib/hooks/useBookActions';
//import type { CreateBook } from '../../types/CreateBook';
import { useEffect } from 'react';
import type { CreateBook } from '../../types/CreateBook';

const { Title } = Typography;
interface Props {
  initialValues?: unknown;          // book when editing
  onSubmit: (values: CreateBook ) => void;
  submitText: string;
  loading?: boolean;
}
const BookForm = ({ initialValues, onSubmit, submitText, loading }: Props) => {
  const [form] = Form.useForm();
  //const { createBook } = useBookActions();

        //   const onFinish = (values: CreateBook) => {
        //     createBook.mutate(values);
        //   };
    useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return (
    // <div
    //   style={{
    //     display: 'flex',
    //     justifyContent: 'center',
    //     padding: '16px 16px',
    //     background: '#f5f7fa',
    //     //background: '#ffb8c4',
    //     minHeight: '100vh',
    //   }}
    // >
    <div>
      <Card
        // style={{ width: 820 , padding: 32}}
        style ={{margin: 'auto'}}
        
        
      >

        <Divider />

        <Form
          layout="vertical"
          form={form}
          onFinish={onSubmit}
        >
          <Title level={5}>
            <BookOutlined /> Basic Information
          </Title>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Name (internal / short)"
                name="name"
                rules={[{ required: true, message: 'Name is required' }]}
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

          <Form.Item
            label="Author"
            name="author"
            rules={[{ required: true, message: 'Author is required' }]}
          >
            <Input placeholder="Robert C. Martin" />
          </Form.Item>

          <Divider />

          
          <Title level={5}>
            <FileTextOutlined /> Content
          </Title>

          <Form.Item
            label="Summary"
            name="summary"
          >
            <Input.TextArea
              rows={2}
              maxLength={180}
              showCount
              placeholder="Short summary shown in book lists"
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
          >
            <Input.TextArea
              rows={5}
              placeholder="Full description shown on the book page"
            />
          </Form.Item>

          <Divider />

          
          <Title level={5}>
            <PictureOutlined /> Media
          </Title>

          <Form.Item
            label="Cover Image URL"
            name="image"
          >
            <Input placeholder="https://example.com/cover.jpg" />
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
    </div>
  );
};

export default BookForm;
