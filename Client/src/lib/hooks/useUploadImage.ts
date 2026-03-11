// hooks/useUploadImage.ts
import { useMutation } from "@tanstack/react-query";
import { agent } from "../../api/agent";

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await agent.post(
        "/upload",
        formData
      );

      return data;
    },
  });
};