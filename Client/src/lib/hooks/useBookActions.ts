import {useMutation, useQueryClient} from '@tanstack/react-query'
import {agent} from '../../api/agent';
import type { UpdateBook} from '../../types/Books';

import type { CreateBook } from '../../types/CreateBook';
import type { AssignBookdto } from '../../types/AssignBookdto';
import { message } from 'antd';
import { useNavigate } from 'react-router';


export const useBookActions = () => {
    const navigate=useNavigate();
    const queryClient= useQueryClient();
    const createBook = useMutation({
        mutationFn: async (data: CreateBook) => {
            return agent.post('/books/createBook', data);
        },
        onSuccess: () => {
            message.success('Book created successfully and is waiting for admin approval');
            navigate('/books')
            console.log('Book created successfully');
            queryClient.invalidateQueries({ queryKey: ['adminBooks'] });
        },
        onError: () => {
            message.error('Failed to create book');
        }
    });
    const updateBook = useMutation({
        mutationFn: async(data: UpdateBook) => {
            return agent.put(`/books/${data.id}`, data);
        },
        onSuccess: () => {
            message.success('Book updated successfully');
            console.log('Book updated successfully');
            queryClient.invalidateQueries({ queryKey: ['adminBooks'] });
        },
        onError: () => {
            message.error('Failed to update book');
        }
    });
    const approveBook = useMutation({
        mutationFn: async(id: number) => {
            return agent.post(`/books/approve/${id}`);
        },
        onSuccess: () => {
            //toast.success('Book approved successfully');
            console.log('Book approved successfully');
            message.success('Published!')
            queryClient.invalidateQueries({ queryKey: ['adminBooks'] });
        },
        onError: () => {
            message.error('Failed to approve book');
        }
    });

    const publishBook = useMutation({
        mutationFn: async(id: number) => {
            return agent.post(`/books/publish/${id}`);
        },
        onSuccess: () =>{
               console.log('Book published successfully');
            queryClient.invalidateQueries({ queryKey: ['adminBooks'] });
        },
        onError: () =>{
            message.error('Failed to publish book')
        }
        
    });
    const AssignBook=  useMutation({
    mutationFn: async ({
      authorId,
      bookData,
    }: {
      authorId: number;
      bookData: AssignBookdto;
    }) => {
      return agent.post(`/authors/${authorId}/createBook`, bookData);
    },
  });


  const assignExistingBooks = useMutation({
    mutationFn: async (data: { authorId: number; booksIds: number[] }) => {
        console.log("Mutation called", data)
      return agent.post(
        `/authors/${data.authorId}/assignBook`,
        { booksIds: data.booksIds } 
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authorBooks"] });
    },
  });



        





return {
    createBook,
    updateBook,
    approveBook,
    publishBook,
    AssignBook,
    assignExistingBooks
}
}

