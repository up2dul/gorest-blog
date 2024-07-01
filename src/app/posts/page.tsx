import { PostCard } from '@/components/common/content-card';
import { getPosts } from '@/lib/api';

export default async function Posts() {
  const posts = await getPosts();

  return (
    <main>
      <h1 className="text-3xl font-bold">📝 Blog Post List</h1>

      <section className="mt-8 flex flex-col gap-4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </main>
  );
}
