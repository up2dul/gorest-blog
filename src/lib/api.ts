import { tryit } from 'radash';

import type { Comment, Post, User } from './types';

const BASEURL = 'https://gorest.co.in/public/v2';
const PERPAGE = 10;

async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(JSON.stringify(errorData));
  }
  if (response.status === 204) {
    return { status: 'success' } as T;
  }

  return await response.json();
}

async function queryPosts(page: number): Promise<Post[]> {
  return await fetchData<Post[]>(
    `${BASEURL}/posts?per_page=${PERPAGE}&page=${page}`,
  );
}

async function queryPostDetail(postId: number): Promise<Post> {
  return await fetchData<Post>(`${BASEURL}/posts/${postId}`);
}

async function queryComments(postId: number): Promise<Comment[]> {
  return await fetchData<Comment[]>(`${BASEURL}/posts/${postId}/comments`);
}

async function queryUsers({
  page,
  nameSearch,
}: { page: number; nameSearch: string }) {
  return await fetchData<User[]>(
    `${BASEURL}/users?per_page=${PERPAGE}&page=${page}&name=${nameSearch}`,
  );
}

async function queryUserDetail(userId: number): Promise<User> {
  return await fetchData<User>(`${BASEURL}/users/${userId}`);
}

async function mutateAddUser(newUser: Omit<User, 'id'>): Promise<User> {
  return await fetchData<User>(`${BASEURL}/users`, {
    method: 'POST',
    body: JSON.stringify(newUser),
  });
}

async function mutateEditUser({
  userId,
  editedUser,
}: {
  userId: number;
  editedUser: Omit<User, 'id'>;
}): Promise<User> {
  return await fetchData<User>(`${BASEURL}/users/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify(editedUser),
  });
}

async function mutateDeleteUser(userId: number): Promise<{ status: string }> {
  return await fetchData<{ status: string }>(`${BASEURL}/users/${userId}`, {
    method: 'DELETE',
  });
}

// query
export const getPosts = tryit(queryPosts);
export const getPostDetail = tryit(queryPostDetail);
export const getPostComments = tryit(queryComments);
export const getUsers = tryit(queryUsers);
export const getUserDetail = tryit(queryUserDetail);

// mutation
export const addUser = tryit(mutateAddUser);
export const editUser = tryit(mutateEditUser);
export const deleteUser = tryit(mutateDeleteUser);
