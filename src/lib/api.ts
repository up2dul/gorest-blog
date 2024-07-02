import { tryit } from 'radash';

import type { Comment, Post, User } from './types';

const BASEURL = 'https://gorest.co.in/public/v2';

async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return await response.json();
}

async function fetchPosts(page: number): Promise<Post[]> {
  return await fetchData<Post[]>(`${BASEURL}/posts?per_page=10&page=${page}`);
}

async function fetchPostDetail(postId: number): Promise<Post> {
  return await fetchData<Post>(`${BASEURL}/posts/${postId}`);
}

async function fetchPostComments(postId: number): Promise<Comment[]> {
  return await fetchData<Comment[]>(`${BASEURL}/posts/${postId}/comments`);
}

async function fetchUserDetail(userId: number): Promise<User> {
  return await fetchData<User>(`${BASEURL}/users/${userId}`);
}

export const getPosts = tryit(fetchPosts);
export const getPostDetail = tryit(fetchPostDetail);
export const getPostComments = tryit(fetchPostComments);
export const getUserDetail = tryit(fetchUserDetail);
