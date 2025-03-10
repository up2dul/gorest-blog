import { POSTS_KEY } from "@/lib/constants";
import type { Post } from "@/lib/types";
import apiClient from "@/services/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

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
  title,
}: UseQueryPostsOptions = postsInitOptions) {
  return useQuery({
    queryKey: [POSTS_KEY, page, title],
    queryFn: () =>
      apiClient.get<Post[]>(`?per_page=10&page=${page}&title=${title || ""}`),
  });
}

/**
 * Fetches the details of a post identified by the given ID using react-query.
 *
 * This hook leverages the useQuery hook to perform an API call and retrieve the details of a post.
 *
 * @param id - A number that uniquely identifies the post.
 * @returns An object containing the post data, along with the loading state, error state, and other query metadata.
 */
export function useQueryPostDetail(id: number) {
  return useQuery({
    queryKey: [POSTS_KEY, id],
    queryFn: () => apiClient.get<Post>(`/${id}`),
  });
}

/**
 * Deletes a post and invalidates the relevant query cache.
 *
 * This hook leverages a mutation to call the API endpoint for deleting a post identified by the provided ID.
 * On a successful deletion, it invalidates queries with the POSTS_KEY to ensure that any cached data is refreshed.
 *
 * @param id - The unique identifier of the post to delete.
 * @returns A mutation object used to trigger and manage the delete operation.
 */
export function useDeletePost(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiClient.delete(`/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POSTS_KEY] });
      message.success(`Post deleted successfully! ID: ${id}`);
    },
    onError: error => {
      message.error(`Failed to delete post due to: ${error.message}`);
    },
  });
}
