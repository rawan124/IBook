
import {
  Table,
  Tabs,
  Tag,
  Button,
  Space,
  Card,
  Typography,
  Modal,
} from 'antd';
import { useState } from 'react';
import type { ColumnsType } from 'antd/es/table';

import { useAdminBooks } from '../lib/hooks/useAdminBooks';
import { useBookActions } from '../lib/hooks/useBookActions';

import { getBookStatus } from '../types/getStatus';
import type { BookTableItem } from '../types/Books';

import  EditBookModal  from './EditBookModal';

const { Title, Text } = Typography;

const AdminBooksPage = () => {
  const [status, setStatus] = useState<string>('All');
const [editingBook, setEditingBook] = useState<BookTableItem | null>(null);
const [viewingBook, setViewingBook] = useState<BookTableItem | null>(null);
  const { data, isLoading } = useAdminBooks(status);
  const {
    approveBook,
    publishBook,
  
  } = useBookActions();



  const columns: ColumnsType<BookTableItem> = [
    {
      title: 'Title',
      dataIndex: 'title',
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
             <Button onClick={() => setViewingBook(record)}>
        View
      </Button>
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
      <Modal
  open={!!viewingBook}
  onCancel={() => setViewingBook(null)}
  footer={null}
  width={700}
  title={viewingBook?.title}
>
  {viewingBook && (
    <>

<p>
  <strong>Authors:</strong>{" "}
  {viewingBook.authors.map(a => a.fullName).join(", ")}
</p>
      <p><strong>Description:</strong></p>
      <p>{viewingBook.description}</p>
      <p><strong>Summary</strong></p>
      <p>{viewingBook.summary}</p>
      
      {viewingBook.imageUrl && (
        <img
          src={`http://localhost:5294${viewingBook.imageUrl}`}
          width={200}
          style={{ marginTop: 16 }}
        />
      )}
    </>
  )}
</Modal>
    </div>
    
  );
};

export default AdminBooksPage;
