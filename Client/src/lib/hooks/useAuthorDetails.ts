import { useQuery} from "@tanstack/react-query";

import { agent } from "../../api/agent";


import type { AuthorDetails } from "../../types/AuthorDetails";

export const useAuthorDetails = (id: number) => {
  return useQuery<AuthorDetails>({
    queryKey: ['authorDetails', id],
    queryFn: async () => {
      const res = await agent.get(`/authors/${id}`);
      
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};