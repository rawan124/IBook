
import { Modal } from 'antd';

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
      destroyOnHidden
    >
      {book && (
        <BookForm
          initialValues={{
  name: book.name,
  title: book.title,
  summary: book.summary,
  description: book.description,
  imageUrl: book.imageUrl,
  authorIds: book.authors.map(a => Number(a.id)),
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

