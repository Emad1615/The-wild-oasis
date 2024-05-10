import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreatingCabins() {
  const queryClient = useQueryClient();
  const {
    mutate: createCabin,
    error,
    isLoading,
  } = useMutation({
    mutationFn: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Data saved successfully");
    },
    onError: () => {
      toast.error("Data not saved successfully");
    },
  });
  return { createCabin, isLoading, error };
}
