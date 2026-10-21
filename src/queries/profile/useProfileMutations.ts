import { createPet, deletePet, updatePet } from "@/features/profile/api/petApi";
import type { PetRequest } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePet() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ inData }: { inData: PetRequest }) => createPet(inData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });

  return mutation;
}

export function useUpdatePet() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, inData }: { id: number; inData: PetRequest }) =>
      updatePet(id, inData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });

  return mutation;
}

export function useDeletePet() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id }: { id: number }) => deletePet(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });

  return mutation;
}
