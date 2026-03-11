import { useQuery} from "@tanstack/react-query";
import { agent } from "../../api/agent";
import type { BookDetails } from "../../types/BookDetails";



export const useFavoriteBooks=()=>{
    return useQuery<BookDetails[]>({
        queryKey: ['favorites'],
        queryFn: async () => {
            const {data}= await agent.get("/favorites");
            return data
        },
    }



    )
}