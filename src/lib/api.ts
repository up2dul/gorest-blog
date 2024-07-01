import type { Post } from './types';

const BASEURL = 'https://gorest.co.in/public/v2';

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(`${BASEURL}/posts`);
  return await response.json();
}
