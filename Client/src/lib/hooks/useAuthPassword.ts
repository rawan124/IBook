import {useMutation} from '@tanstack/react-query';
import { agent } from '../../api/agent';
import type { ResetPasswordDto } from '../../types/ResetPasswordDto';



export const useAuthPassword = () => {
    const forgotPassword = useMutation({
        mutationFn: async (email: string) => {
            await agent.post('/auth/forgot-password', { email });


        }
    });
    const resetPassword = useMutation({
        mutationFn: async (data: ResetPasswordDto) => {
            await agent.post('/auth/reset-password', data);
        }
    });
             
return {
    forgotPassword,
    resetPassword
};
}