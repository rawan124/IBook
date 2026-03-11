import { useQuery} from "@tanstack/react-query";

import { agent } from "../../api/agent";
import type { BookTableItem } from "../../types/Books";


export const useAdminBooks = (status: string, search?: string) => {
  return useQuery<BookTableItem[]>({
    queryKey: ['adminBooks', status, search],
    queryFn: async () => {
      const params: {
    status?: string;
    search?: string;
  } = {};

  if (status && status !== "All") {
    params.status = status;
  }

  if (search && search.trim() !== "") {
    params.search = search;
  }
      const res = await agent.get('/books/allBooks', {
        params: params,
      });
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useMyBooks = () => {
  return useQuery<BookTableItem[]>(
    {
      queryKey: ['myBooks'],
      queryFn: async () => {
        const {data}= await agent.get('/books/user/myBooks')
        return data;

      },

    }
  )
}