import { POSTS_KEY } from "@/lib/constants";
import type { Post, ReqPostBody } from "@/lib/types";
import apiClient from "@/services/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useRouter } from "next/router";

type UseQueryPostsOptions = Partial<{
  page: number | null;
  title: string | null;
}>;

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
export function useQueryPosts({ page = 1, title }: UseQueryPostsOptions) {
  return useQuery({
    queryKey: [POSTS_KEY, page, title],
    queryFn: () =>
      apiClient.get<Post[]>(
        `/posts?per_page=10&page=${page || 1}&title=${title || ""}`,
      ),
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
    queryFn: () => apiClient.get<Post>(`/posts/${id}`),
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
    mutationFn: () => apiClient.delete(`/posts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POSTS_KEY] });
      message.success(`Post deleted successfully! ID: ${id}`);
    },
    onError: error => {
      message.error(`Failed to delete post due to: ${error.message}`);
    },
  });
}

/**
 * Creates a custom hook for handling the creation of a new post.
 *
 * This hook uses a mutation to send an asynchronous POST request with the provided data.
 * Once the post is successfully created, it triggers the following actions:
 * - Invalidates the posts query cache using a specific query key.
 * - Displays a success message that includes the newly created post's ID.
 * - Navigates back to the homepage.
 *
 * @returns A mutation object with methods and state for creating a post.
 *
 * @remarks
 * - The mutation function expects a data object of type CreatePostBody.
 * - Ensure that the POST endpoint and the query key (POSTS_KEY) are correctly configured.
 * - This hook relies on an API client and react-router for network requests and navigation.
 */
export function useCreatePost() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: ReqPostBody) => {
      const response = await apiClient.post("/posts", data);
      return response.data;
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: [POSTS_KEY] });
      message.success(`Post created successfully! ID: ${data.id}`);
      router.push("/");
    },
  });
}

/**
 * Hook that provides a mutation function to edit an existing post.
 *
 * This hook utilizes a PATCH request to update the post data on the server.
 * After a successful update, it invalidates the posts query to refresh the cache,
 * displays a success message including the updated post ID, and navigates to the home page.
 *
 * @param id - The unique identifier of the post to be edited.
 *
 * @returns A mutation object used to trigger and manage the post edit operation.
 */
export function useEditPost(id: number) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: ReqPostBody) => {
      const response = await apiClient.patch(`/posts/${id}`, data);
      return response.data;
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: [POSTS_KEY] });
      message.success(`Post edited successfully! ID: ${data.id}`);
      router.push("/");
    },
  });
}
