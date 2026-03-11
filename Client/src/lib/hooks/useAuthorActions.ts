import { useMutation} from "@tanstack/react-query";

import { agent } from "../../api/agent";
import type {AddAuthorFormValues} from "../../types/AddAuthorFormValues";
import { useQueryClient } from "@tanstack/react-query";
export const useAuthorActions = () =>
{   const queryClient=useQueryClient();
    const addAuthor=useMutation({
        mutationFn: async(values: AddAuthorFormValues) =>{
            return agent.post('/authors' , {
                firstName: values.firstName,
    lastName: values.lastName,
    countryOfOrigin: values.countryOfOrigin,
    profilePicture: values.profilePicture,


    dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),

    dateOfDeath: values.dateOfDeath
      ? values.dateOfDeath.format("YYYY-MM-DD")
      : null,
            })
        },
        onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["authors"] });
    
        },
    });
const updateAuthor = useMutation({
  mutationFn: async (data: { id: number; values: AddAuthorFormValues }) => {
    return agent.put(`/authors/${data.id}`, {
      ...data.values,
      dateOfBirth: data.values.dateOfBirth.format("YYYY-MM-DD"),
      dateOfDeath: data.values.dateOfDeath
        ? data.values.dateOfDeath.format("YYYY-MM-DD")
        : null,
    });
  },
   onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["authors"] });
      queryClient.invalidateQueries({
        queryKey: ["authorDetails", variables.id],
      });
    },
});
const activateAuthor=useMutation({
    mutationFn: async(authorId: number)=>{
        return agent.post(`authors/${authorId}/activate`)
    },
    onSuccess: (_, id) => {
    queryClient.invalidateQueries({ queryKey: ["authors"] });
    queryClient.invalidateQueries({
      queryKey: ["authorDetails", id],
    });
},
});
const deactivateAuthor=useMutation({
    mutationFn: async(authorId: number)=>{
        return agent.post(`authors/${authorId}/deactivate`)
    },
    onSuccess: (_, id) => {
    queryClient.invalidateQueries({ queryKey: ["authors"] });
    queryClient.invalidateQueries({
      queryKey: ["authorDetails", id],
    });
},
});
    return {
        addAuthor,
        updateAuthor,
        activateAuthor,
        deactivateAuthor
    }
}