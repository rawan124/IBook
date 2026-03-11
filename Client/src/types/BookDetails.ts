import type { AuthorCardItem } from "./AuthorCardItem";
import type { ReviewDto } from "./ReviewDto";

export type BookDetails = {
  id: number;
  title: string;
  name: string;
  summary: string;
  description: string;
  imageUrl: string;
  authors: AuthorCardItem[];
  reviews: ReviewDto[];
  wishlistedCount: number;
  favoritedCount: number;
  createdByUserId: string;
};
export interface BookFormValues {
  name?: string;
  title: string;
  summary: string;
  description: string;
  imageUrl: string;
  authorIds: number[];  
}

