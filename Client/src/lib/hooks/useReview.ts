import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { agent } from "../../api/agent";
import type { ReviewDto } from "../../types/ReviewDto";

export const useBookReviews = (bookId: number) => {
  return useQuery<ReviewDto[]>({
    queryKey: ["reviews", bookId],
    queryFn: async () => {
      const { data } = await agent.get(`/reviews/${bookId}`);
      return data;
    },
  });
};

export const useAddReview = (bookId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (review: { rating: number; content: string }) => {
      const { data } = await agent.post(`/reviews/${bookId}`, review);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["reviews", bookId]});
    },
  });
};

export const useEditReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      reviewId,
      rating,
      content,
      //bookId,
    }: {
      reviewId: number;
      rating: number;
      content: string;
      bookId: number;
    }) => {
      const { data } = await agent.put(`/reviews/${reviewId}`, {
        rating,
        content
      });
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.bookId],
      });
    },
  });
};
