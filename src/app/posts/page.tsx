import { toInt } from 'radash';

import { PostCard } from '@/components/common/content-card';
import { Pagination } from '@/components/common/pagination';
import { getPosts } from '@/lib/api';

type PostsProps = {
  searchParams: {
    page?: string;
  };
};

export default async function Posts({ searchParams }: PostsProps) {
  const page = toInt(searchParams.page) || 1;
  const [err, posts] = await getPosts(page);

  if (err) {
    return (
      <>
        <h1 className="text-3xl font-bold mb-8">📝 Blog Post List</h1>
        <p>There was an error while fetching posts</p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold">📝 Blog Post List</h1>

      <section className="my-8 flex flex-col gap-4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>

      <Pagination />
    </>
  );
}
