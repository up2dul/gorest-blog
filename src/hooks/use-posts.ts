import { POSTS_KEY } from "@/lib/constants";
import type { Post } from "@/lib/types";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

export function useQueryPosts({ page = 1 }: { page?: number } = { page: 1 }) {
  return useQuery({
    queryKey: [POSTS_KEY],
    queryFn: () => apiClient.get<Post[]>(`?per_page=10&page=${page}`),
  });
}
