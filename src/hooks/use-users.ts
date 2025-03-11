import { USERS_KEY } from "@/lib/constants";
import type { User } from "@/lib/types";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

export function useQueryUsers() {
  return useQuery({
    queryKey: [USERS_KEY],
    queryFn: () => apiClient.get<User[]>("/users?per_page=1"),
  });
}
