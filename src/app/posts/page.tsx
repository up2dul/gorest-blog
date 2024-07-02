import { toInt } from 'radash';

import { PostCard } from '@/components/common/content-card';
import { Pagination } from '@/components/common/pagination';
import { getPosts } from '@/lib/api';

type PostProps = {
  searchParams: {
    page: string;
  };
};

export default async function Posts({ searchParams }: PostProps) {
  const page = toInt(searchParams.page);
  const posts = await getPosts(page);

  return (
    <main>
      <h1 className="text-3xl font-bold">📝 Blog Post List</h1>

      <section className="my-8 flex flex-col gap-4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>

      <Pagination />
    </main>
  );
}
