import { useQuery} from "@tanstack/react-query";

import { agent } from "../../api/agent";
import type { BookTableItem } from "../../types/Books";

export const useAdminBooks = (status: string) => {
  return useQuery<BookTableItem[]>({
    queryKey: ['adminBooks', status],
    queryFn: async () => {
      const res = await agent.get('/books/allBooks', {
        params:
          status && status !== 'All'
            ? { status }
            : {},
      });
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};