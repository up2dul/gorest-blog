import { POSTS_KEY } from "@/lib/constants";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

export function useQueryPosts() {
  return useQuery({
    queryKey: [POSTS_KEY],
    queryFn: () => apiClient.get("/"),
  });
}
