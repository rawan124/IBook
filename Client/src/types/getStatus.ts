// utils/getBookStatus.ts
import type { BookTableItem } from './Books';

export type BookStatus =
  | 'PendingApproval'
  | 'Draft'
  | 'Published';

export const getBookStatus = (book: BookTableItem): BookStatus => {
  if (!book.isApproved ) return 'PendingApproval';
  if (book.isApproved && !book.isPublished) return 'Draft';
  return 'Published';
};
