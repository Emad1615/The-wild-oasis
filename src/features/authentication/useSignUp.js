import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signUp as signUpAPI } from "../../services/apiAuth";

export function useSignUp() {
  const {
    mutate: signUp,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signUpAPI({ email, password, fullName }),
    onSuccess: (user) => {
      toast.success("user created successfully");
    },
    onError: (err) => toast.error(err.message),
  });
  return { signUp, isLoading, error };
}
