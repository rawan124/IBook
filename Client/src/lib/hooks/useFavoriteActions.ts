import {useMutation, useQueryClient} from "@tanstack/react-query";
import {agent} from "../../api/agent";


export const useFavoriteActions = () => { 
const queryClient=useQueryClient();
 const RemoveFromFavorites = useMutation({
    mutationFn: async (bookId: number) => {
        return agent.delete(`/favorites/${bookId}`);
    },
    onSuccess: () => {
        console.log('Book removed from wishlist');
    },
    onError: () => {
        console.error('Failed to remove book from wishlist');
    }
});

const AddToFavorites = useMutation({
    
    mutationFn: async (bookId: number) => {
        return agent.post(`/favorites/${bookId}`);
    },
onSuccess: (_, id) => {
      
        queryClient.invalidateQueries({ queryKey: ['bookDetails', id]});
},

});
return {
    RemoveFromFavorites,
    AddToFavorites
}
}