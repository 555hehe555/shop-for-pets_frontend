import { loginUser, registrateUser } from "@/features/auth";
import { updateUser } from "@/features/auth/api/authApi";
import type { PatchedUpdateCustomUserRequest } from "@/types/api";
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

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      id,
      inData,
    }: {
      id: number;
      inData: PatchedUpdateCustomUserRequest;
    }) => updateUser(id, inData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return mutation;
}
