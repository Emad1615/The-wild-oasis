import { useMutation, useQueryClient } from "@tanstack/react-query";
import { creatingEditingCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const {
    mutate: updateCabin,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ newCabin, id }) => creatingEditingCabin(newCabin, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("data successfuly updated");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateCabin, isLoading, error };
}
