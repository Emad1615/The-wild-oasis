import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deteleCabin } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteCabin,
    isLoading,
    error,
  } = useMutation({
    mutationFn: deteleCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("cabin successfully deleted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { deleteCabin, isLoading, error };
}
