import {useMutation, useQueryClient} from '@tanstack/react-query'
import {agent} from '../../api/agent';
import type {Books} from '../../types/Books';
import {toast} from 'react-toastify';
import type { CreateBook } from '../../types/CreateBook';

export const useBookActions = () => {
    const queryClient= useQueryClient();
    const createBook = useMutation({
        mutationFn: async (data: CreateBook) => {
            return agent.post('/books/createBook', data);
        },
        onSuccess: () => {
            toast.success('Book created successfully');
            console.log('Book created successfully');
            queryClient.invalidateQueries({ queryKey: ['adminBooks'] });
        },
        onError: () => {
            toast.error('Failed to create book');
        }
    });
    const updateBook = useMutation({
        mutationFn: async(data: Books) => {
            return agent.put(`/books/${data.id}`, data);
        },
        onSuccess: () => {
            toast.success('Book updated successfully');
            console.log('Book updated successfully');
            queryClient.invalidateQueries({ queryKey: ['adminBooks'] });
        },
        onError: () => {
            toast.error('Failed to update book');
        }
    });
    const approveBook = useMutation({
        mutationFn: async(id: number) => {
            return agent.post(`/books/approve/${id}`);
        },
        onSuccess: () => {
            toast.success('Book approved successfully');
            console.log('Book approved successfully');
            queryClient.invalidateQueries({ queryKey: ['adminBooks'] });
        },
        onError: () => {
            toast.error('Failed to approve book');
        }
    });

    const publishBook = useMutation({
        mutationFn: async(id: number) => {
            return agent.post(`/books/publish/${id}`);
        }
    })
        





return {
    createBook,
    updateBook,
    approveBook,
    publishBook
}
}
