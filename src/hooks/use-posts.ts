import { POSTS_KEY } from "@/lib/constants";
import type { Post } from "@/lib/types";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

type UseQueryPostsOptions = Partial<{
  page: number | null;
  title: string | null;
}>;
const postsInitOptions = {
  page: 1,
  title: "",
};

/**
 * Retrieves a paginated list of posts filtered by title.
 *
 * This hook uses React Query to perform an asynchronous request to fetch posts.
 * It accepts an options object which may include a page number and a title filter.
 * If no options are provided, it defaults to using `useQueryPostsInit`.
 *
 * @param options - An object containing query options:
 *   - page: The page number to fetch (defaults to 1).
 *   - title: A string to filter posts by title (defaults to an empty string).
 * @returns A React Query result object containing the posts data or error information.
 */
export function useQueryPosts({
  page = 1,
  title = "",
}: UseQueryPostsOptions = postsInitOptions) {
  return useQuery({
    queryKey: [POSTS_KEY, page, title],
    queryFn: () =>
      apiClient.get<Post[]>(`?per_page=10&page=${page}&title=${title}`),
  });
}
