import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUserdata, isLoading: isUpdating } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      queryClient.invalidateQueries({
        active: true,
      });
      toast.success("user data updated successfully");
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateUserdata, isUpdating };
}
