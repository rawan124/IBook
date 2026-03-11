import { useQuery} from "@tanstack/react-query";

import { agent } from "../../api/agent";



import type { AuthorBook } from "../../types/AuthorBookType";

export const useAuthorBooks = (id: number) => {
  return useQuery<AuthorBook[]>({
    queryKey: ['authorBooks', id],
    queryFn: async () => {
      const res = await agent.get(`/authors/${id}/books`);
      
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

