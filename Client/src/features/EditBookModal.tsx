// import { Modal, Form, Input, Button } from 'antd';
// import { useEffect } from 'react';
// import type { BookTableItem } from '../types/Books';
// import { useBookActions } from '../lib/hooks/useBookActions';

// interface Props {
//   book: BookTableItem | null;
//   onClose: () => void;
// }

// const EditBookModal = ({ book, onClose }: Props) => {
//   const [form] = Form.useForm();
//   const { updateBook } = useBookActions();

//   useEffect(() => {
//     if (book) {
//       form.setFieldsValue({
//         title: book.title,
//         author: book.author,
//         summary: book.summary,
//         description: book.description,
//         image: book.image,
//       });
//     }
//   }, [book, form]);

//   return (
//     <Modal
//       title="Edit Book"
//       open={!!book}
//       onCancel={() => {
//         form.resetFields();
//         onClose();
//       }}
//       footer={null}
//       destroyOnClose
//     >
//       <Form
//         layout="vertical"
//         form={form}
//         onFinish={(values) => {
//           updateBook.mutate({
//             ...book!,
//             ...values,
//             imageUrl: values.image,
//           });

//           form.resetFields();
//           onClose();
//         }}
//       >
//         <Form.Item label="Title" name="title" rules={[{ required: true }]}>
//           <Input />
//         </Form.Item>

//         <Form.Item label="Author" name="author" rules={[{ required: true }]}>
//           <Input />
//         </Form.Item>

//         <Form.Item label="Summary" name="summary">
//           <Input.TextArea rows={2} />
//         </Form.Item>

//         <Form.Item label="Description" name="description">
//           <Input.TextArea rows={4} />
//         </Form.Item>

//         <Form.Item label="Cover Image URL" name="image">
//           <Input />
//         </Form.Item>

//         <Button
//           type="primary"
//           htmlType="submit"
//           loading={updateBook.isPending}
//         >
//           Save Changes
//         </Button>
//       </Form>
//     </Modal>
//   );
// };

// export default EditBookModal;
import { Modal } from 'antd';
//import BookForm from './BookForm';
import { useBookActions } from '../lib/hooks/useBookActions';
import type { BookTableItem } from '../types/Books';
import BookForm from '../app/components/BookForm';

            interface Props {
            book: BookTableItem | null;
            onClose: () => void;
            }

const EditBookModal = ({ book, onClose }: Props) => {
  const { updateBook } = useBookActions();

  return (
    <Modal
      title="Edit Book"
      open={!!book}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      {book && (
        <BookForm
          initialValues={{
            ...book
            //image: book.image, // map backend → form
          }}
          onSubmit={(values) => {
            updateBook.mutate({
              ...book,
              ...values
              //imageUrl: values.Image,
            });
            onClose();
          }}
          submitText="Save Changes"
          loading={updateBook.isPending}
        />
      )}
    </Modal>
  );
};

export default EditBookModal;

