// import { BookSection } from "./BookSection";
// import mockBooks from "./mockBooks";

// export function BooksPage() {
//   return (
//     <div
//       style={{
//         backgroundColor: "#F5EFE7",
//         minHeight: "100vh",
//         padding: "24px 16px"
//       }}
//     >
//       <div
//         style={{
//           maxWidth: 1200,
//           margin: "0 auto"
//         }}
//       >
//         <BookSection title="Featured Books" books={mockBooks} />
//       </div>
//     </div>
//   );
// }


// pages/AdminBooksPage.tsx
import {
  Table,
  Tabs,
  Tag,
  Button,
  Space,
  Card,
  Typography,
} from 'antd';
import { useState } from 'react';
import type { ColumnsType } from 'antd/es/table';

import { useAdminBooks } from '../lib/hooks/useAdminBooks';
import { useBookActions } from '../lib/hooks/useBookActions';
//import type { Books, BookTableItem } from '../types/Books';
import { getBookStatus } from '../types/getStatus';
import type { BookTableItem } from '../types/Books';

import  EditBookModal  from './EditBookModal';

const { Title, Text } = Typography;

const AdminBooksPage = () => {
  const [status, setStatus] = useState<string>('All');
const [editingBook, setEditingBook] = useState<BookTableItem | null>(null);

  const { data, isLoading } = useAdminBooks(status);
  const {
    approveBook,
    publishBook,
    //unpublishBook,
  } = useBookActions();



  const columns: ColumnsType<BookTableItem> = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
    },
    {
      title: 'Created By',
      dataIndex: 'createdByName',
    },
    {
      title: 'Status',
      render: (_, record) => {
        const status = getBookStatus(record);
        const colorMap = {
          PendingApproval: 'orange',
          Draft: 'blue',
          Published: 'green',
        };

        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      render: (_, record) => {
        console.log(record.id, record.isApproved, record.isPublished);
        console.log('Approve book', record.id)
        const status = getBookStatus(record);

        return (
          <Space>
            {status === 'Published' }
            <Button type="link"
              onClick={() => 
                setEditingBook(record)}>
              Edit
            </Button>

            {status === 'PendingApproval' && (
              <Button
                type="link"
                onClick={() =>
                  
                  approveBook.mutate(record.id)
                }
              >
                Approve
              </Button>
            )}

            {status === 'Draft' && (
              <Button
                type="link"
                 onClick={() =>
                   publishBook.mutate(record.id)
                }
              >
                Publish
              </Button>
            )}

            {status === 'Published' && (
              <Button
                type="link"
                danger
                // onClick={() =>
                //   unpublishBook.mutate(record.id)
                // }
              >
                Unpublish
              </Button>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <div style={{ padding: 32 }}>
      <Card variant='borderless'>
        <Title level={3} style={{ marginBottom: 0 }}>
          Books Administration
        </Title>
        <Text type="secondary">
          Approve, publish, and manage all books
        </Text>

        <Tabs
          style={{ marginTop: 24 }}
          defaultActiveKey="All"
          onChange={setStatus}
          items={[
            { key: 'All', label: 'All' },
            { key: 'PendingApproval', label: 'Pending Approval' },
            { key: 'Draft', label: 'Draft' },
            { key: 'Published', label: 'Published' },
          ]}
        />

        <Table<BookTableItem>
          rowKey="id"
          columns={columns}
          dataSource={data}
          loading={isLoading}
          pagination={{ pageSize: 10 }}
        />
        <EditBookModal
  book={editingBook}
  onClose={() => setEditingBook(null)}
/>

      </Card>
    </div>
  );
};

export default AdminBooksPage;
