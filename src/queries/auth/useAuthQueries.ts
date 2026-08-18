import { getMe } from "@/features/auth";
import { useQuery } from "@tanstack/react-query";

export function useGetMe() {
  const query = useQuery({ queryKey: ["user"], queryFn: getMe });

  return query;
}
