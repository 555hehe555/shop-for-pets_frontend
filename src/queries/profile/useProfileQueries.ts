import { getPetById, getPets } from "@/features/profile/api/petApi";
import { useQuery } from "@tanstack/react-query";

export function usePets() {
  const query = useQuery({ queryKey: ["pets"], queryFn: getPets });

  return query;
}

export function usePetById(id: number) {
  const query = useQuery({
    queryKey: ["pet", id],
    queryFn: () => getPetById(id),
  });

  return query;
}
