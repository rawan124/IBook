

import { useMutation } from '@tanstack/react-query'
import { agent } from '../../api/agent';
import type { RegisterDto } from '../../types/RegisterDto';
import { useNavigate } from 'react-router';
import   { toast } from 'react-toastify';
import type { InfoUpdates } from '../../types/InfoUpdates';
import { useAuth } from './useAuth';

export const useAccount = () => {
    const navigate = useNavigate();
    const {login} = useAuth();
    const registerUser = useMutation({
        mutationFn: async (data: RegisterDto) => {
            return agent.post('/register', data);

        },
        onSuccess: () => {
            console.log('User registered successfully');
            navigate('/LoginPage');
        },
    });
    const loginUser = useMutation({
        mutationFn: async (data: { email: string; password: string }) => {
            return agent.post('/auth/login', data);
        },
        onSuccess: (response) => {
            login(response.data.accessToken, response.data.refreshToken);
            navigate('/books');
            toast.success('Login successful');
        },
        onError: () => {
            toast.error('Login failed. Please check your credentials.');
        }
    });
    const changePassword = useMutation({
        mutationFn: async (data: InfoUpdates) => {
            return agent.put('/manage/info', data);
        },
        onSuccess: () => {
            navigate('/');
            toast.success('Password changed successfully');
        }
    });

    return {
        registerUser,
        loginUser,
        changePassword
    };
}