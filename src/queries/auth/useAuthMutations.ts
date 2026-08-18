import { loginUser, registrateUser } from "@/features/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLoginUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return mutation;
}

export function useRegistrateUser() {
  const mutation = useMutation({
    mutationFn: registrateUser,
  });

  return mutation;
}
