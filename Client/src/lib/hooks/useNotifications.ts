import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { agent


 } from "../../api/agent";
 import type {AppNotification} from "../../types/AppNotification";


 export const useNotifications = () => {
    return useQuery<AppNotification[]>(
        {
            queryKey: ['notifications'],
            queryFn: async () => {
                const response= await agent.get("/user/notifications")
                return response.data

            }
        }
    )
 }
export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      agent.put(`/user/notifications/markAsRead/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};