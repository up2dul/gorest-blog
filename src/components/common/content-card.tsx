import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Post } from '@/lib/types';

type PostCardProps = {
  post: Post;
};

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link
      key={post.id}
      href={`/posts/${post.id}`}
      className="hover:scale-105 transition-transform"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-balance">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2">{post.body}</p>
        </CardContent>
      </Card>
    </Link>
  );
};
