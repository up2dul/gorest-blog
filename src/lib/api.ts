import type { Post } from './types';

const BASEURL = 'https://gorest.co.in/public/v2';

export async function getPosts(page: number): Promise<Post[]> {
  const response = await fetch(`${BASEURL}/posts?per_page=10&page=${page}`);
  return await response.json();
}
