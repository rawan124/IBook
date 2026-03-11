import { useQuery } from "@tanstack/react-query";
import { agent } from "../../api/agent";
import type { AuthorCardItem } from "../../types/AuthorCardItem";

export const useAuthors = () => {
  return useQuery<AuthorCardItem[]>({
    queryKey: ["authors"],
    queryFn: async () => {
      const res = await agent.get("/authors");
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
