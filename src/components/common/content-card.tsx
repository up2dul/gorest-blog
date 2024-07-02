import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Comment, Post } from '@/lib/types';

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

type CommentCardProps = {
  comment: Comment;
};
export const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <article className="flex items-start gap-4">
      <Image
        src={`https://ui-avatars.com/api/?name=${comment.name}`}
        alt={`${comment.name} avatar`}
        width={30}
        height={30}
        className="rounded-full mt-1"
      />
      <div>
        <p className="font-bold">{comment.name}</p>
        <p className="text-sm text-muted-foreground">{comment.body}</p>
      </div>
    </article>
  );
};
