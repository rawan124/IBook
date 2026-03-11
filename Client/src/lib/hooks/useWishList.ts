import { useQuery



 } from "@tanstack/react-query";
import { agent } from "../../api/agent";
import type { WishList } from "../../types/WishList";



export const useWishList = () => {
  return useQuery<WishList[]>({
    queryKey: ["wishlist"],
    queryFn: async () => {
       const {data} = await agent.get("/wishlist");
       return data;
    },
  });
}

