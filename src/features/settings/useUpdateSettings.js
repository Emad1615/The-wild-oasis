import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const {
    mutate: updatingSetting,
    error,
    isLoading,
  } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success("Data updated successfully");
    },
    onError: () => {
      toast.success("Data not updated successfully");
    },
  });
  return { updatingSetting, isLoading, error };
}
