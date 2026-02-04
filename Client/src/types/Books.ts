import type { BookStatus } from "./getStatus";

export interface Books {

    id: number;
    title: string;
    name: string;
    summary: string;
    author: string;
    image: string;
    description: string;
}
    

export interface BookTableItem {
  id: number;
  name: string;
  title: string;
  author: string;
  status: BookStatus;
  createdByName: string;
  isApproved: boolean;
  isPublished: boolean;
  summary: string;
  image: string;
  description: string;
}
