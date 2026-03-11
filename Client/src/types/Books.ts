import type { AuthorCardItem } from "./AuthorCardItem";
import type { BookStatus } from "./getStatus";

export interface Books {

    id: number;
    title: string;
    name: string;
    summary: string;
    authors: AuthorCardItem[];
    imageUrl: string;
    description: string;
}
export interface UpdateBook {
  id: number;
  title: string;
    name?: string;
    summary: string;
    authorIds: number[];
    imageUrl: string;
    description: string;
}
    

export interface BookTableItem {
  id: number;
  name: string;
  title: string;
  authors: AuthorCardItem[];
  status: BookStatus;
  createdByName: string;
  isApproved: boolean;
  isPublished: boolean;
  summary: string;
  imageUrl: string;
  description: string;
}
