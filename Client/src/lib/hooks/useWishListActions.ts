import {useMutation, useQueryClient} from "@tanstack/react-query";
import {agent} from "../../api/agent";


export const useWishListActions = () => { 
    const queryClient=useQueryClient();

 const RemoveFromWishlist = useMutation({
    mutationFn: async (bookId: number) => {
        return agent.delete(`/wishlist/${bookId}`);
    },
    onSuccess: () => {
        console.log('Book removed from wishlist');
        queryClient.invalidateQueries({queryKey: ["wishlist"]});
    },
    onError: () => {
        console.error('Failed to remove book from wishlist');
    }
});
const MarkAsRead = useMutation({
    mutationFn: async (bookId: number) => {
        return agent.patch(`/wishlist/${bookId}/markAsRead`);
    },
    onSuccess: () => {
        console.log('Book marked as read');
        queryClient.invalidateQueries({queryKey: ["wishlist"]});
    },
    onError: () => {
        console.error('Failed to mark book as read');
    }

});
const AddToWishlist = useMutation({
    mutationFn: async (bookId: number) => {
        return agent.post(`/wishlist/${bookId}`);
    },
      onSuccess: () => {
        console.log('Book marked as read');
        queryClient.invalidateQueries({queryKey: ["wishlist"]});
    },

});
return {
    RemoveFromWishlist,
    MarkAsRead,
    AddToWishlist
}
}