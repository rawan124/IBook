import { useQuery} from "@tanstack/react-query";

import { agent } from "../../api/agent";

import type { BookDetails } from "../../types/BookDetails";

export const useBookDetails = (id: number) => {
  return useQuery<BookDetails>({
    queryKey: ['bookDetails', id],
    queryFn: async () => {
      const res = await agent.get(`/books/${id}`);
      
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

